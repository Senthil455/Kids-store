import { createClient } from "redis";
import logger from "@/utils/logger";

const GLOBAL_KEY = "__kidsStoreRedisState";

const state =
  globalThis[GLOBAL_KEY] ||
  (globalThis[GLOBAL_KEY] = {
    client: null,
    connectPromise: null,
    ready: false,
    failed: false,
    warned: false,
    disabled: false,
    skipped: false,
    memory: new Map(),
    cleanupTimer: null,
  });

const isDisabled = process.env.DISABLE_REDIS === "true" || process.env.REDIS_ENABLED === "false";
const isBuildPhase = process.env.NEXT_PHASE === "phase-production-build";

if (isDisabled) {
  state.disabled = true;
  if (!state.warned) {
    state.warned = true;
    logger.info("Redis is disabled; using the in-memory fallback.");
  }
} else if (isBuildPhase) {
  state.skipped = true;
}

const redisHost = process.env.REDIS_HOST || "127.0.0.1";
const redisPort = Number(process.env.REDIS_PORT) || 6379;

const markUnavailable = (error) => {
  state.ready = false;
  state.failed = true;
  if (state.warned) return;

  state.warned = true;
  const detail = error?.code || error?.message || String(error);
  logger.warn(`Redis unavailable (${detail}); using the in-memory fallback for cache, rate limits, and OTP.`);
};

const connectRedis = () => {
  if (state.disabled || state.skipped || state.failed || state.connectPromise) return;
  if (state.client?.isOpen) return;

  if (!state.client) {
    const client = createClient({
      socket: {
        host: redisHost,
        port: redisPort,
        connectTimeout: 1500,
        reconnectStrategy: (retries) => {
          if (retries >= 2) return false;
          return 250 * (retries + 1);
        },
      },
      disableOfflineQueue: true,
    });

    client.on("ready", () => {
      state.ready = true;
      state.failed = false;
      state.warned = false;
      logger.info("Redis connected.");
    });
    client.on("error", markUnavailable);
    client.on("end", () => {
      state.ready = false;
      state.failed = true;
    });

    state.client = client;
  }

  state.connectPromise = state.client
    .connect()
    .catch((error) => markUnavailable(error))
    .finally(() => {
      state.connectPromise = null;
    });
};

if (!state.disabled && !state.skipped) {
  connectRedis();
}

const now = () => Date.now();

const getMemoryEntry = (key) => {
  const entry = state.memory.get(key);
  if (!entry) return null;

  if (entry.expiresAt !== null && entry.expiresAt <= now()) {
    state.memory.delete(key);
    return null;
  }

  return entry;
};

const ttlMs = (options = {}) => {
  if (typeof options.EX === "number") return options.EX * 1000;
  if (typeof options.PX === "number") return options.PX;
  return null;
};

const memorySet = (key, value, options = {}) => {
  const ttl = ttlMs(options);
  state.memory.set(key, {
    value: String(value),
    expiresAt: ttl === null ? null : now() + Math.max(0, ttl),
  });
  return "OK";
};

const memoryDel = (...keys) => {
  let removed = 0;
  for (const key of keys.flat()) {
    if (state.memory.delete(key)) removed += 1;
  }
  return removed;
};

const memoryIncr = (key) => {
  const entry = getMemoryEntry(key);
  const next = Number(entry?.value || 0) + 1;
  state.memory.set(key, {
    value: String(next),
    expiresAt: entry?.expiresAt ?? null,
  });
  return next;
};

const memoryExpire = (key, seconds) => {
  const entry = getMemoryEntry(key);
  if (!entry) return 0;

  entry.expiresAt = now() + Math.max(0, Number(seconds) || 0) * 1000;
  state.memory.set(key, entry);
  return 1;
};

const memoryTtl = (key) => {
  const entry = getMemoryEntry(key);
  if (!entry) return -2;
  if (entry.expiresAt === null) return -1;
  return Math.max(0, Math.ceil((entry.expiresAt - now()) / 1000));
};

const patternToRegExp = (pattern) => {
  const escaped = pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(`^${escaped}$`);
};

async function* memoryScan(pattern) {
  const regex = patternToRegExp(pattern);
  for (const [key, entry] of state.memory) {
    if (entry.expiresAt !== null && entry.expiresAt <= now()) {
      state.memory.delete(key);
      continue;
    }
    if (regex.test(key)) yield key;
  }
}

if (!state.cleanupTimer) {
  state.cleanupTimer = setInterval(() => {
    const current = now();
    for (const [key, entry] of state.memory) {
      if (entry.expiresAt !== null && entry.expiresAt <= current) {
        state.memory.delete(key);
      }
    }
  }, 60_000);
  state.cleanupTimer.unref?.();
}

const callRedis = async (operation, fallback) => {
  if (state.ready && state.client) {
    try {
      return await operation(state.client);
    } catch (error) {
      markUnavailable(error);
    }
  }

  return fallback();
};

const redisClient = {
  get: (key) =>
    callRedis(
      (client) => client.get(key),
      () => getMemoryEntry(key)?.value ?? null
    ),
  set: (key, value, options = {}) =>
    callRedis(
      (client) => client.set(key, value, options),
      () => memorySet(key, value, options)
    ),
  del: (...keys) =>
    callRedis(
      (client) => client.del(...keys),
      () => memoryDel(...keys)
    ),
  incr: (key) =>
    callRedis(
      (client) => client.incr(key),
      () => memoryIncr(key)
    ),
  expire: (key, seconds) =>
    callRedis(
      (client) => client.expire(key, seconds),
      () => memoryExpire(key, seconds)
    ),
  ttl: (key) =>
    callRedis(
      (client) => client.ttl(key),
      () => memoryTtl(key)
    ),
  async *scan(pattern) {
    if (state.ready && state.client) {
      try {
        for await (const key of state.client.scanIterator({ MATCH: pattern })) {
          yield key;
        }
        return;
      } catch (error) {
        markUnavailable(error);
      }
    }

    yield* memoryScan(pattern);
  },
};

export const isRedisReady = () => state.ready;
export default redisClient;

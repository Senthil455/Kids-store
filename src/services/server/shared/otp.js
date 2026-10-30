import crypto from "crypto";
import axios from "axios";
import bcrypt from "bcryptjs";
import redisClient from "@/configs/redis";
import logger from "@/utils/logger";

export const OTP_TTL_SECONDS = 120;
export const OTP_RESEND_SECONDS = 60;
const MAX_VERIFY_ATTEMPTS = 5;

const otpKey = (phone) => `otp:${phone}`;
const attemptsKey = (phone) => `otp:attempts:${phone}`;
const cooldownKey = (phone) => `otp:cooldown:${phone}`;

const formatSeconds = (total) =>
  `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;

const sendSms = async (phone, code) => {
  const apiUrl = process.env.SMS_API_URL;

  if (!apiUrl) {
    if (process.env.NODE_ENV !== "production") {
      logger.info(`[DEV OTP] ${phone}: ${code}`);
      return;
    }
    throw new Error("SMS provider is not configured");
  }

  await axios.post(
    apiUrl,
    {
      to: phone,
      message: `Your verification code is ${code}`,
      sender: process.env.SMS_SENDER || undefined,
      template_id: process.env.SMS_TEMPLATE_ID || undefined,
      variables: { code: String(code) },
    },
    {
      headers: {
        "Content-Type": "application/json",
        ...(process.env.SMS_API_KEY ? { Authorization: `Bearer ${process.env.SMS_API_KEY}` } : {}),
      },
      timeout: 10000,
    }
  );
};

export const sendOtp = async (phone) => {
  const cooldown = await redisClient.ttl(cooldownKey(phone));
  if (cooldown > 0) {
    const remainingTime = formatSeconds(cooldown);
    return { success: false, status: 429, message: `Try again after ${remainingTime}`, data: { remainingTime } };
  }

  const code = crypto.randomInt(10000, 100000);

  try {
    await sendSms(phone, code);
  } catch (error) {
    logger.error(`SMS service error: ${error.message}`);
    return { success: false, status: 502, message: "SMS service failed" };
  }

  await redisClient.set(otpKey(phone), await bcrypt.hash(String(code), 10), { EX: OTP_TTL_SECONDS });
  await redisClient.set(cooldownKey(phone), "1", { EX: OTP_RESEND_SECONDS });
  await redisClient.del(attemptsKey(phone));

  return {
    success: true,
    message: "Code sent successfully",
    data: { remainingTime: formatSeconds(OTP_RESEND_SECONDS) },
  };
};

export const verifyOtp = async (phone, code) => {
  const savedHash = await redisClient.get(otpKey(phone));
  if (!savedHash) {
    return { success: false, status: 410, message: "Code expired. Request a new one." };
  }

  const attempts = await redisClient.incr(attemptsKey(phone));
  if (attempts === 1) await redisClient.expire(attemptsKey(phone), OTP_TTL_SECONDS);

  if (attempts > MAX_VERIFY_ATTEMPTS) {
    await redisClient.del(otpKey(phone));
    return { success: false, status: 429, message: "Too many wrong codes. Request a new code." };
  }

  if (!(await bcrypt.compare(String(code), savedHash))) {
    return { success: false, status: 400, message: "Invalid code" };
  }

  const deleted = await redisClient.del(otpKey(phone));
  await redisClient.del(attemptsKey(phone));

  if (!deleted) {
    return { success: false, status: 410, message: "Code expired. Request a new one." };
  }

  return { success: true };
};

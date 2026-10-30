const REQUEST_URL = process.env.PAYMENT_REQUEST_URL || "";
const VERIFY_URL = process.env.PAYMENT_VERIFY_URL || "";
const START_URL = process.env.PAYMENT_START_URL || "";
const AMOUNT_MULTIPLIER = Number(process.env.PAYMENT_AMOUNT_MULTIPLIER || 100);

const toGatewayAmount = (amount) => Math.round(Number(amount || 0) * AMOUNT_MULTIPLIER);

const paymentUrl = (authority) =>
  START_URL ? `${START_URL.replace(/\/?$/, "/")}${encodeURIComponent(String(authority))}` : "";

const postJson = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(process.env.PAYMENT_API_KEY ? { Authorization: `Bearer ${process.env.PAYMENT_API_KEY}` } : {}),
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(15000),
  });
  const data = await response.json().catch(() => ({}));
  return { response, data };
};

/**
 * Starts an online payment.
 *
 * The gateway contract is intentionally provider-neutral:
 * request  -> { data: { authority: string } } (or { authority })
 * response -> { url: string } or a configured PAYMENT_START_URL + authority.
 */
export const createPayment = async (amount, description, mobile) => {
  if (!REQUEST_URL) throw new Error("Online payments are not configured");

  const { response, data } = await postJson(REQUEST_URL, {
    merchant_id: process.env.PAYMENT_MERCHANT_ID,
    callback_url: process.env.PAYMENT_CALLBACK_URL,
    amount: toGatewayAmount(amount),
    description,
    metadata: mobile ? { mobile } : {},
  });

  if (!response.ok || (data?.errors && Object.keys(data.errors).length)) {
    throw new Error("Payment request failed");
  }

  const payload = data?.data ?? data;
  const authority = payload?.authority || payload?.id || payload?.token;
  const redirectUrl = payload?.url || payload?.paymentUrl || (authority ? paymentUrl(authority) : "");

  if (!authority || !redirectUrl) throw new Error("Payment gateway did not return a payment link");

  return { data: { authority, url: redirectUrl } };
};

/**
 * Verifies a payment. Accepts the common response shapes used by hosted
 * gateways: { success: true, refId }, { status: "paid" } or { code: 100 }.
 */
export const verifyPayment = async (authority, amount) => {
  if (!VERIFY_URL) {
    return { success: false, unreachable: true, message: "Online payments are not configured" };
  }

  let result;
  try {
    result = await postJson(VERIFY_URL, {
      merchant_id: process.env.PAYMENT_MERCHANT_ID,
      authority,
      amount: toGatewayAmount(amount),
    });
  } catch {
    return { success: false, unreachable: true, message: "Payment gateway unreachable" };
  }

  const { response, data } = result;
  if (!response.ok || (data?.errors && Object.keys(data.errors).length)) {
    return { success: false, message: "Payment verification failed" };
  }

  const payload = data?.data ?? data;
  const status = String(payload?.status || "").toLowerCase();
  const passed =
    payload?.success === true ||
    ["paid", "succeeded", "completed", "success"].includes(status) ||
    [100, 101].includes(Number(payload?.code));

  if (passed) {
    return { success: true, refId: payload?.refId || payload?.ref_id || payload?.id || authority };
  }

  return { success: false, message: payload?.message || "Payment not verified" };
};

export { toGatewayAmount, paymentUrl };

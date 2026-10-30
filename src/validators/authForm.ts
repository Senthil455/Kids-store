import { z } from "zod";

export const PHONE_REGEX = /^\+?[1-9]\d{6,14}$/;
export const OTP_RESEND_SECONDS = 60;

export const phoneSchema = z.string().trim().regex(PHONE_REGEX, "Enter a valid phone number");
export const otpCodeSchema = z
  .string()
  .trim()
  .regex(/^\d{4,6}$/, "Code must be 4 to 6 digits");

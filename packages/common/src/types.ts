import z from "zod";

export const authPhoneNumberSchema = z.object({
  number: z.string()
});

export const verifySchema = z.object({
  name: z.string(),
  number: z.string(),
  otp: z.string(),
});

export const verifySigninSchema = z.object({
  name: z.string(),
  number: z.string(),
  otp: z.string(),
});

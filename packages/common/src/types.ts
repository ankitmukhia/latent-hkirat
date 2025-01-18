import z from "zod";

export const authPhoneNumberSchema = z.object({
  number: z.number().min(9).max(13)
});

export const verifySchema = z.object({
  name: z.string(),
  number: z.number(),
  otp: z.number(),
});

export const verifySigninSchema = z.object({
  name: z.string(),
  number: z.number(),
  otp: z.number(),
});

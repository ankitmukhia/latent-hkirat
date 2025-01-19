import z from "zod";

export const authPhoneNumberSchema = z.object({
  number: z.number()
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

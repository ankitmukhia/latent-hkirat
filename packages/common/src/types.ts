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

export const verifyEventSchema = z.object({
	name: z.string(),
	description: z.string(),
	start_date: z.date(),
	banner: z.string(),
	location: z.string()
})

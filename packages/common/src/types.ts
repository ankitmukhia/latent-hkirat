import z from "zod";

export const authPhoneNumberSchema = z.object({
  number: z.string()
});

export const verifySchema = z.object({
  name: z.string(),
  number: z.string(),
  otp: z.string(),
});

export const verifyAdminSchema = z.object({
  name: z.string(),
  number: z.string(),
});

export const verifySigninSchema = z.object({
  name: z.string(),
  number: z.string(),
  otp: z.string(),
});

export const verifyEventSchema = z.object({
	name: z.string(),
	description: z.string(),
	startTime: z.date(),
	locationId: z.string(),
	banner: z.string(),
	seats: z.array(z.object({
		name: z.string(),
		description: z.string(),
		price: z.number(),
		capacity: z.number()
	}))
})

export const updateEventSchema = z.object({
	name: z.string(),
	description: z.string(),
	startTime: z.string(),
	location: z.string(),
	banner: z.string(),
	published: z.boolean(),
	ended: z.boolean()
})

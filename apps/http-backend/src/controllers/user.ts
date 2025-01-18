import { Request, Response } from 'express'
import { authPhoneNumberSchema, verifySchema } from '@repo/common/types'
import { db }  from '@repo/db'

export const userController = {
	async signup(req: Request, res: Response) {
		const { number } = req.body
		console.log("log phone number: ",number)
		const { data, success } = authPhoneNumberSchema.safeParse({ number })
		if (!success) {
			res.status(400).json({
				error: "Bad Request",
				message: "Invalid or missing phone number"
			})
			return
		}

		res.status(201).json({
			phone_number: data.number 
		})

		//? zod validation
	},
	async signupVerify(req: Request, res: Response) {
		const { number, name, opt } = req.body	
		const { data, success } = verifySchema.safeParse({ number, name, opt })
		//? zod validation
	},
	async signin(req: Request, res: Response) {
		const { number } = req.body
		const { data, success } = authPhoneNumberSchema.safeParse({ number })
		//? zod validation
	},
	async signinVerify(req: Request, res: Response) {
		const { number, name, otp } = req.body	
		const { data, success } = verifySchema.safeParse({ name, number, otp })
		//? zod validation
	}
}

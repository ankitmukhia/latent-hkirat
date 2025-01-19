import { Request, Response } from 'express'
import { authPhoneNumberSchema, verifySchema } from '@repo/common/types'
import { generateToken, verifyToken } from 'authenticator'
import { db }  from '@repo/db'

export const userController = {
	async signup(req: Request, res: Response) {
		const { number } = req.body
		const { data, success } = authPhoneNumberSchema.safeParse({ number })
		if (!success) {
			res.status(400).json({
				error: "Bad Request",
				message: "Invalid or missing phone number"
			})
			return
		}
		console.log(data.number)

		const otp = generateToken(data.number.toString())
		const user = await db.user.upsert({
			create: {
				number
			},
			update: {},
			where: {
				number
			}
		})

		if(!user) {
			res.status(500).json({
				error: "Failed to create user."
			})
			return
		}


		res.status(201).json({
			id: user.id
		})
	},
	async signupVerify(req: Request, res: Response) {
		const { number, name, otp } = req.body	
		const { data, success } = verifySchema.safeParse({ number, name, opt })
		
		if(!success) {
			res.status(400).json({
				error: "Bad Request",
				message: "Invalid or missing phone number"
			})
			return
		}
			
		if(!verifyToken(number + "SIGNUP", otp.toString())) {
			res.status(400).json({
				error: "Invalid token",
				message: "Failed to verify"
			})
			return
		}

		const user = await db.user.update({
			where: {
				number
			},
			data: {
				name,
				verified: true
			}
		})	

		if(!user) {
			res.status(500).json({
				error: "Failed to verify"
			})
			return
		}
		// 1. JWT // is not the best aproch, bolow are the reason. Tommowow I will do this.
		//? next tommorow? you should have a expire, have refresh tokens, if your token leaked people can't keep reloggingin

		res.status(200).json({
			token: "token"
		})

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

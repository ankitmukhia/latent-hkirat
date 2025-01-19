import { Request, Response } from 'express'
import { authPhoneNumberSchema, verifySchema } from '@repo/common/types'
import { generateToken, verifyToken, generateKey } from 'authenticator'
import { signeature } from '../config'
import { sendMessage } from '../config/twilio'
import jwt from 'jsonwebtoken'
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

		const otp = generateToken(data.number)
		const user = await db.user.upsert({
			create: {
				number: data.number
			},
			update: {},
			where: {
				number: data.number
			}
		})
		if(!user) {
			res.status(500).json({
				error: "Failed to create user."
			})
			return
		}

		//? send message/otp to the user number
		try{
			await sendMessage(`Your otp for logging into latent is ${otp}`, data.number)
		}catch(err) {
			console.log(err)
			new Error("Something went wrong.")
			return 
		}

		res.status(201).json({
			id: user.id
		})
	},
	async signupVerify(req: Request, res: Response) {
		const { number, name, otp } = req.body
		const { data, success } = verifySchema.safeParse({ number, name, otp })
		
		if(!success) {
			res.status(400).json({
				error: "Bad Request",
				message: "Invalid or missing phone number"
			})
			return
		}

		const formattedKey = generateKey()
		console.log(verifyToken(formattedKey, "685957"))
			
		/* if(!verifyToken(formattedKey, otp)) {
			res.status(400).json({
				error: "Invalid token",
				message: "Failed to verify"
			})
			return
		} */

		/* const user = await db.user.update({
			where: {
				number: data.number
			},
			data: {
				name: data.name,
				verified: true
			}
		})	

		if(!user) {
			res.status(500).json({
				error: "Failed to verify"
			})
			return
		}
		const payload = {
			userId: user.id		
		}
		// make it more secure by introduding, expire/refrech tokens etc.
		const token = jwt.sign(payload, signeature) */

		res.status(200).json({
			token: "LaLa"
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

import { Request, Response } from 'express'
import { authPhoneNumberSchema, verifySchema } from '@repo/common/types'
import { generateToken, verifyToken } from 'authenticator'
import { signeature } from '../config/index'
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

		try {
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

			if(process.env.ENV === "production") {
				const otp = generateToken(data.number)
				try{
					await sendMessage(`Your otp for logging into latent is ${otp}`, data.number)
				}catch(err) {
					console.log(err)
					new Error("Something went wrong.")
					return 
				}
			}

			res.status(201).json({
				id: user.id
			})
		}catch(err) {
			res.status(500).json({
				error: "Internal server error",
				message: err || "An unexpected error occurred.",
			});	
		}
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

		if(process.env.ENV === "production") {
			const verifyResult = verifyToken(data.number, data.otp)
			if(verifyResult === null){
				res.status(400).json({
					error: "Invalid token",
					message: "Failed to verify"
				})
				return
			}
		}
	
		try{
			const user = await db.user.update({
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
			const token = jwt.sign(payload, signeature)

			res.status(200).json({
				token
			})
		}catch(err) {
			res.status(500).json({
				error: "Internal server error",
				message: err || "An unexpected error occurred.",
			});	
		}
	},
	async signin(req: Request, res: Response) {
		const { number } = req.body
		const { data, success } = authPhoneNumberSchema.safeParse({ number })

		if(!success) {
			res.status(400).json({
				error: "Bad Request",
				message: "Invalid or missing number"
			})
			return
		}
	
		try {
			const user = await db.user.findUnique({
				where: {
					number: data.number
				}
			})

			if(!user) {
				res.status(500).json({
					error: "Not registred"
				})
				return
			}

			if(process.env.ENV === "production") {
				const otp = generateToken(data.number)
				try{
					await sendMessage(`Your otp for logging into latent is ${otp}`, data.number)
				}catch(err){
					console.log(err)
					new Error("Something went wrong")
					return
				}
			}

			res.status(200).json({
				id: user.id	
			})
		}catch(err) {
			res.status(500).json({
				error: "Internal server error",
				message: err || "An unexpected error occurred.",
			});	
		}	
	},
	async signinVerify(req: Request, res: Response) {
		const { number, name, otp } = req.body	
		const { data, success } = verifySchema.safeParse({ name, number, otp })

		if(!success) {
			res.status(400).json({
				error: "Invalid Request",
				message: "Invalid or missing number"
			})
			return
		}

		if(process.env.ENV === "production") {
			const verifyResult = verifyToken(data.number, data.otp)
			if(verifyResult === null){
				res.status(400).json({
					error: "Invalid token",
					message: "Failed to vefify"
				})
				return
			}
		}

		try{
			const user = await db.user.update({
				where: {
					number: data.number
				},
				data: {
					name,
					verified: true
				}
			})

			if(!user) {
				res.status(404).json({
					error: "Not Registred"
				})
				return
			}

			const payload = {
				userId: user.id
			}

			const token = jwt.sign(payload, signeature)

			res.status(200).json({
				token
			})
		}catch(err) {
			res.status(500).json({
				error: "Internal server error",
				message: err || "An unexpected error occurred.",
			});	
		}
	}
}

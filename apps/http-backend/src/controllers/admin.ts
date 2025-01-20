import { Request, Response } from 'express'
import { authPhoneNumberSchema, verifySigninSchema }  from '@repo/common/types'
import { generateToken, verifyToken } from 'authenticator'
import { sendMessage } from '../config/twilio'
import jwt from 'jsonwebtoken'
import { signeature } from '../config/index'
import { db } from '@repo/db'

export const adminControllers = {
	async signin(req: Request, res: Response) {
		const { number } = req.body
		const { data, success } = authPhoneNumberSchema.safeParse({ number }) 
		if(!success) {
			res.status(400).json({
				error: "Valid Request",
				message: "Invalid or missing number"
			})
			return
		}
		console.log(data.number)

		try{
			const admin = await db.admin.findUnique({
				where: {
					number: data.number
				}
			})

			if(!admin) {
				res.status(500).json({
					error: "Couldn't find admin"
				})
				return
			}

			console.log("admin find: ", admin)

			if(process.env.ENV === "production"){
				const otp = generateToken(data.number)
				try{
					await sendMessage(`Your otp for loggin as Admin is ${otp}`, data.number)
				}catch(err) {
					console.log(err)
					new Error("Couldn't create otp")
					return
				}
			}

			res.status(200).json({
				id: admin.id	
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
		const {data, success} = verifySigninSchema.safeParse({ number, name, otp })
		if(!success){
			res.status(400).json({
				error: "Bad Request",
				message: "Invalid or missing body"
			})
			return
		}
		console.log(data.otp)

		if(process.env.ENV === "production") {
			const verifyResult = verifyToken(data.number, data.otp)
			if(verifyResult === null) {
				res.status(400).json({
					error: "Invalid token",
					message: "Failed to vefify"
				})
				return
			}
		}

		try {
			const admin = await db.admin.update({
				where: {
					number: data.number
				},
				data: {
					name: data.name,
					verified: true
				}
			})

			if(!admin) {
				res.status(500).json({
					error: "Invalid admin"
				})
				return
			}
			console.log("admin update: ", admin)

			const payload = {
				adminId: admin.id
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
	},
}

import { Router, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { signeature } from '../../config/index'
import { db } from '@repo/db'
import { verifyAdminSchema } from '@repo/common/types'
const testRouter: Router = Router()

testRouter.post("/create-admin", async (req: Request, res: Response) => {
	const { number, name } = req.body
	const { data, success }  = verifyAdminSchema.safeParse({ name, number })

	if(!success) {
		res.status(400).json({
			error: "Bad Request",
			"message": "Invalid or missing request"
		})
		return
	}

	const admin = await db.admin.create({
		data: {
			name: data.name,
			number: data.number
		}	
	})

	if(!admin) {
		res.status(500).json({
			error: "Error creating admin"
		})
		return
	}

	const payload = {
		userId: admin.id	
	}

	const token = jwt.sign(payload, signeature)

	res.status(201).json({
		token	
	})
})

testRouter.post("/create-user", (req: Request, res: Response) => {

})

export { testRouter }

import { Request, Response } from 'express'
import  { verifyLocationSchema } from '@repo/common/types' 
import { db } from '@repo/db'

export const locationController = {
	async createLocation(req: Request, res: Response) {
		const { name, description, imageUrl } = req.body
		const { data, success } = verifyLocationSchema.safeParse({ name, description, imageUrl })

		if(!success) {
			res.status(400).json({
				error: "Bad Request",
				message: "Invalid or missing req"
			})
			return
		}

		try{
			const location = await db.location.create({
				data: {
					name: data.name,
					description: data.description,
					imageUrl: data.imageUrl
				}
			})

			if(!location) {
				res.status(400).json({
					error: "Error creating location"
				})
				return
			}

			res.status(201).json({
				id: location.id
			})
		}catch(err) {
			console.log(err)
			res.status(500).json({
				error: "Internal server error",
				message: err || "An unexpected error occurred.",
			})
		}

	},
	async getLocation(req: Request, res: Response) {
		//?db call
	}
}

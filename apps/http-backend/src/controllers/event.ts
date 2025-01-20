import { Request, Response } from 'express'
import { verifyEventSchema } from '@repo/common/types'
import { db } from '@repo/db'

export const eventController = {
	async event(req: Request, res: Response){
		const { name, description, location, start_date, banner } = req.body
		const adminId = req.adminId
		const { data, success } = verifyEventSchema.safeParse({ name, description, location, start_date, banner })
		if(!success){
			res.status(400).json({
				error: "Bad Request",
				message: "Invalid or missing body"
			})
			return
		}

		try{
			const event = await db.event.create({
				data: {
					name: data.name,
					description: data.description,
					banner: data.banner,
					startDate: data.start_date,
					adminId
				}	
			})	

			if(!event) {
				res.status(500).json({
					error: "Faild to create event"
				})
				return
			}

			res.status(201).json({
				eventId: event.id
			})
		}catch(err) {
			res.status(500).json({
				error: "Internal server error",
				message: err || "An unexpected error occurred.",
			});	
		}
	}
}

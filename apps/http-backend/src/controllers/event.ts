import { Request, Response } from 'express'
import { verifyEventSchema, updateEventSchema } from '@repo/common/types'
import { db } from '@repo/db'

export const eventController = {
	async createEvent(req: Request, res: Response){
		const { name, description, location, startTime, banner } = req.body
		const adminId = req.adminId
		const { data, success } = verifyEventSchema.safeParse({ name, description, location, startTime, banner })
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
					startTime: new Date(data.startTime),
					adminId,
					locationId:  data.locationId,
					seatTypes: {
						create: data.seats.map(seat => ({
							name: seat.name,
							description: seat.description,
							price: seat.price,
							capacity: seat.capacity
						}))
					}
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
	},
	async updateEventMetadata(req: Request, res: Response) {
		const { name, description, startTime, location, banner, published, ended } = req.body 
		const { data, success } = updateEventSchema.safeParse({ name, description, startTime, location, banner, published, ended })
		const adminId = req.userId
		const eventId = req.params.eventId
		if(!success) {
			res.status(400).json({
				error: "Bad Request",
				message: "Invalid or missing request"
			})
			return
		}

		try{
			const event = await db.event.findUnique({
				where: {
					id: eventId
				}
			})

			if(!event || event.adminId != adminId) {
				res.status(404).json({
					message: "Counld't find event"
				})
				return
			}

			await db.event.update({
				where: {
					id: eventId
				},
				data: {
					name: data.name,
					description: data.description,
					locationId: data.location,
					banner: data.banner,
					adminId,
					published: data.published,
					ended: data.ended
				}
			})
			res.status(200).json({
				id: event.id
			})
		}catch(err) {
			res.status(500).json({
				error: "Internal server error",
				message: err  || "An unexpected error occurred"
			})
		}
	},
	async getAllEvents(req: Request, res: Response){
		const adminId = req.userId
		if(typeof adminId !== "string") {
			res.status(400).json({
				error: "Bad Request",
				message: "Invalid or missing req"
			})
			return
		}

		// find all events that given user/admin has
		const events = await db.event.findMany({
			where: {
				adminId
			},
			include: {
				seatTypes: true 
			}
		})

		if(!events) {
			res.status(500).json({
				error: "Event not found"
			})
			return
		}

		res.status(200).json({
			events
		})
	},
	async getEvent(req: Request, res: Response) {
		const { eventId } = req.params

		const event = await db.event.findUnique({
			where: {
				id: eventId
			}
		})

		if(!event) {
			res.status(500).json({
				error: "Event not found"
			})
			return
		}

		res.status(200).json({
			event
		})
	}
}

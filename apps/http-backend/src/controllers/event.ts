import { Request, Response } from 'express'
import { verifyEventSchema, updateEventSchema, updateSeatSchema } from '@repo/common/types'
import { db } from '@repo/db'

export const eventController = {
	async createEvent(req: Request, res: Response){
		const { name, description, locationId, startTime, banner, seats } = req.body
		const adminId = req.userId 
		const { data, success } = verifyEventSchema.safeParse({ 
			name,
			description,
			locationId,
			banner,
			startTime,
			seats
		})
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
					startTime: new Date(data.startTime),
					locationId: data.locationId,
					banner: data.banner,
					adminId,
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
	},
	async updateEventSeat(req: Request, res: Response) {
		const { name, description, price, capacity } = req.body
		const { data, success } = updateSeatSchema.safeParse({ name, description, price, capacity }) 
		const adminId = req.userId
		const eventId = req.params.eventId

		if(!success) {
			res.status(400).json({
				error: "Bad Request",
				message: "Invalid or missing req body"
			})
			return
		}

		if(!adminId || !eventId) {
			res.status(400).json({
				error: "Bad Request",
				message: "Invalid or missing adminId or eventId"
			})
			return
		}

		const currentSeats = await db.seatType.findMany({
			where: {
				eventId 
			}
		})
	
		const newSeats = data.seats.filter(x => !x.id)
		// filter the data.seats array to include elements that have an id and match an id in the currentSeats array.
		const updatedSeats = data.seats.filter(x => x.id && currentSeats.find(y => y.id === x.id))
		// filter currentseats array to include only elements whos id is not found in the data.seats array
		const deletedSeats = currentSeats.filter(x => !data.seats.find(y => y.id === x.id))

		try{
			await db.$transaction([
				db.seatType.deleteMany({
					where: {
						id: {
							in: deletedSeats.map(x => x.id)
						}	
					}
				}),

				db.seatType.createMany({
					data: newSeats.map(x => ({
						name: x.name,
						description: x.description,
						price: x.price,
						capacity: x.capacity,
						eventId
					})) 
				}),
				...updatedSeats.map(seat => db.seatType.update({
					where: {
						id: seat.id
					},
					data: {
						name: seat.name,
						description: seat.description,
						price: seat.price,
						capacity: seat.capacity
					}
				}))

			])
			res.status(200).json({
				message: "Event seat updated successfully."
			})
		}catch(err) {
			console.log(err)
			res.status(500).json({
				error: "Internal server error",
				message: err || "An unexpected error occurred.",
			});	
		}

	}
}

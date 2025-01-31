import { Request, Response } from 'express'
import { createBookingSchema } from '@repo/common/types'
import { getRedisKey, incrCount } from '@repo/redis'
import { db } from '@repo/db'

interface BodyType {
	eventId: string;
	seats: {
		id: string;
		qty: number;
	}
}

export const userBookingController = {
	async getBookings(req: Request, res: Response){
		const userId = req.userId

		if(typeof userId !== "string") {
			res.status(400).json({
				error: "Bad Request",
				message: "Unauthorized user"
			})
			return
		}

		const bookings = await db.booking.findMany({
			where: {
				userId
			}
		})

		res.status(200).json({
			bookings
		})
	},
	async createBooking(req: Request, res: Response) {
		// this should be Ddos, enpoint coz user will hit this a lot.
		const { eventId, seats } = req.body as BodyType
		const userId = req.userId
		const { data, success } = createBookingSchema.safeParse({ eventId, seats })

		if(!success) {
			res.status(400).json({
				error: "Bad Request",
				message: "Invalid or missing request"
			})
			return
		}

		if(!userId) {
			res.status(400).json({
				message: "Unauthorized"
			})
			return
		}
	
		try{
			const counter = await incrCount(getRedisKey(`Booking-${data.eventId}`))
			const booking = await db.booking.create({
				data: {
					eventId: data.eventId,
					userId,
					status: "Pending",
					sequenceNumber: counter
				}
			})

			res.status(201).json({
				id: booking.id
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

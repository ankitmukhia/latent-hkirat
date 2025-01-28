import { Request, Response } from 'express'
import { createBookingSchema } from '@repo/common/types'
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

		const bookings = await db.booking.findMany({})

		res.status(200).json({
			bookings
		})
	},
	async createBooking(req: Request, res: Response) {
		// this should be Ddos enpoint coz user will hit this a lot.
		const { eventId, seats } = req.body as BodyType
		const { data, success } = createBookingSchema.safeParse({ eventId, seats })

		if(!success) {
			res.status(400).json({
				error: "Bad Request",
				message: "Invalid or missing request"
			})
			return
		}

		//?db call
		/* db.booking.create({
		}) */

	}
}

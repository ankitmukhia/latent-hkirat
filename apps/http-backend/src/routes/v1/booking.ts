import { Router } from 'express'
const userBookingRouter: Router = Router()
import { userMiddleware } from '../../middlewares/user'
import { userBookingController } from '../../controllers/booking'

userBookingRouter.use("/", userMiddleware, userBookingController.getBookings)

export { userBookingRouter }

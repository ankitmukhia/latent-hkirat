import { Router } from 'express'
const router: Router = Router()

import { userRouter } from './user'
import { adminRouter } from './admin'
import { profileRouter } from './profile'
import { eventsRouter } from './events'
import { testRouter } from './tests'
import { locationRouter } from './location'
import { userBookingRouter } from './booking'

router.use("/user", userRouter)
router.use("/user/bookings", userBookingRouter)
router.use("/admin", adminRouter)
router.use("/profile", profileRouter)
router.use("/admin/event", eventsRouter)
router.use("/admin/location", locationRouter)

if(process.env.ENV !== "production") {
	router.use("/test", testRouter)
}

export { router }

import { Router } from 'express'
const router: Router = Router()

import { userRouter } from './user'
import { adminRouter } from './admin'
import { profileRouter } from './profile'
import { eventsRouter } from './events'
import { testRouter } from './tests'
import { locationRouter } from './location'

router.use("/user", userRouter)
router.use("/admin", adminRouter)
router.use("/profile", profileRouter)
router.use("/admin/event", eventsRouter)
router.use("/admin/location", locationRouter)
//? next will be specific events

if(process.env.ENV !== "production") {
	router.use("/test", testRouter)
}

export { router }

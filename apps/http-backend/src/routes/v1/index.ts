import { Router } from 'express'
const router: Router = Router()

import { userRouter } from './user'
import { adminRouter } from './admin'
import { profileRouter } from './profile'
import { eventsRouter } from './events'

router.use("/user", userRouter)
router.use("/admin", adminRouter)
router.use("/profile", profileRouter)
router.use("/events", eventsRouter)
//? next will be specific events

export { router }

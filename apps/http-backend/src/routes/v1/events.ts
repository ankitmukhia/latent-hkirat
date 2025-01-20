import { Router } from 'express'
const eventsRouter: Router = Router()
import { eventController } from '../../controllers/event'

eventsRouter.post("/signin", eventController.event)
eventsRouter.post("/signin", eventController.event)

export { eventsRouter }

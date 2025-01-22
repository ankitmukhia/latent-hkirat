import { Router } from 'express'
const eventsRouter: Router = Router()
import { eventController } from '../../controllers/event'

eventsRouter.post("/", eventController.createEvent)
eventsRouter.put("/metadata/:eventId", eventController.updateEventMetadata)
eventsRouter.get("/", eventController.getAllEvents)
eventsRouter.get("/:eventId", eventController.getEvent)

export { eventsRouter }

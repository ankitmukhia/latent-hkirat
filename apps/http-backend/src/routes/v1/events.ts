import { Router } from 'express'
const eventsRouter: Router = Router()
import { eventController } from '../../controllers/event'
import { adminMiddleware } from '../../middlewares/admin'

eventsRouter.get("/:eventId",  adminMiddleware, eventController.getEvent)
eventsRouter.get("/",  adminMiddleware, eventController.getAllEvents)
eventsRouter.post("/", adminMiddleware, eventController.createEvent)
eventsRouter.put("/metadata/:eventId", adminMiddleware, eventController.updateEventMetadata)
eventsRouter.put("/seats/:eventId",  adminMiddleware, eventController.updateEventSeat)

export { eventsRouter }

import { Router } from 'express'
const eventsRouter: Router = Router()
import { eventController } from '../../controllers/event'
import { adminMiddleware } from '../../middlewares/admin'

eventsRouter.post("/", adminMiddleware, eventController.createEvent)
eventsRouter.put("/metadata/:eventId", adminMiddleware, eventController.updateEventMetadata)
eventsRouter.get("/",  adminMiddleware, eventController.getAllEvents)
eventsRouter.get("/:eventId",  adminMiddleware, eventController.getEvent)
eventsRouter.put("/:eventId",  adminMiddleware, eventController.updateEventSeat)

export { eventsRouter }

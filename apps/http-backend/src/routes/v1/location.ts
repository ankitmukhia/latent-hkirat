import { Router } from 'express'
const locationRouter: Router = Router()
import { locationController } from '../../controllers/location'

locationRouter.post("/", locationController.createLocation)
locationRouter.get("/", locationController.getLocation)

export { locationRouter }

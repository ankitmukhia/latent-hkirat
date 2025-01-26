import { Router } from 'express'
const profileRouter: Router = Router()

import { profileController } from '../../controllers/profile'

profileRouter.post("/", profileController.createProfile)

export { profileRouter }

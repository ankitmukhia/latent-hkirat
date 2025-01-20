import { Router } from 'express'
import { adminControllers } from '../../controllers/admin'
const adminRouter: Router = Router()

adminRouter.post('/signin', adminControllers.signin)
adminRouter.post('/signin/verify', adminControllers.signinVerify)

export { adminRouter }

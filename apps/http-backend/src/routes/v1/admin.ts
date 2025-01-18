import { Router } from 'express'
import { adminControllers } from '../../controllers/admin'
const adminRouter: Router = Router()

adminRouter.use('/admin', adminControllers.signin)
adminRouter.use('/admin', adminControllers.signup)

export { adminRouter }

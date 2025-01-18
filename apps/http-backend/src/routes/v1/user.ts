import { Router } from 'express'
const userRouter: Router = Router()

import { userController } from '../../controllers/user'

userRouter.post("/signup", userController.signup)
userRouter.post("/signup/verify", userController.signupVerify)
userRouter.post("/signin", userController.signin)
userRouter.post("/signin/verify", userController.signinVerify)

export { userRouter }

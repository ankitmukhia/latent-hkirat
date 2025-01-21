import { signeature } from '../config/index'
import { middleware } from './index'

export const userMiddleware = middleware(signeature)

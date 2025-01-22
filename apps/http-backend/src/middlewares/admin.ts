import { signeature } from '../config/index' 
import { middleware } from './index'

export const adminMiddleware = middleware(signeature) 

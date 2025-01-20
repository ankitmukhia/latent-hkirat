import { Request, Response, NextFunction } from 'express'
import { signeature } from '../config/index'
import jwt from 'jsonwebtoken'

interface DecodeType {
	userId: string
	adminId: string
}

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers["authorization"]
	const token = authHeader?.split(" ")[1]

	if(!token) {
		res.status(401).json({
			message: "Authorization token is missing or invalid"
		})
		return
	}

	try{
		const verifyAdmin = jwt.verify(token, signeature) as DecodeType
		req.adminId = verifyAdmin.adminId
		next()
	}catch(err){
		res.status(401).json({
			message: "Unauthorized"
		})
	}
}

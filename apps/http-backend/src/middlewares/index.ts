import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface DecodeType {
	userId: string;
}

export const middleware = (...secrets: string[]) =>
(req: Request, res: Response, next: NextFunction) => {
	for(let secret of secrets) {
		if(req.headers.authorization) {
			if(verifyToken(req, res, secret)){
				next()		
				return
			}

		}	
	}

	res.status(401).json({ 
		message: "Unauthorized" 
	});
}

const verifyToken = (req: Request, res: Response, secret: string) => {
	const authHeader = req.headers["authorization"]
	const token = authHeader?.split(" ")[1]
	if(!token) {
		res.status(400).json({
			error: "Bad Request",
			message: "Invalid or missing request"
		})
		return
	}

	try {
		const verifyEntity = jwt.verify(token, secret) as DecodeType
		req.userId = verifyEntity.userId
		return true
	}catch(err) {
		return false
	}	
}	

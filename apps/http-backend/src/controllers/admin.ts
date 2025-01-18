import { Request, Response } from 'express'
/* import { authPhoneNumberSchema }  from '@repo/common/types'  */

export const adminControllers = {
	async signin(req: Request, res: Response) {
		const { number } = req.body
/* 		const { data } = authPhoneNumberSchema.safeParse({ number })  */
		// zod validation
	},
	async signup(req: Request, res: Response) {
		const { number, name } = req.body
/* 		const { data } = authPhoneNumberSchema.safeParse({ number, name }) */
		// zod validation
	},
}

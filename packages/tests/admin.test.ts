import { describe, it, expect } from 'vitest'
import { randomNumGenerator } from './utils/index'
import axios from 'axios'

const BASE_URL="http://localhost:3000"
const PHONE_NUMBER="+91890476" + randomNumGenerator(4)
const NAME="ankit"

describe("Admin signin endpoints", async () => {
	it("Testing create signup with admin", async () => {
		const response1 = await axios.post(`${BASE_URL}/v1/test/create-admin`, {
			number: PHONE_NUMBER,
			name: NAME 
		})

		expect(response1.status).toBe(201)
	})
	it("Signin with admin", async () => {
		/* const response1 = await axios.post(`${BASE_URL}/v1/admin/signin`, {
			number: PHONE_NUMBER
		}) 
 		*/
		const response2 = await axios.post(`${BASE_URL}/v1/admin/signin/verify`, {
			number: PHONE_NUMBER,
			name: NAME,
			otp: "000000"
		}) 

		/* expect(response1.status).toBe(200) */
		expect(response2.status).toBe(200)
	})
})

import { describe, it, expect } from 'vitest'
import axios from 'axios'

const BASE_URL="http://localhost:3000"
const PHONE_NUMBER="+918904764954"
const NAME="ankit"

describe("Admin signin endpoints", () => {
	it("Signin with admin", async () => {
		const response1 = await axios.post(`${BASE_URL}/v1/admin/signin`, {
			number: PHONE_NUMBER
		}) 
		console.log(response1)

		const response2 = await axios.post(`${BASE_URL}/v1/admin/signin/verify`, {
			number: PHONE_NUMBER,
			name: NAME,
			otp: "000000"
		}) 
		console.log(response2)

		expect(response1.status).toBe(200)
		expect(response2.status).toBe(200)
	})
})

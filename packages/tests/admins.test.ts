import axios from 'axios'
import { describe, it, expect, test } from 'vitest'

const BASE_URL="http://localhost:3000"
const PHONE_NUMBER="8904756875"
const NAME="ankit"

test("test", () => {
	expect(3).toBe(3)
})

/* describe.skip("Admin signin endpoints", async () => {
	it("Signin doesn't work for Admin", async () => {
		const response1 = await axios.post(`${BASE_URL}/v1/admin/signin`, {
			number: PHONE_NUMBER + "123" 
		})
		
		expect(response1.status).toBe(404)
	})


	it("Signin does work", async () => {
		//? create user admin
		const response1 = await axios.post(`${BASE_URL}/v1/admin/create-admin`, {
			number: PHONE_NUMBER,
		 	name: "Koi bhi"	
		})
		
		const response2 = await axios.post(`${BASE_URL}/v1/admin/signin`, {
			number: PHONE_NUMBER
		})
		
		expect(response1.status).toBe(200)
		expect(response1.data.token).not.toBeNull()
		expect(response2.status).toBe(200)
		expect(response2.data.token).not.toBeNull()
	})
}) */

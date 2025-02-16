import { describe, it, expect } from 'vitest'
import { randomNumGenerator } from './utils/index'
import axios from 'axios'

const BASE_URL="http://localhost:3000"
const PHONE_NUMBER="+91890476" + randomNumGenerator(4)
const NAME="ankit"

describe.skip("Admin signin endpoints", async () => {
	it("Testing create and signin", async () => {
		const response1 = await axios.post(`${BASE_URL}/v1/test/create-admin`, {
			number: PHONE_NUMBER,
			name: NAME 
		})

		const response2 = await axios.post(`${BASE_URL}/v1/admin/signin`, {
			number: PHONE_NUMBER
		}) 

		expect(response1.status).toBe(201)
		expect(response1.data.token).not.toBeNull()
		expect(response2.status).toBe(200)
		expect(response2.data.id).not.toBeNull()
	})
	it("Signin verify user", async () => {
		const response1 = await axios.post(`${BASE_URL}/v1/admin/signin/verify`, {
			number: PHONE_NUMBER,
			name: NAME,
			otp: "000000"
		}) 

		expect(response1.status).toBe(200)
		expect(response1.data.token).not.toBeNull()
	})
	it("signin verify won't work with not registered number", async () => {
		const res = await expect( async () =>{
			await axios.post(`${BASE_URL}/v1/admin/signin/verify`, {
				number: PHONE_NUMBER + "124", 
				name: NAME,
				otp: "000000"
			})
		}).rejects.toThrowError()
	})
})

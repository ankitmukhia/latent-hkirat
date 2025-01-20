import axios from 'axios' 
import { describe, expect, it } from 'vitest'

const BASE_URL="http://localhost:3000"
const PHONE_NUMBER="+918904764954"
const NAME="ankit"

describe("User signup endpoints", async () => {
	it("signup create", async () => {
		const response1 = await axios.post(`${BASE_URL}/v1/user/signup`, {
			number: PHONE_NUMBER 
		})

		const response2 = await axios.post(`${BASE_URL}/v1/user/signup/verify`, {
			number: PHONE_NUMBER,
			name: NAME,
			otp: "000000"
		})

		expect(response1.status).toBe(201)
		expect(response1.data.id).not.toBeNull()
		expect(response2.status).toBe(200)
	})
})

describe("User signin endpoints", async () => {
	it("Sigin works, user does exist in our record", async () => {
		const response1 = await axios.post(`${BASE_URL}/v1/user/signin`, {
			number: PHONE_NUMBER
		})

		const response2 = await axios.post(`${BASE_URL}/v1/user/signin/verify`, {
			number: PHONE_NUMBER,
			name: NAME,
			otp: "000000"
		})

		expect(response1.status).toBe(200)
		expect(response2.status).toBe(200)
		expect(response1.data.id).not.toBeNull()
		expect(response2.data.token).not.toBeNull()
	})

	it("Sigin doesn't work for user who's records doesn't exist", async () => {
		 expect(async () => {
			await axios.post(`${BASE_URL}/v1/user/signin`, {
				number: PHONE_NUMBER + "123" 
			})
		}).rejects.toThrowError()
	})
})

describe("Evnet endpoint", async () => {
	it("Create an event", async () => {
		const response1 = await axios.post(`${BASE_URL}/v1/user/signin`, {
			name: "Laugh Fest 2025",
			description: "A night of non-stop laughter with the funniest comedians in the city.",
			banner: "https://example.com/comedy-banner.jpg",
			startDate: "2025-03-15T19:00:00Z",
			location: "Comedy Club, New York" 

		})
		console.log("event response: ", response1)

		expect(response1.status).toBe(201)
	})
})

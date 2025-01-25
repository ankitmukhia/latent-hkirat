import { describe, expect, it, beforeAll } from 'vitest'
/* import { verifyEventSchema, updateEventSchema } from '@repo/common/types' */
import { randomNumGenerator, payload, payload2 } from './utils/index'
import axios from 'axios' 

const PHONE_NUMBER = "+91894567" + randomNumGenerator(4)

const BASE_URL="http://localhost:3000"

describe("Event endpoints", () => {
	let token: string;
	beforeAll( async () => {
		const createAdminRes = await axios.post(`${BASE_URL}/v1/test/create-admin`, {
			number:  PHONE_NUMBER,
			name: "Hkirat"
		})
		token = createAdminRes.data.token
		expect(createAdminRes.status).toBe(201)
	})
	it("Can create event with with right location", async () => {
		const response1 = await axios.post(`${BASE_URL}/v1/admin/location`, {
			name: "Bangalore",
			description: "IT Hub of country",
			imageUrl: "https://www.gettyimages.in/detail/photo/sunset-at-vidhana-soudha-in-bangalore-karnataka-royalty-free-image/899271434"
		}, {
			headers: {
				Authorization: `Bearer ${token}` 
			}
		})
		console.log("Location created: ", response1.status)

		const response2 = await axios.post(`${BASE_URL}/v1/admin/event`, {
			name: payload.name,
			description: payload.description,
			startTime: payload.startTime,
			locationId: response1.data.id,
			banner: payload.banner,
			seats: payload.seats
		}, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})

		console.log("Location created: ", response2.status)

		expect(response1.status).toBe(201)
		expect(response2.status).toBe(201)
	})

	it("Can't create event with wring location", async () => {
		 await expect(async () => {
			await axios.post(`${BASE_URL}/v1/admin/event`, {
				name: payload.name,
				description: payload.description,
				startTime: payload.startTime,
				locationId: payload.locationId,
				banner: payload.banner,
				seats: payload.seats
			}, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
		}).rejects.toThrowError()
	})
})

import { describe, it, expect, beforeAll } from 'vitest'
import axios from 'axios'
import { payload, randomNumGenerator } from './utils/index'

const BASE_URL="http://localhost:3000"
const PHONE_NUMBER="+91890476" + randomNumGenerator(4)

describe("Seats endpoints", () => {
	let token: string;

	beforeAll( async () => {
		const createAdminRes = await axios.post(`${BASE_URL}/v1/test/create-admin`, {
			number:  PHONE_NUMBER,
			name: "Hkirat"
		})
		token = createAdminRes.data.token
		expect(createAdminRes.status).toBe(201)
	})

	it("Update seats", async () => {
		const response1 = await axios.post(`${BASE_URL}/v1/admin/location`, {
			name: "Seat Delhi",
			description: "Seat Capital of countory",
			imageUrl: "https://www.gettyimages.in/detail/photo/sunset-at-vidhana-soudha-in-bangalore-karnataka-royalty-free-image/899271434"
		}, {
			headers: {
				Authorization: `Bearer ${token}` 
			}
		})

		const response2 = await axios.post(`${BASE_URL}/v1/admin/event`, {
			name: payload.name,
			description: payload.description,
			locationId: response1.data.id,
			banner: payload.banner,
			startTime: payload.startTime,
			seats: payload.seats
						
		}, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})

		const response3 = await axios.put(`${BASE_URL}/v1/admin/event/seats/${response2.data.eventId}`, {
			seats: [{
				name: "Hydrabad",
				description: "Hy",
				price: 300,
				capacity: 2,
			}]	
		}, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})

		expect(response3.status).toBe(200)
	})
})

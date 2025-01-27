import { describe, it, expect, beforeAll } from 'vitest'
import axios from 'axios'
import { payload, randomNumGenerator } from './utils/index'

const BASE_URL="http://localhost:3000"
const PHONE_NUMBER="+91890476" + randomNumGenerator(4)

describe("Seats endpoints", () => {
	let token: string;
	let eventId: string;

	beforeAll( async () => {
		const createAdminRes = await axios.post(`${BASE_URL}/v1/test/create-admin`, {
			number:  PHONE_NUMBER,
			name: "Hkirat"
		})

		token = createAdminRes.data.token

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

		expect(createAdminRes.status).toBe(201)
		eventId = response2.data.eventId
	})

	it("Add seats for event that does exists.", async () => {
		const response3 = await axios.put(`${BASE_URL}/v1/admin/event/seats/${eventId}`, {
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

	it("Get all existing events and specific given event", async () => {
		const response1 = await axios.get(`${BASE_URL}/v1/admin/event`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})

		const response2 = await axios.get(`${BASE_URL}/v1/admin/event/${eventId}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})

		expect(response1.status).toBe(200)
		expect(response1.data.events).not.toBeNull()
		expect(response2.status).toBe(200)
		expect(response2.data.event.id).not.toBeNull()
	})
	it("Can delete seats that does exists.", async () => {
		const response1 = await axios.put(`${BASE_URL}/v1/admin/event/seats/${eventId}`, {
			seats: []
		}, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})

		expect(response1.status).toBe(200)
	})
	it("Update seats that does exists.", async () => {

	})
})

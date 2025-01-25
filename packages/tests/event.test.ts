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
		console.log("token: ", token)
	})

	it("Create event", async () => {
		const response1 = await axios.post(`${BASE_URL}/v1/event`, {
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
		console.log("create event res: ", response1)

		expect(response1.status).toBe(201)
	})
	it.skip("Update event metadata", async () => {
		const response1 = await axios.post(`${BASE_URL}/v1/event`, {
			name: payload2.name,
			description: payload2.description,
			startTime: payload2.startTime,
			location: payload2.location,
			banner: payload2.banner,
			published: payload2.published,
			ended: payload2.ended
		})

		expect(response1.status).toBe(200)
	})
})

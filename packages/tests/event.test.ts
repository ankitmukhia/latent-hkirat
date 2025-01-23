import { describe, expect, it } from 'vitest'
import { verifyEventSchema, updateEventSchema } from '@repo/common/types'
import axios from 'axios' 

const BASE_URL="http://localhost:3000"
const payload = {
	name: "Tech Conference 2025",
	description: "A conference for tech enthusiasts to discuss the latest in technology and innovation.",
	startTime: new Date("2025-03-15T10:00:00Z"),
	locationId: "location_12345",
	banner: "https://example.com/images/tech-conference-banner.jpg",
	seats: [
		{
			name: "Standard",
			description: "Access to all regular sessions and exhibits.",
			price: 100,
			capacity: 200,
		},
		{
			name: "VIP",
			description: "Includes access to VIP lounge, keynote sessions, and exclusive networking opportunities.",
			price: 300,
			capacity: 50,
		},
		{
			name: "Student",
			description: "Discounted pass for students with valid ID. Access to all regular sessions.",
			price: 50,
			capacity: 100,
		}
	]
};

const payload2 = { 
	name: "Gaming Expo 2025",
	description: "An interactive event showcasing the latest in gaming technology, esports, and VR experiences.",
	startTime: "2025-07-20T14:00:00Z",
	location: "gaming_hall_678",
	banner: "https://example.com/images/gaming-expo-banner.jpg",
	published: true,
	ended: false
}

describe("Event endpoints", () => {
	it("Create event", async () => {
		const { data, success } = verifyEventSchema.safeParse({ payload })
		if(!success) {
			return	
		}
		const response1 = await axios.post(`${BASE_URL}/v1/event`, {
			name: data.name,
			description: data.description,
			startTime: data.startTime,
			locationId: data.locationId,
			banner: data.banner,
			seats: data.seats
		})

		expect(response1.status).toBe(201)
	})
	it.skip("Update event metadata", async () => {
		const { data, success } = updateEventSchema.safeParse({ payload2 })
		if(!success) {
			console.log("invalid data types")
			return	
		}
		const response1 = await axios.post(`${BASE_URL}/event`, {
			name: data.name,
			description: data.description,
			startTime: data.startTime,
			location: data.location,
			banner: data.banner,
			published: data.published,
			ended: data.ended
		})

		expect(response1.status).toBe(200)
	})
})

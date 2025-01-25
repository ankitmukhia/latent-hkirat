export function randomNumGenerator(digit: number) {
	let result = '';
	if(digit < 0) {
		result += "Digit should not be less then 0"
		return	result 
	}
	// Math.pow(x, y) = x^y
	const min = Math.pow(10, digit - 1);
	const max = Math.pow(10, digit) - 1;
	
	result += Math.floor(min + Math.random() * (max - min + 1))
	return	result 
}

export const payload = {
	name: "Tech Conference 2025",
	description: "A conference for tech enthusiasts to discuss the latest in technology and innovation.",
	startTime: new Date("2025-03-15T10:00:00Z"),
	locationId: "b866bb56-01ef-45ea-b5ca-90245100ef2b",
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

export const payload2 = { 
	name: "Gaming Expo 2025",
	description: "An interactive event showcasing the latest in gaming technology, esports, and VR experiences.",
	startTime: "2025-07-20T14:00:00Z",
	location: "gaming_hall_678",
	banner: "https://example.com/images/gaming-expo-banner.jpg",
	published: true,
	ended: false
}

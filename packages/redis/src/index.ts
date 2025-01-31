import { createClient, RedisClientType } from 'redis'

export const client: RedisClientType = createClient({
	url: process.env.REDIS_URL
})

export function getRedisKey(key: string): string {
	return `latent:${key}`
}

export function incrCount(key: string) {
	return client.incr(getRedisKey(key))
}

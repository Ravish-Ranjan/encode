import { createClient } from "redis";
import { env } from "./env";

export const redisClient = createClient({
	url: env.redisUrl || "redis://localhost:6379",
});

export const redisEnabled = Boolean(env.redisUrl);

export async function connectRedis() {
	if (!redisEnabled) return;

	if (!redisClient.isOpen) {
		await redisClient.connect();
	}
}

export async function disconnectRedis() {
	if (redisClient.isOpen) {
		await redisClient.quit();
	}
}

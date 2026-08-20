import { createClient } from "redis";
import { env } from "./env";

const redisUrl = env.redisUrl;

export const redisClient = createClient({
	...(redisUrl ? { url: redisUrl } : {}),
	socket: {
		reconnectStrategy: false,
		connectTimeout: 1000,
	},
});

redisClient.on("error", () => {
	// Intentionally silent: Redis is optional for this app.
});

export let redisEnabled = Boolean(redisUrl);

export async function connectRedis() {
	if (!redisEnabled) return false;

	try {
		if (!redisClient.isOpen) {
			await redisClient.connect();
		}
		return true;
	} catch {
		console.log("Redis cache is not available. Continuing without Redis support.");
		redisEnabled = false;
		await redisClient.quit().catch(() => undefined);
		return false;
	}
}

export async function disconnectRedis() {
	if (redisClient.isOpen) {
		await redisClient.quit();
	}
	redisEnabled = false;
}

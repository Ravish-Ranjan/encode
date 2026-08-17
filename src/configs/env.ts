import { config } from "dotenv";

config();

export const env = {
	port: Number(process.env.PORT) || 3000,
	redisUrl: process.env.REDIS_URL,
	nodeEnv: process.env.NODE_ENV || "development",
};

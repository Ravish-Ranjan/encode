import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { config } from "dotenv";
import { createClient } from "redis";
import { rateLimit } from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";

import paramRouter from "./routers/qrParam.router";
import bodyRouter from "./routers/qrBody.router";
import type { Server } from "http";
import path from "path";

config();

const redisClient = createClient({
	url: process.env.REDIS_URL || "redis://localhost:6379",
});
const app = express();

app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST"],
		credentials: true,
	}),
);

app.use(express.json());

morgan.token('clean-url', (req) => {
  const url = req.originalUrl || req.url;
  return url.split('?')[0]; 
});

const devWithoutQuery = ':method :clean-url :status :response-time ms - :res[content-length]';
app.use(morgan(devWithoutQuery));

app.use(
	helmet({
		hidePoweredBy: true,
		noSniff: true,
		xssFilter: true,
		crossOriginResourcePolicy: false,
		contentSecurityPolicy: {
			directives: {
				defaultSrc: ["'self'"],
				scriptSrc: ["'self'", "'unsafe-inline'", "cdn.tailwindcss.com"],
				styleSrc: [
					"'self'",
					"'unsafe-inline'",
					"cdn.tailwindcss.com",
					"fonts.googleapis.com",
				],
				fontSrc: ["'self'", "fonts.gstatic.com"],
				imgSrc: ["'self'", "data:", "https:"],
				connectSrc: ["'self'", "https:"],
			},
		},
	}),
);

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, 
	standardHeaders: true,
	legacyHeaders: false,
	message: {
		msg: "Too many requests from this IP, please try again after 15 minutes."
	},
	store: process.env.REDIS_URL 
		? new RedisStore({
				sendCommand: (...args: string[]) => redisClient.sendCommand(args),
		  })
		: undefined, 
});

app.use(express.static(path.join(__dirname, "../public")));
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use("/api", apiLimiter, paramRouter);
app.use("/api", apiLimiter, bodyRouter);

const port = process.env.PORT || 8001;
let server: Server | undefined;

if (process.env.REDIS_URL) {
	redisClient
		.connect()
		.then(() => {
			console.log("SERVER : Redis connection successfull");
			server = app.listen(port, () => {
				console.log(`SERVER : running on port ${port}`);
			});
		})
		.catch((_error) => {
			console.log("SERVER (ERROR) : error connecting to redis server");
			if (server) server.close();
			process.exit();
		});
} else {
	server = app.listen(port, () => {
		console.log(`SERVER : running on port ${port} without redis cache`);
	});
}

process.on("SIGTERM", () => {
	console.log("SERVER : SIGTERM recieved, closing server");
	if (server) server.close();
});

export { redisClient };

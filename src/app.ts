import express, { type Application } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { rateLimit } from "express-rate-limit";

import qrv1Router from "./routers/qrv1.route";
import qrv2Router from "./routers/qrv2.route";
import path from "path";
import { redisClient, redisEnabled } from "./configs/redis";
import RedisStore from "rate-limit-redis";

function createApiLimiter() {
	return rateLimit({
		windowMs: 15 * 60 * 1000,
		max: 100,
		standardHeaders: true,
		legacyHeaders: false,

		message: {
			msg: "Too many requests from this IP, please try again after 15 minutes.",
		},

		...(redisEnabled
			? {
					store: new RedisStore({
						sendCommand: (...args: string[]) =>
							redisClient.sendCommand(args),
					}),
				}
			: {}),
	});
}

export function createApp(): Application {
	const app: Application = express();

	const apiLimiter = createApiLimiter();

	app.use(
		cors({
			origin: "*",
			methods: ["GET", "POST"],
			credentials: true,
		}),
	);

	app.use(express.static(path.join(__dirname, "../public")));
	app.use(express.json());

	app.use(morgan("dev"));

	app.use(
		helmet({
			hidePoweredBy: true,
			noSniff: true,
			xssFilter: true,
			crossOriginResourcePolicy: false,
			contentSecurityPolicy: {
				directives: {
					defaultSrc: ["'self'"],
					scriptSrc: [
						"'self'",
						"'unsafe-inline'",
						"cdn.tailwindcss.com",
					],
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

	app.get("/", (req, res) => {
		res.sendFile(path.join(__dirname, "../public/index.html"));
	});

	app.use("/api", apiLimiter, qrv1Router);
	app.use("/api/v2", apiLimiter, qrv2Router);

	app.get("/health", (_, res) => {
		return res.status(200).json({ status: "secure and healty" });
	});
	return app;
}

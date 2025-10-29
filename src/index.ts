import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { config } from "dotenv";
import { createClient } from "redis";
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
	})
);
app.use(express.json());
app.use(morgan("dev"));
app.use(
	helmet({
		hidePoweredBy: true,
		noSniff: true,
		xssFilter: true,
		crossOriginResourcePolicy: false,
	})
);

app.use(express.static(path.join(__dirname, "../public")));
app.get("{*splat}", (req, res) => {
	res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use("/api", paramRouter);
app.use("/api", bodyRouter);

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

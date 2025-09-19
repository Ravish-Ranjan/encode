import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { config } from "dotenv";
import paramRouter from "./routers/qrParam.router";
import bodyRouter from "./routers/qrBody.router";

config();

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

app.use("/api", paramRouter);
app.use("/api", bodyRouter);

const port = process.env.PORT || 8001;

const server = app.listen(port, () => {
	console.log(`SERVER : running on port ${port}`);
});

process.on("SIGTERM", () => {
	console.log("SERVER : SIGTERM recieved, closing server");
	server.close();
});

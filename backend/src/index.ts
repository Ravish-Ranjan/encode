import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { config } from "dotenv";

config();

const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.use(helmet({
    hidePoweredBy: true, noSniff: true, xssFilter: true
}))

const port = process.env.PORT || 8001;

const server = app.listen(port, () => {
	console.log(`SERVER : running on port ${port}`);
});

process.on("SIGTERM", () => {
	console.log("SERVER : SIGTERM recieved, closing server");
	server.close();
});
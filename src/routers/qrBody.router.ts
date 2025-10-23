import { Router } from "express";
import { parseBody } from "../middlewares/parse.middleware";
import { createQr } from "../controllers/qrcode.controller";
import { cache } from "../middlewares/cache.middleware";

const router = Router();

if (process.env.REDIS_URL) {
	router.post("/create", parseBody, cache, createQr);
	router.post("/create/:type", parseBody, cache, createQr);
} else {
	router.post("/create", parseBody, createQr);
	router.post("/create/:type", parseBody, createQr);
}

export default router;

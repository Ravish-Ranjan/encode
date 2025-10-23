import { Router } from "express";
import { parseParam } from "../middlewares/parse.middleware";
import { createQr } from "../controllers/qrcode.controller";
import { cache } from "../middlewares/cache.middleware";

const router = Router();

if (process.env.REDIS_URL) {
	router.get("/create", parseParam, cache, createQr);
	router.get("/create/:type", parseParam, cache, createQr);
} else {
	router.get("/create", parseParam, createQr);
	router.get("/create/:type", parseParam, createQr);
}

export default router;

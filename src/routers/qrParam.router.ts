import { Router } from "express";
import { parseParam } from "../middlewares/parse.middleware";
import { createQr } from "../controllers/qrcode.controller";
import { cache } from "../middlewares/cache.middleware";

const router = Router();

router.get("/create", parseParam, cache, createQr);
router.get("/create/:type", parseParam, cache, createQr);

export default router;


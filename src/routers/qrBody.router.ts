import { Router } from "express";
import { parseBody } from "../middlewares/parse.middleware";
import { createQr } from "../controllers/qrcode.controller";
import { cache } from "../middlewares/cache.middleware";

const router = Router();

router.post("/create", parseBody, cache, createQr);
router.post("/create/:type", parseBody, cache, createQr);

export default router;

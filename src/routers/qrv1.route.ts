import { Router } from "express";
import { parseBody, parseParam } from "../middlewares/parse.middleware";
import { renderQr } from "../controllers/qrcode.controller";
import { cache } from "../middlewares/cache.middleware";

const router = Router();

router.post("/create", parseBody, cache, renderQr);
router.get("/create", parseParam, cache, renderQr);
router.post("/create/:type", parseBody, cache, renderQr);
router.get("/create/:type", parseParam, cache, renderQr);

export default router;

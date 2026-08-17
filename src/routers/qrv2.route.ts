import { Router } from "express";
import { parseBody, parseParam } from "../middlewares/parse.middleware";
import { renderQr } from "../controllers/qrcode.controller";
import { cache } from "../middlewares/cache.middleware";

const router = Router();

router.get("/:type", parseParam, cache, renderQr);
router.post("/:type", parseBody, cache, renderQr);

export default router;

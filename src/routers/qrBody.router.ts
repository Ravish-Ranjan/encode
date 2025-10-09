import { Router } from "express";
import { parseBody } from "../middlewares/parse.middleware";
import { createQr } from "../controllers/qrcode.controller";

const router = Router();

router.post("/create", parseBody, createQr);
router.post("/create/:type", parseBody, createQr);

export default router;

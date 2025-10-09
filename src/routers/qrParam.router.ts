import { Router } from "express";
import { parseParam } from "../middlewares/parse.middleware";
import { createQr } from "../controllers/qrcode.controller";

const router = Router();

router.get("/create", parseParam, createQr);
router.get("/create/:type", parseParam, createQr);

export default router;

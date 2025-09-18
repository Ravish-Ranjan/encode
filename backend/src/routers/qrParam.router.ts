import {Router} from "express";
import { parseParam } from "../middlewares/parse.middleware";

const router = Router();

router.get("/create/:type?",parseParam,)

export default router;
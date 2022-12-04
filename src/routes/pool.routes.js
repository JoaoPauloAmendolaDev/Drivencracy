import { Router } from "express";
import { PostPool, GetPool } from "../controllers/enquete.controller.js";
import { PoolValidation } from "../middlewares/enquete.middleware.js";

const router = Router();

router.get("/pool", GetPool);
router.post("/pool", PoolValidation, PostPool);

export default router;

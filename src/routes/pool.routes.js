import { Router } from "express";
import { PostPool, GetPool } from "../controllers/enquete.controller.js";
import {
  PoolRequest,
  PoolRequestOptionList,
  PoolValidation,
} from "../middlewares/enquete.middleware.js";

const router = Router();

router.get("/poll", GetPool);
router.get("/poll/:id/choice", PoolRequestOptionList);
router.get("/poll/:id/result", PoolRequest);
router.post("/poll", PoolValidation, PostPool);

export default router;

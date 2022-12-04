import { Router } from "express";
import opcoesController from "../controllers/opcoes.controller.js";
import confirmVote from "../controllers/votos.controller.js";
import { opcoesMiddleware, PoolVote } from "../middlewares/opcoes.middleware.js";

const router = Router();

router.post("/choice", opcoesMiddleware, opcoesController);
router.post("/choice/:id/vote", PoolVote, confirmVote);

export default router;

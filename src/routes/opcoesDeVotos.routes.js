import { Router } from "express";
import opcoesController from "../controllers/opcoes.controller.js";


const router = Router()

router.post("/choice", opcoesController)

export default router
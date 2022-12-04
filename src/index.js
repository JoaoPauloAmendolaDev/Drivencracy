import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import poolRoutes from "./routes/pool.routes.js";
import opcoesRoutes from "./routes/opcoesDeVotos.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(poolRoutes);
app.use(opcoesRoutes);

const port = process.env.PORT || 4444;
app.listen(port, () => console.log(`server running in port ${port}`));

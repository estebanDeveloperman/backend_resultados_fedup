import express from "express";
import { getEscenarios, createEscenario } from "../controllers/Escenario.js";

const router = express.Router();

router.get("/escenario", getEscenarios);
router.post("/escenario", createEscenario);

export default router;

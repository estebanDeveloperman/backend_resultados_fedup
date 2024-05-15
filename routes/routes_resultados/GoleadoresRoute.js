import express from "express";

import {
  getGoleadoresByPhase,
  createGoleadores,
} from "../../controllers/controllers_resultados/Goleadores.js";

const router = express.Router();

router.get("/goleadores", getGoleadoresByPhase);
router.post("/goleadores", createGoleadores);

export default router;

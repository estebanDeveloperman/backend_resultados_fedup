import express from "express";

import {
  getSancionadoByPhase,
  createSancionados,
  getSancionadosByMatch,
} from "../../controllers/controllers_resultados/Sancionados.js";

const router = express.Router();

router.get("/sancionadosbymatch", getSancionadosByMatch);
router.get("/sancionados", getSancionadoByPhase);
router.post("/sancionados", createSancionados);

export default router;

import express from "express";

import {
  getSancionadoByPhase,
  createSancionados,
  getSancionadosByMatch,
  getSancionadosByPerson,
  limpiarSanciones,
} from "../../controllers/controllers_resultados/Sancionados.js";

const router = express.Router();

router.get("/sancionadosbymatch", getSancionadosByMatch);
router.get("/sancionados", getSancionadoByPhase);
router.get("/sancionadosperson", getSancionadosByPerson);
router.post("/sancionados", createSancionados);

router.post("/limpiarsanciones/:id", limpiarSanciones);

export default router;

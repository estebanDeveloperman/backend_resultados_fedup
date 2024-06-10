import express from "express";
import {
  getPeriodFinalByMatchup,
  createPeriodFinal,
  updatePeriodFinal,
} from "../../controllers/controllers_final/PeriodsFinal.js";

const router = express.Router();

router.get("/periodfinal/:idmatch", getPeriodFinalByMatchup);
router.post("/periodfinal", createPeriodFinal);
router.patch("/periodfinal", updatePeriodFinal);

export default router;

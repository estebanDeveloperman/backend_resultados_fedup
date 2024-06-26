import express from "express";
import {
  createPhase,
  updatePhase,
  getPhaseMerito,
  getPhases,
  getFechas,
  getFlags,
} from "../controllers/Phases.js";

const router = express.Router();

router.get("/phasesinfo", getPhases);
router.get("/phases/merito/:idphase", getPhaseMerito);
router.post("/phases", createPhase);
router.patch("/phases", updatePhase);

router.get("/flagfase", getFlags);

router.get("/fechas", getFechas);

export default router;

import express from "express";
import {
  getPositionByPhase,
  getPositionByPhaseVoleibol,
  createPosition,
  updatePosition,
  updatePositionVoleibol,
} from "../../controllers/controllers_resultados/Positions.js";

const router = express.Router();

router.get("/position/:idphase", getPositionByPhase);
router.get("/positionvoleibol", getPositionByPhaseVoleibol);

router.post("/position", createPosition);

router.patch("/position", updatePosition);
router.patch("/positionvoleibol", updatePositionVoleibol);

export default router;

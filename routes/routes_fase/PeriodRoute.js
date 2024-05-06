import express from "express";
import {
  getPeriodByMatch,
  createPeriod,
  updatePeriod,
} from "../../controllers/controllers_fase/Periods.js";

const router = express.Router();

router.get("/period/:idmatch", getPeriodByMatch);
router.post("/period", createPeriod);
router.patch("/period", updatePeriod);

export default router;

import express from "express";
import {
  getMatchesByPhase,
  createMatches,
  getMatchesByNroDate,
  updateMatch,
  getMatchById,
  updateStatus,
  getMatchesByAPI,
  getMatchesOfFinalsDivision1,
} from "../../controllers/controllers_fase/Match.js";

const router = express.Router();

router.get("/matches/:idphase", getMatchesByPhase);
router.get("/matchesdate", getMatchesByNroDate);
router.get("/match/:id", getMatchById);
router.post("/matches", createMatches);
router.patch("/matches/:id", updateMatch);

router.patch("/matchstatus", updateStatus);

router.get("/matchesapi", getMatchesByAPI);

router.get("/matchesfinal", getMatchesOfFinalsDivision1);

export default router;

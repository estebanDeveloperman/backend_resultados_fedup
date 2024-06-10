import express from "express";
import {
  updateStatusCodigo,
  getMatchupById,
  getMatchupsByPhase,
  getMatchupsByNroDate,
  createMatchup,
  createMatchups,
  updateMatchups,
} from "../../controllers/controllers_final/Matchup.js";

const router = express.Router();

router.patch("/matchup_status", updateStatusCodigo);

router.get("/matchup/:id", getMatchupById);
router.post("/get_matchups", getMatchupsByPhase);
router.post("/matchups_date", getMatchupsByNroDate);

router.post("/create_matchup", createMatchup);
router.post("/create_matchups", createMatchups);

router.patch("/matchup/:id", updateMatchups);

export default router;

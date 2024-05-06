import express from "express";
import {
  getParticipantsByPhase,
  createParticipant,
  updateParticipant,
} from "../../controllers/controllers_fase/Participants.js";

const router = express.Router();

router.get("/participants", getParticipantsByPhase);
router.post("/participants", createParticipant);
router.patch("/participants", updateParticipant);

// router.get("/participants", getParticipantsByChampionshipAndCategoryAndFixture);
// router.get("/participants/institutions", getParticipantsWithInstitution);
export default router;

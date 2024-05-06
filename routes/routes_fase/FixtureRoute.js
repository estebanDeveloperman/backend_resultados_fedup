import express from "express";
import {
  getFixturesByPhase,
  createFixtures,
  // getFixturesFullByPhase,
  updatedFixtureChange,
  updatedFixtureMove,
  updateStatus,
} from "../../controllers/controllers_fase/Fixtures.js";

const router = express.Router();

router.get("/fixtures/:idphase", getFixturesByPhase);
// router.get("/fixturesfull/:idphase", getFixturesFullByPhase);
router.post("/fixtures/:idphase", createFixtures);
router.patch("/fixturechange/:id", updatedFixtureChange);
router.patch("/fixturemove", updatedFixtureMove);

router.patch("/fixturestatus", updateStatus);

export default router;

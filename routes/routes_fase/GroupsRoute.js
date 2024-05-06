import express from "express";
import {
  getGroupsByPhase,
  createGroups,
  updateGroups,
  updateStatus,
  updateGroupById,
} from "../../controllers/controllers_fase/Groups.js";

const router = express.Router();

router.get("/groups/:idphase", getGroupsByPhase);
router.post("/groups", createGroups);
router.patch("/group/:id", updateGroupById);

router.patch("/groups", updateGroups);
router.patch("/groupsstatus", updateStatus);

export default router;

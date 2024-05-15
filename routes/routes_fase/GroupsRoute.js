import express from "express";
import {
  getGroupsByPhase,
  createGroups,
  updateGroups,
  updateStatus,
  updateGroupById,
  getGroupsByAPI,
} from "../../controllers/controllers_fase/Groups.js";

const router = express.Router();

router.get("/groups/:idphase", getGroupsByPhase);
router.post("/groups", createGroups);
router.patch("/group/:id", updateGroupById);

router.patch("/groups", updateGroups);
router.patch("/groupsstatus", updateStatus);

router.get("/groupsapi", getGroupsByAPI);

export default router;

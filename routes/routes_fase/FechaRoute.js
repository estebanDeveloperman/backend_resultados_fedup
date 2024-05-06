import express from "express";
import {
  getFecha,
  createFechas,
  updateStatus,
  updateFechaById,
} from "../../controllers/controllers_fase/Fechas.js";

const router = express.Router();

router.get("/fechas/:idphase", getFecha);
router.post("/fechas", createFechas);
router.patch("/fecha/:id", updateFechaById);

// router.patch("/groups", updateGroups);
router.patch("/fechastatus", updateStatus);

export default router;

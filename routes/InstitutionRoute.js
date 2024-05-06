import express from "express"
import {getInstitutions} from "../controllers/Institutions.js"

const router = express.Router()

router.get("/institutions", getInstitutions)

export default router;
// routes/sequenceRoutes.js

import express from "express";
import {
  createSequence,
  getSequences,
} from "../controllers/sequenceController.js";

const router = express.Router();

router.post("/", createSequence);
router.get("/", getSequences);
router.delete("/:id", deleteSequence);  

export default router;
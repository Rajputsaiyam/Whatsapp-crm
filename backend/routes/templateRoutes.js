// routes/templateRoutes.js

import express from "express";
import {
  createTemplate,
  getTemplates,
  deleteTemplate,
} from "../controllers/templateController.js";

const router = express.Router();

router.post("/", createTemplate);
router.get("/", getTemplates);
router.delete("/:id", deleteTemplate);

export default router;
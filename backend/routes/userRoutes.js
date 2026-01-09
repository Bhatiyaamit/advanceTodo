import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getPreferences,
  updatePreferences,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/preferences")
  .get(protect, getPreferences)
  .put(protect, updatePreferences);

export default router;
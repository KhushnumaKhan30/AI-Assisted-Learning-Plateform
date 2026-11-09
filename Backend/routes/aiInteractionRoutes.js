
import express from "express";
import {
  saveAIInteraction,
  getMyAIInteractions,
} from "../controllers/aiInteractionController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Save a new conversation or append messages to an existing one.
router.post(
  "/save",
  protect,
  authorizeRoles("student"),
  saveAIInteraction
);

// Retrieve the logged-in student's conversations.
router.get(
  "/my-interactions",
  protect,
  authorizeRoles("student"),
  getMyAIInteractions
);

export default router;

import express from "express";
import {
  markContentCompleted,
  getMyProgress,
} from "../controllers/progressController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

// Create a router for student progress endpoints.
const router = express.Router();

// Allow students to mark learning content as completed.
router.post(
  "/complete-content",
  authMiddleware,
  roleMiddleware("student"),
  markContentCompleted
);

// Allow students to view their own learning progress.
router.get(
  "/my-progress",
  authMiddleware,
  roleMiddleware("student"),
  getMyProgress
);

export default router;
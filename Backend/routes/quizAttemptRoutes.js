import express from "express";
import {
  submitQuizAttempt,
} from "../controllers/quizAttemptController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

// Create a router for quiz attempt endpoints.
const router = express.Router();

// Allow authenticated students to submit quizzes.
router.post(
  "/submit",
  authMiddleware,
  roleMiddleware("student"),
  submitQuizAttempt
);

export default router;
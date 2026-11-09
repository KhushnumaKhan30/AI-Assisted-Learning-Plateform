import express from "express";
import {
  createQuiz,
  getQuizzesByTopic,
} from "../controllers/quizController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

// Create a router for quiz-related endpoints.
const router = express.Router();

// Allow teachers and admins to create quizzes.
router.post(
  "/",
  authMiddleware,
  roleMiddleware("teacher", "admin"),
  createQuiz
);

// Allow authenticated users to view quizzes by topic.
router.get(
  "/topic/:topicId",
  authMiddleware,
  getQuizzesByTopic
);

export default router;
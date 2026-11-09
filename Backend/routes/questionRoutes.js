import express from "express";
import {
  createQuestion,
  getQuestionsByQuiz,
} from "../controllers/questionController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

// Create a router for question-related endpoints.
const router = express.Router();

// Allow teachers and admins to add questions.
router.post(
  "/",
  authMiddleware,
  roleMiddleware("teacher", "admin"),
  createQuestion
);

// Allow authenticated users to retrieve quiz questions.
router.get(
  "/quiz/:quizId",
  authMiddleware,
  getQuestionsByQuiz
);

export default router;
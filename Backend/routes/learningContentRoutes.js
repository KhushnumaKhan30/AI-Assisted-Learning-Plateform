import express from "express";
import {
  createLearningContent,
  getLearningContentByTopic,
} from "../controllers/learningContentController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

// Create a router for learning content endpoints.
const router = express.Router();

// Allow teachers and admins to add learning content.
router.post(
  "/",
  authMiddleware,
  roleMiddleware("teacher", "admin"),
  createLearningContent
);

// Allow authenticated users to view content by topic.
router.get(
  "/topic/:topicId",
  authMiddleware,
  getLearningContentByTopic
);

export default router;
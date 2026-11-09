import express from "express";
import {
  createTopic,
  getTopicsBySubject,
} from "../controllers/topicController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

// Create a router for topic-related endpoints.
const router = express.Router();

// Allow teachers and admins to create topics.
router.post("/", authMiddleware, roleMiddleware("teacher", "admin"), createTopic);

// Allow authenticated users to view topics of a subject.
router.get("/subject/:subjectId", authMiddleware, getTopicsBySubject);

export default router;
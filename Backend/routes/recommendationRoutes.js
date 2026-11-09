import express from "express";
import {
  generateRecommendations,
  getMyRecommendations,
} from "../controllers/recommendationController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

// Create a router for recommendation endpoints.
const router = express.Router();

// Allow students to generate personalized recommendations.
router.post(
  "/generate",
  authMiddleware,
  roleMiddleware("student"),
  generateRecommendations
);

// Allow students to view their recommendations.
router.get(
  "/my-recommendations",
  authMiddleware,
  roleMiddleware("student"),
  getMyRecommendations
);

export default router;
import express from "express";
import {
  createSubject,
  getSubjects,
} from "../controllers/subjectController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

// Create a router for subject-related endpoints.
const router = express.Router();

// Allow teachers and admins to create subjects.
router.post("/", authMiddleware, roleMiddleware("teacher", "admin"), createSubject);

// Allow authenticated users to view all subjects.
router.get("/", authMiddleware, getSubjects);

export default router;
import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

// Create a router for authentication endpoints.
const router = express.Router();

// Register a new user.
router.post("/register", registerUser);

// Log in an existing user.
router.post("/login", loginUser);

// Retrieve the profile of the authenticated user.
router.get("/profile", authMiddleware, getProfile);

export default router;
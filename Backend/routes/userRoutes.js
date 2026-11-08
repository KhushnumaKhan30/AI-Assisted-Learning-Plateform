import express from "express";
import {
  registerUser,
  loginUser,
} from "../controllers/userController.js";

// Create a router for authentication endpoints.
const router = express.Router();

// Register a new user.
router.post("/register", registerUser);

// Log in an existing user.
router.post("/login", loginUser);

export default router;
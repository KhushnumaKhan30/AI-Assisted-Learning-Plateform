
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables from the .env file.
dotenv.config();

// Initialize the Express application.
const app = express();

// Allow requests from our React frontend.
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// Parse incoming JSON request bodies.
app.use(express.json());

// Define a basic route to check whether the server is running.
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI-Assisted Learning Platform API is running!",
  });
});

// Set the server port from environment variables or use 5000.
const PORT = process.env.PORT || 5000;

// Start the backend server.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

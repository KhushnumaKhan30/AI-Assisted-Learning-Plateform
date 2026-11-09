
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import topicRoutes from "./routes/topicRoutes.js";
import learningContentRoutes from "./routes/learningContentRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";

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

// Connect authentication endpoints to the Express server.
app.use("/api/auth", userRoutes);

// Connect subject endpoints to the Express server.
app.use("/api/subjects", subjectRoutes);

// Connect topic endpoints to the Express server.
app.use("/api/topics", topicRoutes);

// Connect learning content endpoints to the Express server.
app.use("/api/learning-content", learningContentRoutes);

// Connect quiz endpoints to the Express server.
app.use("/api/quizzes", quizRoutes);

// Connect question endpoints to the Express server.
app.use("/api/questions", questionRoutes);

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
// Connect to MongoDB before starting the server.
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

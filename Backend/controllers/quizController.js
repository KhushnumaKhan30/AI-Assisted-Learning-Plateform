import Quiz from "../models/Quiz.js";
import Topic from "../models/Topic.js";

// Create a new quiz under a topic.
export const createQuiz = async (req, res) => {
  try {
    const {
      title,
      description,
      difficulty,
      duration,
      topicId,
    } = req.body;

    // Check required fields.
    if (!title || !difficulty || !topicId) {
      return res.status(400).json({
        success: false,
        message: "Title, difficulty, and topic ID are required.",
      });
    }

    // Verify that the selected topic exists.
    const topic = await Topic.findById(topicId);

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: "Topic not found.",
      });
    }

    // Create the quiz with the authenticated teacher's ID.
    const quiz = await Quiz.create({
      title,
      description,
      difficulty,
      duration,
      topic: topicId,
      createdBy: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Quiz created successfully.",
      quiz,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all quizzes belonging to a topic.
export const getQuizzesByTopic = async (req, res) => {
  try {
    const { topicId } = req.params;

    // Verify that the selected topic exists.
    const topic = await Topic.findById(topicId);

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: "Topic not found.",
      });
    }

    // Retrieve quizzes for the selected topic.
    const quizzes = await Quiz.find({ topic: topicId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: quizzes.length,
      quizzes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
import Question from "../models/Question.js";
import Quiz from "../models/Quiz.js";

// Create a new question under a quiz.
export const createQuestion = async (req, res) => {
  try {
    const {
      questionText,
      options,
      correctAnswer,
      explanation,
      quizId,
    } = req.body;

    // Check whether all required fields are provided.
    if (
      !questionText ||
      !Array.isArray(options) ||
      options.length < 2 ||
      !correctAnswer ||
      !quizId
    ) {
      return res.status(400).json({
        success: false,
        message: "Valid question text, at least two options, correct answer, and quiz ID are required.",
      });
    }

    // Verify that the selected quiz exists.
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found.",
      });
    }

    // Check whether the correct answer exists in the options.
    if (!options.includes(correctAnswer)) {
      return res.status(400).json({
        success: false,
        message: "Correct answer must match one of the options.",
      });
    }

    // Save the question under the selected quiz.
    const question = await Question.create({
      questionText,
      options,
      correctAnswer,
      explanation,
      quiz: quizId,
    });

    return res.status(201).json({
      success: true,
      message: "Question created successfully.",
      question,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all questions belonging to a quiz.
export const getQuestionsByQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;

    // Verify that the selected quiz exists.
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found.",
      });
    }

    // Retrieve questions without exposing their correct answers.
    const questions = await Question.find({ quiz: quizId })
      .select("-correctAnswer -explanation")
      .sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      count: questions.length,
      questions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
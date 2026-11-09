
import QuizAttempt from "../models/QuizAttempt.js";
import Quiz from "../models/Quiz.js";
import Question from "../models/Question.js";
import Progress from "../models/Progress.js";

// Submit a quiz and calculate the student's score.
export const submitQuizAttempt = async (req, res) => {
  try {
    const { quizId, answers } = req.body;

    // Validate the submitted data.
    if (!quizId || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: "Quiz ID and answers are required.",
      });
    }

    // Verify that the quiz exists.
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found.",
      });
    }

    // Retrieve all questions belonging to the quiz.
    const questions = await Question.find({ quiz: quizId });

    if (questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "This quiz has no questions.",
      });
    }

    // Evaluate each submitted answer.
    const evaluatedAnswers = questions.map((question) => {
      const submittedAnswer = answers.find(
        (answer) => answer.questionId === question._id.toString()
      );

      const selectedAnswer = submittedAnswer?.selectedAnswer || "";

      // Compare the selected answer with the correct answer.
      const isCorrect = selectedAnswer === question.correctAnswer;

      return {
        question: question._id,
        selectedAnswer,
        isCorrect,
      };
    });

    // Calculate the total score.
    const score = evaluatedAnswers.filter(
      (answer) => answer.isCorrect
    ).length;

    // Save the completed quiz attempt.
    const attempt = await QuizAttempt.create({
      student: req.user.id,
      quiz: quizId,
      answers: evaluatedAnswers,
      score,
      totalQuestions: questions.length,
      completedAt: new Date(),
      status: "completed",
    });

    // Find the student's progress record for this quiz's topic.
    const progress = await Progress.findOne({
      student: req.user.id,
      topic: quiz.topic,
    });

    // Update quiz statistics if a progress record exists.
    if (progress) {
      const topicQuizzes = await Quiz.find({
        topic: quiz.topic,
      }).distinct("_id");

      const attempts = await QuizAttempt.find({
        student: req.user.id,
        quiz: { $in: topicQuizzes },
        status: "completed",
      });

      // Calculate the average percentage across all completed attempts.
      const totalPercentage = attempts.reduce(
        (sum, item) =>
          sum + (item.score / item.totalQuestions) * 100,
        0
      );

      progress.quizzesAttempted = attempts.length;
      progress.averageScore = Math.round(
        totalPercentage / attempts.length
      );
      progress.lastAccessedAt = new Date();

      await progress.save();
    }

    // Prepare the result with correct answers and explanations.
    const results = questions.map((question) => {
      const submittedAnswer = evaluatedAnswers.find(
        (answer) =>
          answer.question.toString() === question._id.toString()
      );

      return {
        questionId: question._id,
        questionText: question.questionText,
        selectedAnswer: submittedAnswer.selectedAnswer,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
        isCorrect: submittedAnswer.isCorrect,
      };
    });

    return res.status(201).json({
      success: true,
      message: "Quiz submitted and evaluated successfully.",
      attempt,
      results,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

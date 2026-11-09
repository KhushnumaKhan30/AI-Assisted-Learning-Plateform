import Recommendation from "../models/Recommendation.js";
import Progress from "../models/Progress.js";
import QuizAttempt from "../models/QuizAttempt.js";

// Generate recommendations based on student progress and quiz performance.
export const generateRecommendations = async (req, res) => {
  try {
    // Retrieve the student's progress records.
    const progressRecords = await Progress.find({
      student: req.user.id,
    });

    // Check whether the student has any learning activity.
    if (progressRecords.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Start learning to receive personalized recommendations.",
        count: 0,
        recommendations: [],
      });
    }

    // Remove previous pending recommendations before generating new ones.
    await Recommendation.deleteMany({
      student: req.user.id,
      isCompleted: false,
    });

    const newRecommendations = [];

    // Analyze each topic's progress and quiz performance.
    for (const progress of progressRecords) {
      const attempts = await QuizAttempt.find({
        student: req.user.id,
      }).populate({
        path: "quiz",
        match: { topic: progress.topic },
      });

      // Keep only quiz attempts belonging to the current topic.
      const topicAttempts = attempts.filter((attempt) => attempt.quiz);

      // Calculate the average score for this topic.
      const averageScore =
        topicAttempts.length > 0
          ? topicAttempts.reduce(
              (total, attempt) =>
                total +
                (attempt.totalQuestions > 0
                  ? (attempt.score / attempt.totalQuestions) * 100
                  : 0),
              0
            ) / topicAttempts.length
          : null;

      let recommendationType;
      let reason;

      // Suggest revision when topic completion is below 50%.
      if (progress.completionPercentage < 50) {
        recommendationType = "revise";
        reason = "Complete more learning content to strengthen your understanding.";
      }
      // Suggest practice when quiz performance is below 60%.
      else if (averageScore !== null && averageScore < 60) {
        recommendationType = "practice";
        reason = "Your quiz performance needs improvement. Practice this topic again.";
      }
      // Suggest advanced learning when completion and quiz performance are strong.
      else if (
        progress.completionPercentage >= 80 &&
        averageScore !== null &&
        averageScore >= 80
      ) {
        recommendationType = "advance";
        reason = "You are performing well. Explore more advanced concepts.";
      }
      // Suggest quizzes when learning content is completed but no quiz is attempted.
      else if (
        progress.completionPercentage >= 50 &&
        topicAttempts.length === 0
      ) {
        recommendationType = "practice";
        reason = "Test your understanding by attempting a quiz on this topic.";
      }
      // Suggest continuing the remaining learning content.
      else {
        recommendationType = "learn";
        reason = "Continue learning to improve your topic completion.";
      }

      // Prepare the recommendation for database storage.
      newRecommendations.push({
        student: req.user.id,
        subject: progress.subject,
        topic: progress.topic,
        recommendationType,
        reason,
      });
    }

    // Save all newly generated recommendations.
    const recommendations = await Recommendation.insertMany(
      newRecommendations
    );

    return res.status(201).json({
      success: true,
      message: "Recommendations generated successfully.",
      count: recommendations.length,
      recommendations,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all recommendations belonging to the logged-in student.
export const getMyRecommendations = async (req, res) => {
  try {
    // Retrieve the student's recommendations with subject and topic details.
    const recommendations = await Recommendation.find({
      student: req.user.id,
    })
      .populate("subject", "name")
      .populate("topic", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: recommendations.length,
      recommendations,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
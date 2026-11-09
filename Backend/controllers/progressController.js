import Progress from "../models/Progress.js";
import Topic from "../models/Topic.js";
import LearningContent from "../models/LearningContent.js";

// Mark learning content as completed by a student.
export const markContentCompleted = async (req, res) => {
  try {
    const { topicId, contentId } = req.body;

    // Check whether both IDs are provided.
    if (!topicId || !contentId) {
      return res.status(400).json({
        success: false,
        message: "Topic ID and content ID are required.",
      });
    }

    // Verify that the topic exists.
    const topic = await Topic.findById(topicId);

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: "Topic not found.",
      });
    }

    // Verify that the content belongs to the selected topic.
    const content = await LearningContent.findOne({
      _id: contentId,
      topic: topicId,
    });

    if (!content) {
      return res.status(404).json({
        success: false,
        message: "Learning content not found in this topic.",
      });
    }

    // Find or create the student's progress record for this topic.
    let progress = await Progress.findOne({
      student: req.user.id,
      topic: topicId,
    });

    if (!progress) {
      progress = await Progress.create({
        student: req.user.id,
        subject: topic.subject,
        topic: topicId,
      });
    }

    // Add the content ID only if it is not already completed.
    progress.completedContent.addToSet(contentId);

    // Calculate the content completion percentage.
    const totalContent = await LearningContent.countDocuments({
      topic: topicId,
    });

    progress.completionPercentage =
      totalContent === 0
        ? 0
        : Math.round(
            (progress.completedContent.length / totalContent) * 100
          );

    // Update the student's last learning activity.
    progress.lastAccessedAt = new Date();

    await progress.save();

    return res.status(200).json({
      success: true,
      message: "Learning progress updated successfully.",
      progress,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all progress records of the logged-in student.
export const getMyProgress = async (req, res) => {
  try {
    // Retrieve progress belonging only to the authenticated student.
    const progress = await Progress.find({
      student: req.user.id,
    })
      .populate("subject", "name")
      .populate("topic", "name")
      .populate("completedContent", "title contentType")
      .sort({ lastAccessedAt: -1 });

    return res.status(200).json({
      success: true,
      count: progress.length,
      progress,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
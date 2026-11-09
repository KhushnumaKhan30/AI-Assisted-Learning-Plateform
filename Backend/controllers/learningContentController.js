import LearningContent from "../models/LearningContent.js";
import Topic from "../models/Topic.js";

// Create learning content under a topic.
export const createLearningContent = async (req, res) => {
  try {
    const {
      title,
      description,
      contentType,
      contentUrl,
      textContent,
      topicId,
    } = req.body;

    // Check required fields.
    if (!title || !contentType || !topicId) {
      return res.status(400).json({
        success: false,
        message: "Title, content type, and topic ID are required.",
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

    // Create learning content with the authenticated teacher's ID.
    const content = await LearningContent.create({
      title,
      description,
      contentType,
      contentUrl,
      textContent,
      topic: topicId,
      createdBy: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Learning content created successfully.",
      content,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all learning content belonging to a topic.
export const getLearningContentByTopic = async (req, res) => {
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

    // Retrieve learning content for the selected topic.
    const contents = await LearningContent.find({ topic: topicId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: contents.length,
      contents,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
import Topic from "../models/Topic.js";
import Subject from "../models/Subject.js";

// Create a new topic under a subject.
export const createTopic = async (req, res) => {
  try {
    const { name, description, subjectId } = req.body;

    // Check whether all required fields are provided.
    if (!name || !subjectId) {
      return res.status(400).json({
        success: false,
        message: "Topic name and subject ID are required.",
      });
    }

    // Verify that the selected subject exists.
    const subject = await Subject.findById(subjectId);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found.",
      });
    }

    // Prevent duplicate topic names within the same subject.
    const existingTopic = await Topic.findOne({
      name: name.trim(),
      subject: subjectId,
    });

    if (existingTopic) {
      return res.status(409).json({
        success: false,
        message: "This topic already exists in the subject.",
      });
    }

    // Save the new topic with the authenticated teacher's ID.
    const topic = await Topic.create({
      name: name.trim(),
      description,
      subject: subjectId,
    });

    return res.status(201).json({
      success: true,
      message: "Topic created successfully.",
      topic,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all topics belonging to a selected subject.
export const getTopicsBySubject = async (req, res) => {
  try {
    const { subjectId } = req.params;

    // Verify that the selected subject exists.
    const subject = await Subject.findById(subjectId);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found.",
      });
    }

    // Retrieve topics for the subject.
    const topics = await Topic.find({ subject: subjectId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: topics.length,
      topics,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
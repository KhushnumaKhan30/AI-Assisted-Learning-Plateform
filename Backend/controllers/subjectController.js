import Subject from "../models/Subject.js";

// Create a new subject.
export const createSubject = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Validate the required subject fields.
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Subject name and description are required.",
      });
    }

    // Check whether the subject already exists.
    const existingSubject = await Subject.findOne({
      name: name.trim(),
    });

    if (existingSubject) {
      return res.status(409).json({
        success: false,
        message: "This subject already exists.",
      });
    }

    // Save the subject with the authenticated user's ID.
    const subject = await Subject.create({
      name,
      description,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Subject created successfully.",
      subject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create subject.",
      error: error.message,
    });
  }
};

// Retrieve all subjects.
export const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find()
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: subjects.length,
      subjects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve subjects.",
      error: error.message,
    });
  }
};
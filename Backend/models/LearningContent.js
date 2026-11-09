import mongoose from "mongoose";

// Define the structure of learning materials for each topic.
const learningContentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    contentType: {
      type: String,
      enum: ["article", "video", "pdf", "notes"],
      required: true,
    },
    contentUrl: {
      type: String,
      trim: true,
    },
    textContent: {
      type: String,
    },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create the LearningContent model from the schema.
const LearningContent = mongoose.model("LearningContent", learningContentSchema);

export default LearningContent;
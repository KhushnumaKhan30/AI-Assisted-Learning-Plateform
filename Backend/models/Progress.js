import mongoose from "mongoose";

// Define the structure of a student's learning progress.
const progressSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    completedContent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LearningContent",
      },
    ],
    completionPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    quizzesAttempted: {
      type: Number,
      default: 0,
      min: 0,
    },
    averageScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    lastAccessedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure each student has one progress record per topic.
progressSchema.index(
  { student: 1, topic: 1 },
  { unique: true }
);

// Create the Progress model from the schema.
const Progress = mongoose.model("Progress", progressSchema);

export default Progress;
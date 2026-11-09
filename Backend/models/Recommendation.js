import mongoose from "mongoose";

// Define the structure of personalized learning recommendations.
const recommendationSchema = new mongoose.Schema(
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
    reason: {
      type: String,
      required: true,
      trim: true,
    },
    recommendationType: {
      type: String,
      enum: ["revise", "practice", "advance", "learn"],
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create the Recommendation model from the schema.
const Recommendation = mongoose.model("Recommendation", recommendationSchema);

export default Recommendation;
import mongoose from "mongoose";

// Define the structure of topics belonging to a subject.
const topicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create the Topic model from the schema.
const Topic = mongoose.model("Topic", topicSchema);

export default Topic;
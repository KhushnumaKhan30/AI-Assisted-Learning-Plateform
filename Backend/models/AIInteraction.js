import mongoose from "mongoose";

// Define the structure of student interactions with the AI assistant.
const aiInteractionSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    messages: [
      {
        role: {
          type: String,
          enum: ["user", "assistant"],
          required: true,
        },
        content: {
          type: String,
          required: true,
          trim: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create the AIInteraction model from the schema.
const AIInteraction = mongoose.model("AIInteraction", aiInteractionSchema);

export default AIInteraction;
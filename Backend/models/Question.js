import mongoose from "mongoose";

// Define the structure of questions belonging to a quiz.
const questionSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      required: true,
      trim: true,
    },
    options: {
      type: [String],
      required: true,
      validate: {
        validator: (options) => options.length >= 2,
        message: "A question must have at least two options.",
      },
    },
    correctAnswer: {
      type: String,
      required: true,
      trim: true,
    },
    explanation: {
      type: String,
      trim: true,
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create the Question model from the schema.
const Question = mongoose.model("Question", questionSchema);

export default Question;
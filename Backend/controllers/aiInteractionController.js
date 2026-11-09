
import AIInteraction from "../models/AIInteraction.js";

// Save a new AI conversation or add messages to an existing conversation.
export const saveAIInteraction = async (req, res) => {
  try {
    const { interactionId, messages } = req.body;

    // Validate the incoming messages.
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one message is required.",
      });
    }

    // Allow only valid user and assistant messages.
    const validMessages = messages.every(
      (message) =>
        ["user", "assistant"].includes(message.role) &&
        typeof message.content === "string" &&
        message.content.trim().length > 0
    );

    if (!validMessages) {
      return res.status(400).json({
        success: false,
        message: "Invalid message format.",
      });
    }

    let interaction;

    // Find an existing conversation belonging to this student.
    if (interactionId) {
      interaction = await AIInteraction.findOne({
        _id: interactionId,
        student: req.user.id,
      });

      if (!interaction) {
        return res.status(404).json({
          success: false,
          message: "Conversation not found.",
        });
      }

      interaction.messages.push(...messages);
    } else {
      // Create a new conversation for the logged-in student.
      interaction = await AIInteraction.create({
        student: req.user.id,
        messages,
      });
    }

    await interaction.save();

    return res.status(200).json({
      success: true,
      message: "AI conversation saved successfully.",
      interaction,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Retrieve all AI conversations belonging to the logged-in student.
export const getMyAIInteractions = async (req, res) => {
  try {
    const interactions = await AIInteraction.find({
      student: req.user.id,
    }).sort({ updatedAt: -1 });

    return res.status(200).json({
      success: true,
      count: interactions.length,
      interactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

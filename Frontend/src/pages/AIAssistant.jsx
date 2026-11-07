
import { useState } from "react";
import {
  Bot,
  Send,
  UserRound,
  Sparkles,
  BookOpen,
  Lightbulb,
} from "lucide-react";

import "../styles/AIAssistant.css";

function AIAssistant() {
  const [message, setMessage] = useState("");

  const suggestions = [
    "Explain DBMS normalization with an example.",
    "What is a binary search tree?",
    "Explain process scheduling in OS.",
  ];

  const handleSend = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    // AI response functionality will be added later.
    console.log("Student message:", message);

    setMessage("");
  };

  return (
    <div className="ai-assistant-page">
      <div className="ai-header">
        <div>
          <h1>AI Learning Assistant</h1>
          <p>Your personal study companion. Ask, learn, and improve.</p>
        </div>
        <div className="ai-header-icon">
          <Bot size={28} />
        </div>
      </div>

      <div className="ai-chat-container">
        <div className="ai-welcome">
          <div className="ai-welcome-icon">
            <Sparkles size={28} />
          </div>

          <h2>Hello, Student!</h2>
          <p>
            I'm your AI learning assistant. I can help you understand
            concepts, solve doubts, and prepare for quizzes.
          </p>
        </div>

        <div className="ai-suggestions">
          <h3>
            <Lightbulb size={18} />
            Try asking me
          </h3>

          <div className="suggestion-list">
            {suggestions.map((item, index) => (
              <button
                className="suggestion-button"
                key={index}
                onClick={() => setMessage(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="ai-chat-placeholder">
          <BookOpen size={20} />
          <p>
            Your conversation will appear here. Start by typing a question
            below.
          </p>
        </div>

        <form className="ai-input-area" onSubmit={handleSend}>
          <input
            type="text"
            placeholder="Ask anything about your studies..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button type="submit" disabled={!message.trim()}>
            <Send size={18} />
          </button>
        </form>

        <p className="ai-disclaimer">
          AI-generated answers may contain mistakes. Always verify important
          information.
        </p>
      </div>
    </div>
  );
}

export default AIAssistant;

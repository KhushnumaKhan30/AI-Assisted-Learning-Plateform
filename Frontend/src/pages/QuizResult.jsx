
import { useLocation, useNavigate } from "react-router-dom";
import {
  Trophy,
  Target,
  CheckCircle,
  XCircle,
  RotateCcw,
  ArrowLeft,
} from "lucide-react";

import "../styles/QuizResult.css";

function QuizResult() {
  const navigate = useNavigate();
  const location = useLocation();

  const result = location.state;

  // Handle cases where someone opens the result URL directly.
  if (!result) {
    return (
      <div className="quiz-result-page">
        <h2>No quiz result found.</h2>
        <button onClick={() => navigate("/quiz")}>
          Back to Quizzes
        </button>
      </div>
    );
  }

  const { score, totalQuestions, answers, questions } = result;

  const accuracy = Math.round((score / totalQuestions) * 100);
  const wrongAnswers = totalQuestions - score;

  return (
    <div className="quiz-result-page">
      <div className="result-header">
        <div className="result-trophy">
          <Trophy size={32} />
        </div>

        <h1>Quiz Completed!</h1>
        <p>Great effort! Here is a summary of your performance.</p>
      </div>

      <div className="result-score-card">
        <p>Your Score</p>
        <h2>
          {score} <span>/ {totalQuestions}</span>
        </h2>
        <div className="accuracy-badge">
          <Target size={16} />
          {accuracy}% Accuracy
        </div>
      </div>

      <div className="result-stats">
        <div className="result-stat-card">
          <CheckCircle size={23} />
          <h3>{score}</h3>
          <p>Correct Answers</p>
        </div>

        <div className="result-stat-card">
          <XCircle size={23} />
          <h3>{wrongAnswers}</h3>
          <p>Incorrect Answers</p>
        </div>

        <div className="result-stat-card">
          <Target size={23} />
          <h3>{totalQuestions}</h3>
          <p>Total Questions</p>
        </div>
      </div>

      <section className="answer-review-section">
        <h2>Answer Review</h2>
        <p>Check your answers and learn from your mistakes.</p>

        <div className="answer-review-list">
          {questions.map((question, index) => {
            const selectedAnswer = answers[index];
            const isCorrect =
              selectedAnswer === question.correctAnswer;

            return (
              <div className="answer-review-card" key={index}>
                <div className="review-question-header">
                  <h3>
                    Question {index + 1}: {question.question}
                  </h3>

                  <span className={isCorrect ? "correct-label" : "wrong-label"}>
                    {isCorrect ? "Correct" : "Incorrect"}
                  </span>
                </div>

                <p>
                  Your Answer:{" "}
                  <strong>
                    {selectedAnswer !== undefined
                      ? question.options[selectedAnswer]
                      : "Not answered"}
                  </strong>
                </p>

                <p>
                  Correct Answer:{" "}
                  <strong>
                    {question.options[question.correctAnswer]}
                  </strong>
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <div className="result-actions">
        <button
          className="result-back-button"
          onClick={() => navigate("/quiz")}
        >
          <ArrowLeft size={17} />
          Back to Quizzes
        </button>

        <button
          className="result-retry-button"
          onClick={() => navigate("/quiz/1")}
        >
          <RotateCcw size={17} />
          Retry Quiz
        </button>
      </div>
    </div>
  );
}

export default QuizResult;

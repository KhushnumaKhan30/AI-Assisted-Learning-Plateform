
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Flag,
} from "lucide-react";

import "../styles/QuizAttempt.css";


function QuizAttempt() {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
  if (timeLeft <= 0) return;

  const timer = setInterval(() => {
    setTimeLeft((prevTime) => prevTime - 1);
  }, 1000);

  return () => clearInterval(timer);
}, [timeLeft]);


const minutes = Math.floor(timeLeft / 60);
const seconds = timeLeft % 60;

const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  // Temporary questions. Later, these will come from the database.
  const questions = [
    {
      question: "What does DBMS stand for?",
      options: [
        "Data Backup Management System",
        "Database Management System",
        "Digital Base Management Software",
        "Data Building Management System",
      ],
      correctAnswer: 1,
    },
    {
      question: "Which of the following is a primary key?",
      options: [
        "A key that allows duplicate values",
        "A key that uniquely identifies each record",
        "A key used only for sorting",
        "A key that stores multiple values",
      ],
      correctAnswer: 1,
    },
    {
      question: "Which SQL command is used to retrieve data?",
      options: ["INSERT", "UPDATE", "SELECT", "DELETE"],
      correctAnswer: 2,
    },
    {
      question: "What is normalization in DBMS?",
      options: [
        "Increasing data duplication",
        "Organizing data to reduce redundancy",
        "Deleting all database records",
        "Creating duplicate tables",
      ],
      correctAnswer: 1,
    },
    {
      question: "Which normal form removes partial dependency?",
      options: ["1NF", "2NF", "3NF", "BCNF"],
      correctAnswer: 1,
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const selectedAnswer = answers[currentQuestion];

  const handleAnswer = (optionIndex) => {
    setAnswers({
      ...answers,
      [currentQuestion]: optionIndex,
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    const score = questions.reduce((total, question, index) => {
      return total + (answers[index] === question.correctAnswer ? 1 : 0);
    }, 0);

    navigate(`/quiz-result/${quizId}`, {
      state: {
        score,
        totalQuestions: questions.length,
        answers,
        questions,
      },
    });
  };

  useEffect(() => {
  if (timeLeft === 0) {
    handleSubmit();
  }
}, [timeLeft]);

  const question = questions[currentQuestion];
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="quiz-attempt-page">
      <div className="attempt-header">
        <div>
          <button
            className="back-to-quizzes"
            onClick={() => navigate("/quiz")}
          >
            <ChevronLeft size={18} />
            Back to Quizzes
          </button>

          <h1>DBMS Fundamentals</h1>
          <p>Test your knowledge and track your performance.</p>
        </div>

        <div className="quiz-timer">
          <Clock size={18} />
          <span>{formattedTime}</span>
        </div>
      </div>

      <div className="quiz-attempt-container">
        <div className="question-top">
          <span>
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span>{answeredCount} Answered</span>
        </div>

        <div className="question-progress">
          <div
            className="question-progress-fill"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          ></div>
        </div>

        <div className="question-content">
          <h2>{question.question}</h2>

          <div className="answer-options">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`answer-option ${
                  selectedAnswer === index ? "selected" : ""
                }`}
                onClick={() => handleAnswer(index)}
              >
                <span className="option-letter">
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{option}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="question-navigation">
          <button
            className="previous-question"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            <ChevronLeft size={18} />
            Previous
          </button>

          {currentQuestion === questions.length - 1 ? (
            <button className="submit-quiz" onClick={handleSubmit}>
              <Flag size={17} />
              Submit Quiz
            </button>
          ) : (
            <button className="next-question" onClick={handleNext}>
              Next Question
              <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizAttempt;

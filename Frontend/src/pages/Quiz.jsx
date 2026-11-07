
import {
  ClipboardList,
  Clock,
  BookOpen,
  ArrowRight,
  Brain,
} from "lucide-react";

import "../styles/Quiz.css";

const quizzes = [
  {
    id: 1,
    title: "DBMS Fundamentals",
    subject: "Database Management System",
    description: "Test your knowledge of basic database concepts.",
    questions: 10,
    duration: "15 minutes",
    difficulty: "Easy",
    color: "purple",
  },
  {
    id: 2,
    title: "Normalization and SQL",
    subject: "Database Management System",
    description: "Practice normalization, SQL queries and keys.",
    questions: 15,
    duration: "20 minutes",
    difficulty: "Medium",
    color: "blue",
  },
  {
    id: 3,
    title: "Trees and Graphs",
    subject: "Data Structures",
    description: "Evaluate your understanding of trees and graphs.",
    questions: 10,
    duration: "20 minutes",
    difficulty: "Medium",
    color: "green",
  },
  {
    id: 4,
    title: "Operating System Concepts",
    subject: "Operating Systems",
    description: "Challenge yourself with OS concepts and processes.",
    questions: 20,
    duration: "30 minutes",
    difficulty: "Hard",
    color: "orange",
  },
];

function Quiz() {
  return (
    <div className="quiz-page">
      <div className="quiz-heading">
        <div>
          <h1>Quizzes</h1>
          <p>Test your knowledge and improve your understanding.</p>
        </div>

        <div className="quiz-heading-icon">
          <Brain size={25} />
          Practice & Improve
        </div>
      </div>

      <div className="quiz-summary">
        <div className="quiz-summary-card">
          <ClipboardList size={23} />
          <div>
            <h2>12</h2>
            <p>Available Quizzes</p>
          </div>
        </div>

        <div className="quiz-summary-card">
          <BookOpen size={23} />
          <div>
            <h2>04</h2>
            <p>Subjects Covered</p>
          </div>
        </div>

        <div className="quiz-summary-card">
          <Clock size={23} />
          <div>
            <h2>78%</h2>
            <p>Average Accuracy</p>
          </div>
        </div>
      </div>

      <div className="quiz-section-heading">
        <h2>Available Quizzes</h2>
        <p>Choose a quiz and start practising.</p>
      </div>

      <div className="quiz-grid">
        {quizzes.map((quiz) => (
          <div className="quiz-card" key={quiz.id}>
            <div className="quiz-card-top">
              <div className={`quiz-card-icon ${quiz.color}`}>
                <ClipboardList size={24} />
              </div>

              <span className={`difficulty ${quiz.difficulty.toLowerCase()}`}>
                {quiz.difficulty}
              </span>
            </div>

            <h3>{quiz.title}</h3>
            <p className="quiz-subject">{quiz.subject}</p>
            <p className="quiz-description">{quiz.description}</p>

            <div className="quiz-details">
              <span>
                <BookOpen size={16} />
                {quiz.questions} Questions
              </span>

              <span>
                <Clock size={16} />
                {quiz.duration}
              </span>
            </div>

            <button className="start-quiz-btn">
              Start Quiz
              <ArrowRight size={17} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Quiz;

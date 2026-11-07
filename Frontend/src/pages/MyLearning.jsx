
import { BookOpen, Clock, ArrowRight, CircleCheck } from "lucide-react";
import "../styles/MyLearning.css";

const learningSubjects = [
  {
    id: 1,
    name: "Database Management System",
    shortName: "DBMS",
    description: "Learn SQL, normalization and database design.",
    completed: 6,
    total: 8,
    progress: 75,
    duration: "8 hours spent",
    color: "purple",
  },
  {
    id: 2,
    name: "Data Structures",
    shortName: "DS",
    description: "Explore arrays, linked lists, trees and graphs.",
    completed: 5,
    total: 10,
    progress: 50,
    duration: "6 hours spent",
    color: "blue",
  },
  {
    id: 3,
    name: "Operating Systems",
    shortName: "OS",
    description: "Understand processes and memory management.",
    completed: 3,
    total: 7,
    progress: 43,
    duration: "4 hours spent",
    color: "green",
  },
];

function MyLearning() {
  return (
    <div className="my-learning-page">
      <div className="learning-heading">
        <div>
          <h1>My Learning</h1>
          <p>Track your learning journey and continue where you left off.</p>
        </div>

        <span>{learningSubjects.length} Enrolled Subjects</span>
      </div>

      <div className="learning-summary">
        <div className="summary-card">
          <BookOpen size={22} />
          <div>
            <h2>03</h2>
            <p>Enrolled Subjects</p>
          </div>
        </div>

        <div className="summary-card">
          <CircleCheck size={22} />
          <div>
            <h2>14</h2>
            <p>Topics Completed</p>
          </div>
        </div>

        <div className="summary-card">
          <Clock size={22} />
          <div>
            <h2>18 hrs</h2>
            <p>Learning Time</p>
          </div>
        </div>
      </div>

      <h2 className="learning-section-title">Continue Learning</h2>

      <div className="learning-list">
        {learningSubjects.map((subject) => (
          <div className="learning-card" key={subject.id}>
            <div className={`learning-icon ${subject.color}`}>
              <BookOpen size={25} />
            </div>

            <div className="learning-info">
              <div className="learning-title-row">
                <div>
                  <h3>{subject.name}</h3>
                  <p>{subject.description}</p>
                </div>

                <span className="learning-percentage">
                  {subject.progress}%
                </span>
              </div>

              <div className="learning-progress-track">
                <div
                  className="learning-progress-fill"
                  style={{ width: `${subject.progress}%` }}
                ></div>
              </div>

              <div className="learning-meta">
                <span>
                  {subject.completed} of {subject.total} topics completed
                </span>

                <span>{subject.duration}</span>
              </div>
            </div>

            <button className="continue-learning-btn">
              Continue
              <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyLearning;

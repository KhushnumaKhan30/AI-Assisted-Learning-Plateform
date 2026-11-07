import { BookOpen, Clock, ArrowRight } from "lucide-react";
import "../styles/Subjects.css";

const subjects = [
  {
    id: 1,
    name: "Database Management System",
    shortName: "DBMS",
    description: "Learn database concepts, SQL, normalization and database design.",
    topics: 8,
    duration: "12 hours",
    color: "purple",
  },
  {
    id: 2,
    name: "Data Structures",
    shortName: "DS",
    description: "Understand arrays, linked lists, trees, graphs and algorithms.",
    topics: 10,
    duration: "15 hours",
    color: "blue",
  },
  {
    id: 3,
    name: "Operating Systems",
    shortName: "OS",
    description: "Explore processes, memory management, scheduling and more.",
    topics: 7,
    duration: "10 hours",
    color: "green",
  },
  {
    id: 4,
    name: "Computer Networks",
    shortName: "CN",
    description: "Study network protocols, architecture and communication.",
    topics: 8,
    duration: "11 hours",
    color: "orange",
  },
];

function Subjects() {
  return (
    <div className="subjects-page">
      <div className="subjects-heading">
        <div>
          <h1>Explore Subjects</h1>
          <p>Choose a subject and continue your learning journey.</p>
        </div>

        <span>{subjects.length} Subjects Available</span>
      </div>

      <div className="subjects-grid">
        {subjects.map((subject) => (
          <div className="subject-card" key={subject.id}>
            <div className={`subject-icon ${subject.color}`}>
              <BookOpen size={25} />
            </div>

            <h2>{subject.name}</h2>

            <p>{subject.description}</p>

            <div className="subject-details">
              <span>
                <BookOpen size={16} />
                {subject.topics} Topics
              </span>

              <span>
                <Clock size={16} />
                {subject.duration}
              </span>
            </div>

            <button className="explore-btn">
              Explore Topics
              <ArrowRight size={17} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Subjects;
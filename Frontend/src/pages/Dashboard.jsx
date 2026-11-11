
import {
  BookOpen,
  ClipboardCheck,
  Target,
  Clock,
  ArrowRight,
  PlayCircle,
  Brain
} from "lucide-react";
import { useEffect } from "react";
import api from "../services/api";

import "../styles/Dashboard.css";
import { useAuth } from "../context/AuthContext";

function Dashboard() {

  const { user } = useAuth();


  // Fetch the logged-in student's progress from the backend.
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await api.get("/progress/my-progress");
        console.log("Student Progress:", response.data);
      } catch (error) {
        console.error("Progress Fetch Error:", error);
      }
    };

    fetchProgress();
  }, []);

  const stats = [
    {
      title: "Enrolled Subjects",
      value: "05",
      subtitle: "Subjects you're learning",
      icon: BookOpen,
      color: "purple"
    },
    {
      title: "Quizzes Completed",
      value: "12",
      subtitle: "Keep practicing!",
      icon: ClipboardCheck,
      color: "blue"
    },
    {
      title: "Average Accuracy",
      value: "78%",
      subtitle: "Great progress!",
      icon: Target,
      color: "green"
    },
    {
      title: "Learning Hours",
      value: "24.5",
      subtitle: "Total study time",
      icon: Clock,
      color: "orange"
    }
  ];

  const subjects = [
    {
      name: "Database Management System",
      topic: "Normalization",
      progress: 75,
      color: "purple"
    },
    {
      name: "Data Structures",
      topic: "Trees and Graphs",
      progress: 55,
      color: "blue"
    },
    {
      name: "Operating Systems",
      topic: "Process Management",
      progress: 40,
      color: "green"
    }
  ];

  return (
    <div className="dashboard">

      {/* Welcome Section */}
      <section className="welcome-section">
        <div>
          <h1>Welcome back, {user?.name || "Student"}! 👋</h1>
          <p>
            Continue your learning journey and achieve your goals.
          </p>
        </div>

        <div className="welcome-icon">
          <Brain size={35} />
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="stat-card" key={stat.title}>
              <div className={`stat-icon ${stat.color}`}>
                <Icon size={23} />
              </div>

              <p>{stat.title}</p>
              <h2>{stat.value}</h2>
              <span>{stat.subtitle}</span>
            </div>
          );
        })}
      </section>

      {/* Continue Learning Section */}
      <section className="learning-section">

        <div className="section-heading">
          <div>
            <h2>Continue Learning</h2>
            <p>Pick up where you left off.</p>
          </div>

          <button className="view-all-button">
            View All <ArrowRight size={16} />
          </button>
        </div>

        <div className="subject-grid">
          {subjects.map((subject) => (
            <div className="subject-card" key={subject.name}>

              <div className="subject-top">
                <div className={`subject-icon ${subject.color}`}>
                  <BookOpen size={22} />
                </div>

                <span className="learning-label">
                  In Progress
                </span>
              </div>

              <h3>{subject.name}</h3>
              <p>Current Topic: {subject.topic}</p>

              <div className="progress-info">
                <span>Progress</span>
                <strong>{subject.progress}%</strong>
              </div>

              <div className="progress-bar">
                <div
                  className={`progress-fill ${subject.color}`}
                  style={{ width: `${subject.progress}%` }}
                ></div>
              </div>

              <button className="continue-button">
                Continue Learning
                <PlayCircle size={17} />
              </button>

            </div>
          ))}
        </div>
      </section>

      {/* Weekly Activity */}
      <section className="activity-section">
        <div className="section-heading">
          <div>
            <h2>Learning Activity</h2>
            <p>Your weekly learning overview.</p>
          </div>
        </div>

        <div className="activity-card">
          <div className="activity-message">
            <div className="activity-icon">
              <Target size={23} />
            </div>

            <div>
              <h3>Keep up the good work!</h3>
              <p>
                Regular practice helps you understand concepts better.
              </p>
            </div>
          </div>

          <div className="activity-summary">
            <div>
              <h2>5 Days</h2>
              <span>Active this week</span>
            </div>

            <div>
              <h2>8.5 hrs</h2>
              <span>Study time this week</span>
            </div>

            <div>
              <h2>4</h2>
              <span>Quizzes this week</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Dashboard;

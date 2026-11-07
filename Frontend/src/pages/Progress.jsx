
import {
  TrendingUp,
  Target,
  BookOpen,
  ClipboardCheck,
  Clock,
  CircleCheck,
} from "lucide-react";

import "../styles/Progress.css";

function Progress() {
  const stats = [
    {
      title: "Topics Completed",
      value: "18",
      subtitle: "Out of 33 topics",
      icon: <BookOpen />,
    },
    {
      title: "Quizzes Attempted",
      value: "12",
      subtitle: "Across 4 subjects",
      icon: <ClipboardCheck />,
    },
    {
      title: "Average Accuracy",
      value: "78%",
      subtitle: "Keep improving!",
      icon: <Target />,
    },
    {
      title: "Learning Hours",
      value: "24.5",
      subtitle: "Total study time",
      icon: <Clock />,
    },
  ];

  const subjectProgress = [
    { name: "Database Management System", progress: 80 },
    { name: "Data Structures", progress: 65 },
    { name: "Operating Systems", progress: 45 },
    { name: "Computer Networks", progress: 35 },
  ];

  const topicPerformance = [
    { name: "DBMS - Normalization", status: "Strong", accuracy: "90%" },
    { name: "Data Structures - Trees", status: "Strong", accuracy: "85%" },
    { name: "Operating Systems - Processes", status: "Needs Practice", accuracy: "45%" },
    { name: "Computer Networks - Routing", status: "Needs Practice", accuracy: "40%" },
  ];

  return (
    <div className="progress-page">
      <div className="progress-header">
        <div>
          <h1>My Progress</h1>
          <p>Track your learning performance and improvement.</p>
        </div>
      </div>

      <div className="progress-stats">
        {stats.map((stat, index) => (
          <div className="progress-stat-card" key={index}>
            <div className="progress-stat-icon">{stat.icon}</div>
            <div>
              <p>{stat.title}</p>
              <h2>{stat.value}</h2>
              <span>{stat.subtitle}</span>
            </div>
          </div>
        ))}
      </div>

      <section className="subject-progress-section">
        <h2>Subject-wise Progress</h2>
        <p className="section-description">
          See how much you have completed in each subject.
        </p>

        <div className="subject-progress-list">
          {subjectProgress.map((subject, index) => (
            <div className="subject-progress-item" key={index}>
              <div className="subject-progress-info">
                <h3>{subject.name}</h3>
                <span>{subject.progress}%</span>
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${subject.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="topic-performance-section">
        <h2>Topic Performance</h2>
        <p className="section-description">
          Identify your strong topics and topics that need more practice.
        </p>

        <div className="performance-list">
          {topicPerformance.map((topic, index) => (
            <div className="performance-item" key={index}>
              <div className="performance-topic">
                <h3>{topic.name}</h3>
                <span>{topic.accuracy} accuracy</span>
              </div>

              <span
                className={`performance-status ${
                  topic.status === "Strong" ? "strong" : "needs-practice"
                }`}
              >
                {topic.status === "Strong" ? (
                  <CircleCheck size={15} />
                ) : (
                  <TrendingUp size={15} />
                )}
                {topic.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Progress;

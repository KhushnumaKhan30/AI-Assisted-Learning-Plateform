import { Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import MyLearning from "./pages/MyLearning";
import Quiz from "./pages/Quiz";
import Progress from "./pages/Progress";
import AIAssistant from "./pages/AIAssistant";
import QuizAttempt from "./pages/QuizAttempt";
import QuizResult from "./pages/QuizResult";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route
        path="/dashboard"
        element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        }
      />

      <Route
        path="/subjects"
        element={
          <DashboardLayout>
            <Subjects />
          </DashboardLayout>
        }
      />

      <Route
        path="/learning"
        element={
          <DashboardLayout>
            <MyLearning />
          </DashboardLayout>
        }
      />

      <Route
        path="/quiz"
        element={
          <DashboardLayout>
            <Quiz />
          </DashboardLayout>
        }
      />

      <Route
        path="/progress"
        element={
          <DashboardLayout>
            <Progress />
          </DashboardLayout>
        }
      />

      <Route
        path="/ai-assistant"
        element={
          <DashboardLayout>
            <AIAssistant />
          </DashboardLayout>
        }
      />

      <Route
        path="/quiz/:quizId"
        element={
          <DashboardLayout>
            <QuizAttempt />
          </DashboardLayout>
        }
      />

      <Route
        path="/quiz-result/:quizId"
        element={
          <DashboardLayout>
            <QuizResult />
          </DashboardLayout>
        }
      />
    </Routes>
  );
}

export default App;

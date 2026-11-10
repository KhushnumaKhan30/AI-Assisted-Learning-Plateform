
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
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";

// Wrap dashboard pages so only authenticated users can access them.
function ProtectedLayout({ children }) {
  return (
    <ProtectedRoute>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Public authentication routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected dashboard routes */}
      <Route
        path="/dashboard"
        element={<ProtectedLayout><Dashboard /></ProtectedLayout>}
      />

      <Route
        path="/subjects"
        element={<ProtectedLayout><Subjects /></ProtectedLayout>}
      />

      <Route
        path="/learning"
        element={<ProtectedLayout><MyLearning /></ProtectedLayout>}
      />

      <Route
        path="/quiz"
        element={<ProtectedLayout><Quiz /></ProtectedLayout>}
      />

      <Route
        path="/progress"
        element={<ProtectedLayout><Progress /></ProtectedLayout>}
      />

      <Route
        path="/ai-assistant"
        element={<ProtectedLayout><AIAssistant /></ProtectedLayout>}
      />

      <Route
        path="/quiz/:quizId"
        element={<ProtectedLayout><QuizAttempt /></ProtectedLayout>}
      />

      <Route
        path="/quiz-result/:quizId"
        element={<ProtectedLayout><QuizResult /></ProtectedLayout>}
      />

      {/* Redirect unknown routes to the dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;

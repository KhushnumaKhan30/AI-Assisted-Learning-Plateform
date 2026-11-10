
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Allow access only to authenticated users.
function ProtectedRoute({ children }) {
  const { user } = useAuth();

  // Redirect users without an authenticated session to login.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;

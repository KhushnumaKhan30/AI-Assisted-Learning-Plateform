
import { createContext, useContext, useState } from "react";
import api from "../services/api";

// Create a context to share authentication data across the application.
const AuthContext = createContext();

// Provide authentication information to all child components.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Log in a student and save the authentication details.
  const login = async (email, password) => {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setUser(user);

    return user;
  };

  // Log out the student and clear saved authentication details.
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Provide a simple hook for accessing authentication data.
export const useAuth = () => useContext(AuthContext);

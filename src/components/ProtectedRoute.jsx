// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { getToken } from "../services/authServices";

export default function ProtectedRoute({ children }) {
  const token = getToken();
  return token ? children : <Navigate to="/sign-in" replace />;
}

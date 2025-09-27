import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode; // <-- use ReactNode instead of JSX.Element
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    // Redirect to login if no token
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>; // Render children
};

export default ProtectedRoute;

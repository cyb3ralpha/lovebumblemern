import React from "react";
import { Navigate, useLocation } from "react-router-dom";

/**
 * ProtectedRoute Component
 *
 * Props:
 * - children → component to render if authenticated
 * - isAuthenticated → boolean (from AuthContext)
 * - user → current user object
 * - requiredRole → optional role restriction (e.g., "admin")
 */

const ProtectedRoute = ({
  children,
  isAuthenticated,
  user,
  requiredRole = null,
}) => {
  const location = useLocation();

  // If not logged in → redirect to login
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // Optional Role-Based Protection
  if (requiredRole && user?.role !== requiredRole) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;

import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, adminOnly }) {
  const { token, user } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/" />;
  }

  if (adminOnly && user?.role !== "admin") {
    return <Navigate to="/home" />;
  }

  return children;
}

export default ProtectedRoute;
import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContenxt";

function ProtectedRoute({ children }) {
  const { user } = UserAuth();
  if (!user) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}

export default ProtectedRoute;

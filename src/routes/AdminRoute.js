import React from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

const AdminRoute = ({ children }) => {
  const user = getCurrentUser();

  if (!user) return <Navigate to="/login" />;
  if (!user.is_admin) return <Navigate to="/" />; // or /home

  return children;
};

export default AdminRoute;

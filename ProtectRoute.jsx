// src/pages/ProtectRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/loginoptions" replace />;
  return children;
};

export default ProtectRoute;

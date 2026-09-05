import React from "react";
import { Navigate } from "react-router-dom";
import { useDriverAuth } from "./DriverAuthContext";

export default function DriverProtectRoute({ children }) {
  const { driver } = useDriverAuth();

  if (!driver) {
    return <Navigate to="/driver/login" replace />;
  }

  return children;
}

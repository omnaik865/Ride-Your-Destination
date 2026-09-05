// src/Driver/DriverLogout.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../pages/AuthContext";

export default function DriverLogout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    logout();          // clear driver session
    navigate("/driver/login");  // redirect to login page
  }, []);

  return null;
}

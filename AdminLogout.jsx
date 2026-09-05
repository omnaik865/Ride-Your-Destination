// src/Admin/AdminLogout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../pages/AuthContext";

export default function AdminLogout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    logout(); // Clear auth
    navigate("/admin/login"); // Redirect to admin login
  }, []);

  return null;
}

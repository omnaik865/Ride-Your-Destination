// ./Admin/AdminProtectRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "./AdminAuthcontext";

const AdminProtectRoute = ({ children }) => {
  const { adminAuth } = useAdminAuth();

  if (!adminAuth) return <Navigate to="/login/admin" />;
  return children;
};

export default AdminProtectRoute;

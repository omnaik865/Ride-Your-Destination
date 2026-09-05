// ./Admin/AdminAuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [adminAuth, setAdminAuth] = useState(false);

  // Load auth state from localStorage on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem("adminAuth");
    if (storedAuth === "true") setAdminAuth(true);
  }, []);

  const loginAdmin = () => {
    localStorage.setItem("adminAuth", "true");
    setAdminAuth(true);
  };

  const logoutAdmin = () => {
    localStorage.removeItem("adminAuth");
    setAdminAuth(false);
  };

  return (
    <AdminAuthContext.Provider value={{ adminAuth, loginAdmin, logoutAdmin }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

// Custom hook
export const useAdminAuth = () => useContext(AdminAuthContext);

// src/pages/Logout.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // ✅ import hook

const Logout = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  }, [navigate, setUser]);

  return (
    <div className="logout-page">
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;

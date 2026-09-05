import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaCar, FaUserShield } from "react-icons/fa";
import "./LoginOptions.css";

export default function LoginOptions() {
  const navigate = useNavigate();

  const loginOptions = [
    { label: "User Login", path: "/login/user", icon: <FaUser /> },
    { label: "Driver Login", path: "/login/driver", icon: <FaCar /> },
    { label: "Admin Login", path: "/login/admin", icon: <FaUserShield /> },
  ];

  return (
    <div className="login-options-container">
      <h2>Select Login Type</h2>
      <div className="login-buttons">
        {loginOptions.map((option) => (
          <button
            key={option.path}
            onClick={() => navigate(option.path)}
            className="login-button"
            aria-label={option.label}
          >
            <span className="icon">{option.icon}</span>
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

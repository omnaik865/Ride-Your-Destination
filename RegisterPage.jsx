import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // ✅ use the hook
import { motion } from "framer-motion";
import "./RegisterPage.css";

const RegisterPage = () => {
  const { login } = useAuth(); // ✅ get login function from hook
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getStrength = () => {
    if (password.length > 10) return "strong";
    if (password.length >= 6) return "medium";
    return "weak";
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password || !confirmPassword) {
      setError("⚠️ All fields are required.");
      return;
    }

    if (password.length < 6) {
      setError("🔒 Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("❌ Passwords do not match.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find((u) => u.email === email)) {
      setError("❗ Email already exists. Please login.");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: email.split("@")[0],
      email,
      password,
      profilePic: "",
      phone: "",
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setSuccess("🎉 Registration successful! Redirecting...");
    login(newUser);

    setTimeout(() => {
      navigate("/login");
    }, 1200);
  };

  return (
    <div className="register-container">
      <motion.div
        className="register-card"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="register-title">Create Account</h2>

        {error && <p className="error-box">{error}</p>}
        {success && <p className="success-box">{success}</p>}

        <form onSubmit={handleRegister} className="register-form">
          <motion.input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          />

          <motion.input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          />

          {password && (
            <div className={`strength-meter ${getStrength()}`}>
              {getStrength() === "strong"
                ? "🟢 Strong"
                : getStrength() === "medium"
                ? "🟡 Medium"
                : "🔴 Weak"}
            </div>
          )}

          <motion.input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          />

          <motion.button
            className="register-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register
          </motion.button>
        </form>

        <p className="register-footer">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login here</span>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;

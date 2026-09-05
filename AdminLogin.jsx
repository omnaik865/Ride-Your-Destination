import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "./AdminAuthcontext";
import "./AdminLogin.css";

const API = "http://localhost:5000";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { loginAdmin } = useAdminAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("❌ Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      // ❌ Backend error handling
      if (!res.ok) {
        setError(data.message || "Login failed ❌");
        return;
      }

      // ✅ Save admin
      loginAdmin(data.admin);
      localStorage.setItem("admin", JSON.stringify(data.admin));

      setEmail("");
      setPassword("");

      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Login Error:", err);
      setError("❌ Server not running or backend crashed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>🔐 Admin Login</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
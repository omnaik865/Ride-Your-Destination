import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDriverAuth } from "./DriverAuthContext";
import "./DriverLogin.css";

const API = "http://localhost:5000";

export default function DriverLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { loginDriver } = useDriverAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API}/api/driver/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // ❗ CHECK SERVER CONNECTION
      if (!res) {
        throw new Error("Server not responding");
      }

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      loginDriver(data.driver);
      localStorage.setItem("loggedDriver", JSON.stringify(data.driver));

      navigate("/driver/dashboard");

    } catch (err) {
      console.log("Login Error:", err);
      setError("Server not reachable. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="driver-login-page">
      <div className="login-container">
        <h2>🚗 Driver Login</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p>
          Don't have an account?{" "}
          <span onClick={() => navigate("/driver/register")}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
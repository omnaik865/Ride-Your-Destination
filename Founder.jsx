// src/pages/Founder.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Founder.css";

export default function Founder() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1>Ride Your Destination</h1>
      <p>Select your portal</p>

      <div className="options-box">
        {/* User Portal */}
        <div className="option-card" onClick={() => navigate("/login/user")}>
          <img src="/images/user.png" alt="User" />
          <h3>User</h3>
          <p>Book a ride, track trips, and manage profile</p>
        </div>

        {/* Driver Portal */}
        <div className="option-card" onClick={() => navigate("/driver/login")}>
          <img src="/images/driver.png" alt="Driver" />
          <h3>Driver</h3>
          <p>Accept rides & manage earnings</p>
        </div>

        {/* Admin Portal */}
        <div className="option-card" onClick={() => navigate("/admin/login")}>
          <img src="/images/admin.png" alt="Admin" />
          <h3>Admin</h3>
          <p>Manage users, drivers, and rides</p>
        </div>
      </div>
    </div>
  );
}

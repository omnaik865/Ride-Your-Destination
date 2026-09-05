import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  const navButtons = [
    { label: "🏠 Home", path: "/", class: "home" },
    { label: "📦 Courier", path: "/courier", class: "courier" }
  ];

  const vehicles = [
    { icon: "🚖", label: "Cab", path: "/cab", class: "cab" },
    { icon: "🏍️", label: "Bike", path: "/bike", class: "bike" },
    { icon: "🚕", label: "Auto", path: "/auto", class: "auto" },
    { icon: "🚌", label: "Bus", path: "/bus", class: "bus" }
  ];

  return (
    <div className="home-page">
      
      {/* Main Title */}
      <h1 className="home-title">Ride Your Destination 🚖</h1>
      <hr className="divider" />

      {/* Navigation Buttons */}
      <div className="horizontal-curve">
        {navButtons.map(btn => (
          <button
            key={btn.path}
            className={`horizontal-curve-btn ${btn.class}`}
            onClick={() => navigate(btn.path)}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Vehicle Selection */}
      <div className="vehicle-section">
        {vehicles.map(v => (
          <button
            key={v.path}
            className={`vehicle-btn ${v.class}`}
            onClick={() => navigate(v.path)}
            aria-label={`Select ${v.label}`}
          >
            {v.icon} {v.label}
          </button>
        ))}
      </div>

      {/* Discount Banner */}
      <div className="discount-banner">
        <p>
          🎉 <strong>Get 20% OFF</strong> on your first ride! Use code{" "}
          <span className="discount-code">RIDE20</span> at checkout. 🚖💨
        </p>
      </div>
    </div>
  );
}

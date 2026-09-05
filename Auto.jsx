import React from "react";
import { useNavigate } from "react-router-dom";
import "./Auto.css";

const Auto = () => {
  const navigate = useNavigate();

  return (
    <div className="auto-page">
      <h1 className="auto-title">🚖 Auto Services</h1>
      <p className="auto-subtitle">
        Choose your preferred option below to continue your ride.
      </p>

      <div className="auto-options">
        <button className="auto-btn book" onClick={() => navigate("/auto/book")}>
          🏷️ Book Auto
        </button>

        <button className="auto-btn rental" onClick={() => navigate("/auto/rental")}>
          🕒 Rental Auto
        </button>
      </div>
    </div>
  );
};

export default Auto;

import React from "react";
import { useNavigate } from "react-router-dom";
import "./Bus.css";

const Bus = () => {
  const navigate = useNavigate();

  return (
    <div className="bus-page">
      <h1 className="bus-title">🚌 Bus Services</h1>
      <p className="bus-subtitle">
        Choose your preferred option below to continue your journey.
      </p>

      <div className="bus-options">
        <button
          className="bus-btn book"
          onClick={() => navigate("/bus/book")}
        >
          🏷️ Book Bus
        </button>

        <button
          className="bus-btn rental"
          onClick={() => navigate("/bus/rental")}
        >
          🕒 Rental Bus
        </button>
      </div>
    </div>
  );
};

export default Bus;

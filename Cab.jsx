import React from "react";
import { useNavigate } from "react-router-dom";
import "./Cab.css";

const Cab = () => {
  const navigate = useNavigate();

  return (
    <div className="cab-page">
      <h1 className="cab-title">🚕 Cab Services</h1>
      <p className="cab-subtitle">
        Choose your preferred option below to continue your ride.
      </p>

      <div className="cab-options">
        <button className="cab-btn book" onClick={() => navigate("/cab/book")}>
          🏷️ Book Cab
        </button>

        <button className="cab-btn rental" onClick={() => navigate("/cab/rental")}>
          🕒 Rental Cab
        </button>
      </div>
    </div>
  );
};

export default Cab;

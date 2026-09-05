import React from "react";
import { useNavigate } from "react-router-dom";
import "./Bike.css";

const Bike = () => {
  const navigate = useNavigate();

  return (
    <div className="bike-page">
      <h1 className="bike-title">🏍️ Bike Services</h1>
      <p className="bike-subtitle">
        Choose your preferred option below to continue your ride.
      </p>

      <div className="bike-options">
        <button className="bike-btn book" onClick={() => navigate("/bike/book")}>
          🏷️ Book Bike
        </button>

        <button className="bike-btn rental" onClick={() => navigate("/bike/rental")}>
          🕒 Rental Bike
        </button>
      </div>
    </div>
  );
};

export default Bike;

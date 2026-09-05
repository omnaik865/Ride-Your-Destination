import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Book.css";

const History = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const history = location.state?.history || [];

  return (
    <div className="history-page">
      <h2>Booking History</h2>
      {history.length === 0 ? (
        <p>No rides booked yet.</p>
      ) : (
        <ul className="history-list">
          {history.map((ride) => (
            <li key={ride.id}>
              <strong>{ride.vehicle}</strong>: {ride.pickup} → {ride.dropoff} | ₹{ride.fare} | {ride.duration.hours}h {ride.duration.minutes}m
            </li>
        ))}
        </ul>
      )}
    <button className="back-btn" onClick={() => navigate("/book")}>Back to Booking</button>
    </div>
    
  );
};
<div>
  
      <button className="back-btn" onClick={() => window.history.back()}>
        ⬅️ Back
      </button>
</div>


export default History;

      
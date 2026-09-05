import React, { useState } from "react";

const RideHistory = () => {
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem("rideHistory")) || []);

  const deleteRide = (index) => {
    const updated = history.filter((_, i) => i !== index);
    setHistory(updated);
    localStorage.setItem("rideHistory", JSON.stringify(updated));
  };

  return (
    <div>
      <h2>Ride History</h2>
      {history.length === 0 ? (
        <p>No rides yet</p>
      ) : (
        <ul>
          {history.map((ride, i) => (
            <li key={i}>
              {ride.type} - ₹{ride.price} - {ride.time}
              <button onClick={() => deleteRide(i)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RideHistory;

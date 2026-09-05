import React, { useEffect, useState } from "react";
import "./BookingHistory.css";
import { useNavigate } from "react-router-dom";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("cabBookings")) || [];
    setBookings(data);
  }, []);

  // ❌ CANCEL BOOKING
  const handleCancel = (index) => {
    const updated = bookings.filter((_, i) => i !== index);
    setBookings(updated);
    localStorage.setItem("cabBookings", JSON.stringify(updated));
  };

  return (
    <div className="history-page">
      <h1>📄 Booking History</h1>

      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        <div className="history-list">
          {bookings.map((b, index) => (
            <div className="history-card" key={index}>
              <h3>{b.cab}</h3>
              <p>💰 {b.price}</p>
              <p>📅 {b.date}</p>
              <p>💳 {b.upi}</p>

              <button
                className="cancel-btn"
                onClick={() => handleCancel(index)}
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}

      <button onClick={() => navigate(-1)}>
        ⬅ Back
      </button>
    </div>
  );
};

export default BookingHistory;
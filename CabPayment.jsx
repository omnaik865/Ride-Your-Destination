import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CabPayment.css";

const CabPayment = () => {
  const { state: booking } = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // ❌ If no booking data
  if (!booking) {
    return (
      <div className="payment-container">
        <h2>No Booking Found 😢</h2>
        <button onClick={() => navigate("/cab/rental")}>
          Go Back
        </button>
      </div>
    );
  }

  // 🧠 Generate booking ID
  const generateBookingId = () =>
    "CAB" + Math.floor(100000 + Math.random() * 900000);

  // 💳 Handle Payment
  const handlePayment = () => {
    setLoading(true);

    setTimeout(() => {
      const newBooking = {
        ...booking,
        id: generateBookingId(),
        date: new Date().toLocaleString(),
        status: "Confirmed",
      };

      const history = JSON.parse(
        localStorage.getItem("cabBookings") || "[]"
      );

      localStorage.setItem(
        "cabBookings",
        JSON.stringify([...history, newBooking])
      );

      setLoading(false);

      alert("✅ Payment Successful & Booking Confirmed!");

      navigate("/history");
    }, 1500); // simulate payment delay
  };

  return (
    <div className="payment-container">
      <h1>💳 UPI Payment</h1>

      <div className="payment-card">
        <img src={booking.cabImage} alt="cab" />

        <h2>{booking.cabName}</h2>

        <p><strong>Pickup:</strong> {booking.pickup}</p>
        <p><strong>Drop:</strong> {booking.drop}</p>
        <p><strong>Date:</strong> {booking.date}</p>

        <h3>{booking.price}</h3>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="pay-btn"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>

      <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>
    </div>
  );
};

export default CabPayment;
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BusConfirm.css";

const BusConfirm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  if (!data) {
    return <h2 style={{textAlign:"center"}}>No Booking Found</h2>;
  }

  const { bus, seats, totalPrice } = data;

  return (
    <div className="confirm-page">

      <h1>🚌 Booking Confirmation</h1>

      <div className="confirm-card">

        <img src={bus.image} alt={bus.name} />

        <div className="confirm-info">
          <h2>{bus.name}</h2>
          <p>Type: {bus.type}</p>
          <p>Driver: {bus.driver.name}</p>
          <p>Phone: {bus.driver.phone}</p>

          <p>
            Seats: <b>{seats.join(", ")}</b>
          </p>

          <h3>Total Price: ₹{totalPrice}</h3>

          <button
            className="pay-btn"
            onClick={() => navigate("/upipaymentpage")}
          >
            Pay Now
          </button>

        </div>

      </div>

      <button className="back-btn" onClick={() => navigate("/")}>
        Go Home
      </button>

    </div>
  );
};

export default BusConfirm;
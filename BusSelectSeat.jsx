import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./BusSelectSeat.css";

const BusSelectSeat = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const bus = location.state || null;

  if (!bus) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2>No Bus Selected</h2>
        <button onClick={() => navigate("/bus/book")}>Go Back</button>
      </div>
    );
  }

  const totalSeats = 24;
  const bookedSeats = [4, 7, 11, 15];

  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat)) return;

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleProceed = () => {
    const bookingData = {
      bus,
      seats: selectedSeats,
      totalPrice: selectedSeats.length * bus.price,
    };

    navigate("/bus-confirm", { state: bookingData });
  };

  return (
    <div className="seat-page">
      <h1>🚌 Select Seat</h1>

      {/* Bus Info */}
      <div className="bus-info">
        <img src={bus.image} alt={bus.name} />
        <div>
          <h3>{bus.name}</h3>
          <p>{bus.type}</p>
          <p>Driver: {bus.driver.name}</p>
          <p>Price: ₹{bus.price} / km</p>
        </div>
      </div>

      {/* Seat Layout */}
      <div className="seat-layout">
        {Array.from({ length: totalSeats }, (_, i) => {
          const seat = i + 1;
          const isBooked = bookedSeats.includes(seat);
          const isSelected = selectedSeats.includes(seat);

          return (
            <div
              key={seat}
              className={`seat ${isBooked ? "booked" : ""} ${
                isSelected ? "selected" : ""
              }`}
              onClick={() => handleSeatClick(seat)}
            >
              {seat}
            </div>
          );
        })}
      </div>

      {/* Seat Info */}
      <div className="seat-summary">
        <p>
          Selected Seats: <b>{selectedSeats.join(", ") || "None"}</b>
        </p>

        <p>
          Total Price: ₹{selectedSeats.length * bus.price}
        </p>

        <button
          className="proceed-btn"
          onClick={handleProceed}
          disabled={selectedSeats.length === 0}
        >
          Proceed
        </button>
      </div>

      {/* Back */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>
    </div>
  );
};

export default BusSelectSeat;
import React from "react";
import { useNavigate } from "react-router-dom";

const Rental = () => {
  const navigate = useNavigate();

  const rentalOptions = [
    { id: 1, name: "4 hrs Package", price: 1000, time: "Available Now", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4MZjN2-mpNslSgy13AZ06m2Vk6dEdxKwKoQ&s" },
    { id: 2, name: "8 hrs Package", price: 1800, time: "Available Now", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-wgx62R9FlQ09Gjj_5EGI4uxQJo8YfcuY1w&s" },
  ];

  const handleConfirm = (ride) => {
    localStorage.setItem("ride", JSON.stringify(ride));
    navigate("/confirm");
  };

  return (
    <div>
      <h2>Book a Rental</h2>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {rentalOptions.map((rental) => (
          <div key={rental.id} style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "8px", width: "200px" }}>
            <img src={rental.image} alt={rental.name} style={{ width: "100%", borderRadius: "6px" }} />
            <h4>{rental.name}</h4>
            <p>₹{rental.price}</p>
            <p>{rental.time}</p>
            <button onClick={() => handleConfirm({ type: rental.name, price: rental.price, time: rental.time })}>
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rental;

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BookCab.css";

const BookCab = () => {
  const { state: cab } = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    pickup: "",
    drop: "",
    date: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ❌ No cab selected
  if (!cab) {
    return (
      <div className="booking-container">
        <h2>No Cab Selected 😢</h2>
        <button onClick={() => navigate("/cab/rental")}>
          Go Back
        </button>
      </div>
    );
  }

  // 🧠 Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Validate form
  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.pickup.trim()) newErrors.pickup = "Pickup required";
    if (!form.drop.trim()) newErrors.drop = "Drop required";
    if (!form.date) newErrors.date = "Select date";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🚀 Handle booking
  const handleBooking = () => {
    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      const bookingData = {
        ...form,
        cabName: cab.name,
        cabImage: cab.image,
        price: cab.price,
      };

      // 👉 Go to payment page instead of saving directly
      navigate("/cab-payment", { state: bookingData });
    }, 800);
  };

  return (
    <div className="booking-container">
      <h1>🚖 Book Your Cab</h1>

      {/* 🚗 CAB INFO */}
      <div className="cab-summary">
        <img src={cab.image} alt={cab.name} />
        <h2>{cab.name}</h2>
        <p>{cab.model}</p>
        <h3>{cab.price}</h3>
      </div>

      {/* 📝 FORM */}
      <div className="booking-form">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <span className="error">{errors.name}</span>}

        <input
          type="text"
          name="pickup"
          placeholder="Pickup Location"
          value={form.pickup}
          onChange={handleChange}
        />
        {errors.pickup && <span className="error">{errors.pickup}</span>}

        <input
          type="text"
          name="drop"
          placeholder="Drop Location"
          value={form.drop}
          onChange={handleChange}
        />
        {errors.drop && <span className="error">{errors.drop}</span>}

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />
        {errors.date && <span className="error">{errors.date}</span>}

        <button
          onClick={handleBooking}
          disabled={loading}
          className="confirm-btn"
        >
          {loading ? "Processing..." : "Continue to Payment"}
        </button>
      </div>

      {/* 🔙 BACK */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>
    </div>
  );
};

export default BookCab;
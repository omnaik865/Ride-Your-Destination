import React, { useState } from "react";
import "./RegisterPage.css";

const RegisterDriver = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    vehicleNumber: "",
    licenseNumber: "",
  });

  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit (offline)
  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Get existing driver data from localStorage
    const existingDrivers = JSON.parse(localStorage.getItem("drivers")) || [];

    // ✅ Check if email already exists
    const alreadyExists = existingDrivers.some(
      (driver) => driver.email === formData.email
    );

    if (alreadyExists) {
      setMessage("❌ This email is already registered!");
      return;
    }

    // ✅ Add new driver to localStorage
    existingDrivers.push(formData);
    localStorage.setItem("drivers", JSON.stringify(existingDrivers));

    setMessage("✅ Driver Registered Successfully!");
    setFormData({
      name: "",
      email: "",
      password: "",
      vehicleNumber: "",
      licenseNumber: "",
    });
  };

  return (
    <div className="register-main-container">
      <h2 className="register-title">Driver Registration</h2>

      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="vehicleNumber"
          placeholder="Vehicle Number"
          value={formData.vehicleNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="licenseNumber"
          placeholder="License Number"
          value={formData.licenseNumber}
          onChange={handleChange}
          required
        />

        <button type="submit" className="submit-btn">
          Register
        </button>
      </form>

      {message && <p className="response-msg">{message}</p>}
    </div>
  );
};

export default RegisterDriver;

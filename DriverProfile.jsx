import React, { useEffect, useState } from "react";
import { useDriverAuth } from "./DriverAuthContext";
import "./DriverProfile.css";

export default function DriverProfile() {
  const { driver, loginDriver } = useDriverAuth();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    vehicle: "",
    vehicleType: "",
    email: "",
    password: "",
  });

  const [toast, setToast] = useState("");
  const [error, setError] = useState("");

  // ✅ Vehicle Number Regex (India Format)
  const vehicleRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/;

  useEffect(() => {
    if (driver) setForm(driver);
  }, [driver]);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    let { name, value } = e.target;

    // PAN-style formatting for vehicle number
    if (name === "vehicle") {
      value = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    }

    setForm({ ...form, [name]: value });
    setError("");
  };

  // ✅ Save Profile
  const handleSave = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.phone ||
      !form.vehicle ||
      !form.vehicleType ||
      !form.email ||
      !form.password
    ) {
      setError("⚠️ All fields are required!");
      return;
    }

    if (form.phone.length !== 10) {
      setError("📱 Enter valid 10-digit phone number");
      return;
    }

    // ✅ Vehicle validation (PAN-like system)
    if (!vehicleRegex.test(form.vehicle)) {
      setError("🚗 Invalid Vehicle Number! Example: MH12AB1234");
      return;
    }

    const updatedDriver = {
      ...form,
      id: driver?.id || Date.now(),
    };

    // Save session
    loginDriver(updatedDriver);

    // Save to all drivers
    let allDrivers = JSON.parse(localStorage.getItem("allDrivers") || "[]");
    const index = allDrivers.findIndex((d) => d.id === updatedDriver.id);

    if (index !== -1) allDrivers[index] = updatedDriver;
    else allDrivers.push(updatedDriver);

    localStorage.setItem("allDrivers", JSON.stringify(allDrivers));

    setToast("✅ Profile updated successfully!");
    setError("");

    setTimeout(() => setToast(""), 3000);
  };

  return (
    <div className="profile-container">
      <h2>🚖 Driver Profile</h2>

      {toast && <div className="toast success">{toast}</div>}
      {error && <div className="toast error">{error}</div>}

      <form onSubmit={handleSave} className="profile-form">
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />

        {/* 🚗 Vehicle Number Input */}
        <input
          name="vehicle"
          placeholder="Vehicle Number (MH12AB1234)"
          value={form.vehicle}
          onChange={handleChange}
          maxLength={10}
        />

        {/* 🔴 Live validation message */}
        {form.vehicle &&
          !vehicleRegex.test(form.vehicle) && (
            <p className="error-text">
              Invalid format (Example: MH12AB1234)
            </p>
          )}

        <select
          name="vehicleType"
          value={form.vehicleType}
          onChange={handleChange}
        >
          <option value="">-- Select Vehicle Type --</option>
          <option value="Cab">🚗 Cab</option>
          <option value="Bike">🏍 Bike</option>
          <option value="Auto">🛺 Auto</option>
          <option value="Bus">🚌 Bus</option>
        </select>

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          disabled
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit">💾 Save Profile</button>
      </form>
    </div>
  );
}
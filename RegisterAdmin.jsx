import React, { useState } from "react";
import "./RegisterPage.css";

const RegisterAdmin = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    adminCode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Admin Registered Successfully!");
  };

  return (
    <div className="register-main-container">
      <h2 className="register-title">Admin Registration</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="text" name="adminCode" placeholder="Admin Access Code" onChange={handleChange} required />
        <button type="submit" className="submit-btn">Register</button>
      </form>
    </div>
  );
};

export default RegisterAdmin;

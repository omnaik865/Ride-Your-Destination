import React, { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("Please fill in all fields before submitting.");
      return;
    }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page">
      <h1 className="contact-header">Get in Touch</h1>

      <div className="contact-container">
        {/* ===== Contact Details ===== */}
        <div className="glass-card">
          <h2 className="section-title">Contact Details</h2>
          <div className="detail-item">
            <span className="icon">📍</span>
            <p> Lovely Circle, Sangli, India</p>
          </div>
          <div className="detail-item">
            <span className="icon">📞</span>
            <p>+91 9923767504</p>
          </div>
          <div className="detail-item">
            <span className="icon">✉️</span>
            <p>support@rideyourdestination.com</p>
          </div>
        </div>

        {/* ===== Contact Form ===== */}
        <div className="glass-card">
          <h2 className="section-title">Send a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
            ></textarea>
            <button type="submit">
              {submitted ? "Message Sent ✅" : "Send Message"}
            </button>
          </form>
        </div>

        {/* ===== Google Map Embed ===== */}
        <div className="glass-card">
          <h2 className="section-title">Our Location</h2>
          <iframe
            title="Ride Destination Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.937972444188!2d72.87765547496012!3d19.07609088210639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c630ba7b7a2d%3A0xdda6c36cb4e5d9f0!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1709496555944!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
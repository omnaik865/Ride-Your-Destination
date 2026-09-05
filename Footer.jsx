// src/pages/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="uber-footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-section brand">
          <h2>Ride Your Destination</h2>
          <p>Book Ride Now</p>

          <div className="app-buttons">
            <a href="#">
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
              />
            </a>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/512px-Google_Play_Store_badge_EN.svg.png"
              alt="Google Play Store"
              width="120"
            />
          </div>

          {/* Social Media Icons */}
          <div className="social-icons" style={{ marginTop: "15px" }}>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                alt="Facebook"
                width="30"
                style={{ marginRight: "10px" }}
              />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg"
                alt="Instagram"
                width="30"
              />
            </a>
          </div>
        </div>

        {/* Links Section */}
        <div className="footer-section links">
          <h4>@RideYourDestination.com</h4>
          <ul>
            <li>
              <Link to="/aboutus">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/support">Support</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="footer-bottom">© 2025 Ride Your Destination. All Rights Reserved.</div>
    </footer>
  );
};

export default Footer;

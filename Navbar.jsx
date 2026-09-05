import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h3 className="logo">Uber Clone</h3>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/book">Book Ride</Link>
        <Link to="/account">Account</Link>
      </div>
    </nav>
  );
};

export default Navbar; // ✅ Important line!

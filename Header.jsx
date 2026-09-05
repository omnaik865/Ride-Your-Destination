// src/pages/Header.jsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./Header.css";

const Header = () => {
  const auth = useAuth();
  const user = auth?.user;
  const logout = auth?.logout;
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    if (logout) logout();
    navigate("/loginoptions");
  };

  const toggleMenu = () => setShowMenu(prev => !prev);

  const userInitial = user ? (user.name?.[0] || user.email?.[0])?.toUpperCase() : "";

  const getDashboardLink = () => {
    if (!user) return null;
    if (user.role === "admin") return "/admin/dashboard";
    if (user.role === "driver") return "/driver/dashboard";
    return "/account";
  };

  return (
    <header className="header">
      <h2 className="logo" onClick={() => navigate("/")}>
        🚖 Ride Your Destination
      </h2>

      <nav className="nav-links">
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>🏠 Home</NavLink>
        {user && <NavLink to={getDashboardLink()} className={({ isActive }) => isActive ? "active" : ""}>📊 Dashboard</NavLink>}
        <NavLink to="/services" className={({ isActive }) => isActive ? "active" : ""}>📦 Services</NavLink>
        <NavLink to="/support" className={({ isActive }) => isActive ? "active" : ""}>🛠️ Support</NavLink>
      </nav>

      <div className="header-right">
        {user ? (
          <div className="avatar-wrapper">
            <div className="user-avatar" onClick={toggleMenu}>{userInitial}</div>
            {showMenu && (
              <div className="avatar-menu">
                <p className="menu-user">{user.name || user.email}</p>
                <NavLink to={getDashboardLink()} className="menu-item">Profile</NavLink>
                <button onClick={handleLogout} className="menu-item logout-btn">Logout</button>
              </div>
            )}
          </div>
        ) : (
          <NavLink to="/loginoptions"><button className="founder">Login</button></NavLink>
        )}
        {user?.role === "user" && <NavLink to="/book"><button className="button book-btn">Book Now</button></NavLink>}
      </div>
    </header>
  );
};

export default Header;

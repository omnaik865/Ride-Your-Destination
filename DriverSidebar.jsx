import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../pages/AuthContext";

export default function DriverSidebar() {
  const { logout, user } = useAuth();

  return (
    <aside className="driver-sidebar">
      <div className="sidebar-top">
        <div className="driver-avatar">{(user?.name || "D").charAt(0)}</div>
        <div className="driver-info">
          <div className="driver-name">{user?.name || "Driver"}</div>
          <div className="driver-role">Driver</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/driver/dashboard" className={({isActive}) => isActive ? "active" : ""}>Dashboard</NavLink>
        <NavLink to="/driver/rides" className={({isActive}) => isActive ? "active" : ""}>Ride Requests</NavLink>
        <NavLink to="/driver/earnings" className={({isActive}) => isActive ? "active" : ""}>Earnings</NavLink>
        <NavLink to="/driver/profile" className={({isActive}) => isActive ? "active" : ""}>Profile</NavLink>
      </nav>

      <div className="sidebar-bottom">
        <button className="logout" onClick={logout}>Logout</button>
      </div>
    </aside>
  );
}

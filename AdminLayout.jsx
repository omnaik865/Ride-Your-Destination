// src/layouts/AdminLayout.jsx
import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import "./AdminLayout.css";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const links = [
    { path: "/admin/dashboard", label: "Dashboard" },
    { path: "/admin/users", label: "Users" },
    { path: "/admin/drivers", label: "Drivers" },
    { path: "/admin/rides", label: "Rides" },
    { path: "/admin/earnings", label: "Earnings" },
    { path: "/admin/settings", label: "Settings" },
  ];

  return (
    <div className={`admin-layout ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <button className="toggle-btn" onClick={toggleSidebar}>
            {sidebarOpen ? "◀" : "▶"}
          </button>
        </div>
        <nav>
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

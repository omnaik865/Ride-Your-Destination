import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../pages/AuthContext";
import "./Driver.css";

export default function DriverLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Load notifications from localStorage
  useEffect(() => {
    const storedNotifications = JSON.parse(localStorage.getItem("driverNotifications") || "[]");
    setNotifications(storedNotifications);

    const unread = storedNotifications.filter(n => !n.seen).length;
    setUnreadCount(unread);
  }, []);

  // Mark all notifications as seen
  const handleShowNotifications = () => {
    setShowNotifications(!showNotifications);

    if (unreadCount > 0) {
      const updated = notifications.map(n => ({ ...n, seen: true }));
      setNotifications(updated);
      localStorage.setItem("driverNotifications", JSON.stringify(updated));
      setUnreadCount(0);
    }
  };

  return (
    <div className="driver-layout">
      {/* Sidebar */}
      <aside className="driver-sidebar">
        <h2 className="driver-title">Driver Panel</h2>

        {/* Driver Info */}
        {user && (
          <div className="driver-info">
            <p><strong>{user.name}</strong></p>
            {user.vehicleType && <p>Vehicle: {user.vehicleType}</p>}
          </div>
        )}

        {/* Notifications */}
        <div className="driver-notifications">
          <button className="notifications-btn" onClick={handleShowNotifications}>
            🔔 Notifications {unreadCount > 0 && `(${unreadCount})`}
          </button>

          {showNotifications && (
            <div className="notifications-box">
              {notifications.length === 0 ? (
                <p>No notifications</p>
              ) : (
                notifications
                  .slice()
                  .reverse()
                  .map(n => (
                    <div key={n.id} className={`notification-item ${n.seen ? "seen" : "unseen"}`}>
                      {n.message}
                      <small>{new Date(n.createdAt).toLocaleString()}</small>
                    </div>
                  ))
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="driver-nav">
          <ul>
            <li>
              <NavLink to="/driver/dashboard" className={({ isActive }) => (isActive ? "active-link" : "")}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/driver/rides" className={({ isActive }) => (isActive ? "active-link" : "")}>
                Rides
              </NavLink>
            </li>
            <li>
              <NavLink to="/driver/earnings" className={({ isActive }) => (isActive ? "active-link" : "")}>
                Earnings
              </NavLink>
            </li>
            <li>
              <NavLink to="/driver/profile" className={({ isActive }) => (isActive ? "active-link" : "")}>
                Profile
              </NavLink>
            </li>
            <li>
              <button
                className="logout-btn"
                onClick={() => {
                  logout();
                  navigate("/loginoptions");
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="driver-content">
        <Outlet />
      </main>
    </div>
  );
}

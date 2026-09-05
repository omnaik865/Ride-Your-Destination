// src/pages/AdminSettings.jsx
import React, { useState } from "react";
import "./AdminSettings.css";

const AdminSettings = () => {
  const [adminName, setAdminName] = useState("Admin");
  const [adminEmail, setAdminEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [message, setMessage] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    // You can save settings to localStorage or backend
    localStorage.setItem("adminSettings", JSON.stringify({
      adminName,
      adminEmail,
      notifications,
    }));
    setPassword("");
    setMessage("Settings saved successfully!");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="admin-page settings-page">
      <h1>Admin Settings</h1>

      <div className="settings-card">
        <form onSubmit={handleSave}>
          <label>
            Name:
            <input
              type="text"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              required
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              required
            />
          </label>

          <label>
            New Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave blank to keep current password"
            />
          </label>

          <label className="toggle-label">
            <span>Notifications</span>
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
          </label>

          <button type="submit">Save Settings</button>
          {message && <p className="success-message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;

import React, { useState, useEffect } from "react";
import "./Settings.css";

const Settings = ({ userId }) => {
  const [settings, setSettings] = useState({
    language: "English",
    paymentMethod: "Credit Card", // optional: store in preferences table if needed
    rideType: "UberX",            // optional
    accessibility: false,         // optional
    emailNotifications: true,
    smsNotifications: false,
  });

  // Load preferences from backend on mount
  useEffect(() => {
    fetch(`http://localhost:5000/api/preferences/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setSettings((prev) => ({
            ...prev,
            language: data.language || prev.language,
            emailNotifications: data.notifications_enabled || prev.emailNotifications,
            // Add other fields if you expand your preferences table
          }));
        }
      })
      .catch((err) => console.error(err));
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    try {
      // Send preferences to backend
      const response = await fetch(`http://localhost:5000/api/preferences/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: settings.language,
          theme: settings.theme || "light", // optional
          notifications_enabled: settings.emailNotifications, // map emailNotifications
        }),
      });

      if (response.ok) {
        alert("Settings saved to database!");
      } else {
        alert("Failed to save settings");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving settings");
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-card">
        <h2>Settings</h2>

        {/* Language */}
        <div className="settings-item">
          <label>Language</label>
          <select name="language" value={settings.language} onChange={handleChange}>
            <option>English</option>
            <option>Hindi</option>
            <option>Spanish</option>
          </select>
        </div>

        {/* Notifications */}
        <div className="settings-item checkbox-item">
          <label>
            <input
              type="checkbox"
              name="emailNotifications"
              checked={settings.emailNotifications}
              onChange={handleChange}
            />
            Email Notifications
          </label>
        </div>

        <div className="settings-item checkbox-item">
          <label>
            <input
              type="checkbox"
              name="smsNotifications"
              checked={settings.smsNotifications}
              onChange={handleChange}
            />
            SMS Notifications
          </label>
        </div>

        {/* Save Button */}
        <button className="save-btn" onClick={handleSave}>
          💾 Save Settings
        </button>
        
      <button className="back-btn" onClick={() => window.history.back()}>
        ⬅️ Back
      </button>
      </div>
    </div>
  );
};

export default Settings;

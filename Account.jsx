// src/pages/Account.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./Account.css";

const vehicleIcons = { Cab: "🚖", Auto: "🛺", Bike: "🏍️", Bus: "🚌" };

const Account = () => {
  const navigate = useNavigate();
  const {
    user,
    logout,
    bookings,
    updateBooking,
    deleteBooking,
    notifications,
    markNotificationsSeen,
  } = useAuth();

  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNotifs, setShowNotifs] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);

  // Load bookings and wallet
  const loadBookingsAndWallet = () => {
    const allBookings = JSON.parse(localStorage.getItem("tripHistory") || "[]");
    if (user) {
      setUserBookings(allBookings.filter((b) => b.userId === user.id));

      const walletData = JSON.parse(localStorage.getItem("wallet") || "{}");
      setWalletBalance(walletData[user.id] || 0);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadBookingsAndWallet();

    // Listen to storage changes for real-time updates
    const handleStorageChange = (e) => {
      if (["tripHistory", "userNotifications", "wallet"].includes(e.key)) {
        loadBookingsAndWallet();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [user]);

  const handleCancel = (id) => {
    if (window.confirm("Are you sure you want to cancel this ride?")) {
      updateBooking(id, { status: "Cancelled" });
      loadBookingsAndWallet();
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this ride?")) {
      deleteBooking(id);
      loadBookingsAndWallet();
    }
  };

  // Notifications
  const [userNotifs, setUserNotifs] = useState([]);
  useEffect(() => {
    const notifs = JSON.parse(localStorage.getItem("userNotifications") || "[]");
    if (user) setUserNotifs(notifs.filter((n) => n.userId === user.id));
  }, [userBookings]);

  const unseenCount = userNotifs.filter((n) => !n.seen).length;

  const markAllSeen = () => {
    const updated = userNotifs.map((n) => ({ ...n, seen: true }));
    const allNotifs = JSON.parse(localStorage.getItem("userNotifications") || "[]");
    const merged = allNotifs.map((n) => {
      const updatedNotif = updated.find((un) => un.id === n.id);
      return updatedNotif || n;
    });
    localStorage.setItem("userNotifications", JSON.stringify(merged));
    setUserNotifs(updated);
    setShowNotifs(false);
  };

  return (
    <div className="account-page">
      <aside className="sidebar">
        <h3 className="menu-title">☰ Menu</h3>
        <Link to="/account">
          <button>🏠 Account</button>
        </Link>
        <button onClick={() => setShowNotifs(!showNotifs)}>
          🔔 Notifications ({unseenCount})
        </button>
        <Link to="/upipaymentpage">
          <button>💳 Payment</button>
        </Link>
        <Link to="/wallet">
          <button>💼 Wallet</button>
        </Link>
        <Link to="/settings">
          <button>⚙️ Settings</button>
        </Link>
        <Link to="/aboutus">
          <button>ℹ️ About Us</button>
        </Link>
        <Link to="/services">
          <button>🧭 Services</button>
        </Link>
        <Link to="/support">
          <button>📞 Support</button>
        </Link>
        <button
          className="logout-btn"
          onClick={() => {
            logout();
            navigate("/loginoptions");
          }}
        >
          🚪 Logout
        </button>
      </aside>

      <main className="account-content">
        {showNotifs && (
          <div className="notifications-panel">
            <h3>Notifications</h3>
            {userNotifs.length === 0 ? (
              <p>No notifications</p>
            ) : (
              userNotifs
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((n) => (
                  <div
                    key={n.id}
                    className={`notification ${n.seen ? "seen" : "unseen"}`}
                  >
                    {n.message}
                  </div>
                ))
            )}
            <button onClick={markAllSeen}>Mark all as seen</button>
          </div>
        )}

        {/* USER PROFILE */}
        <div className="profile-card">
          <div className="profile-left">
            <img
              src={
                user.profilePic ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="Profile"
              className="profile-img"
            />
          </div>
          <div className="profile-right">
            <h2>{user.name}</h2>
            <p>📧 {user.email}</p>
            <p>📱 {user.phone || "No phone added"}</p>
            <p>💼 Wallet Balance: <strong>₹{walletBalance.toFixed(2)}</strong></p>
            <button
              className="edit-profile-btn"
              onClick={() => navigate("/editprofile")}
            >
              ✏️ Edit Profile
            </button>
          </div>
        </div>

        {/* ACTIVITY */}
        <h3 className="booking-title">My Activity</h3>
        {loading ? (
          <p className="loading">Fetching your bookings...</p>
        ) : userBookings.length === 0 ? (
          <p className="no-bookings">
            No bookings yet. Book your first ride 🚗✨
          </p>
        ) : (
          <div className="bookings-list">
            {userBookings
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((b) => (
                <div key={b.id} className="booking-card">
                  <div className="booking-icon">
                    {vehicleIcons[b.vehicle] || "🚗"}
                  </div>
                  <div className="booking-details">
                    <p>
                      <strong>{b.vehicle}</strong> — {b.pickup} ➜ {b.dropoff}
                    </p>
                    <p>🛣 Distance: {b.distance}</p>
                    <p>⏱ ETA: {b.duration}</p>
                    {b.note && <p>📝 Note: {b.note}</p>}
                    <p className={`status-tag status-${b.status?.toLowerCase()}`}>
                      Status: {b.status}
                    </p>
                  </div>
                  <div className="booking-actions">
                    {b.status !== "Cancelled" && (
                      <button
                        className="cancel-btn"
                        onClick={() => handleCancel(b.id)}
                      >
                        ❌ Cancel Ride
                      </button>
                    )}
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(b.id)}
                    >
                      🗑️ Delete Ride
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Account;
// src/pages/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("loggedUser") || "null")
  );
  const [driver, setDriver] = useState(
    JSON.parse(localStorage.getItem("loggedDriver") || "null")
  );

  const [bookings, setBookings] = useState(
    JSON.parse(localStorage.getItem("tripHistory") || "[]")
  );

  const [notifications, setNotifications] = useState(
    JSON.parse(localStorage.getItem("notifications") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("tripHistory", JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  // --- USER / DRIVER LOGIN / LOGOUT ---
  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem("loggedUser", JSON.stringify(userData));
  };

  const loginDriver = (driverData) => {
    setDriver(driverData);
    localStorage.setItem("loggedDriver", JSON.stringify(driverData));
  };

  const logout = () => {
    setUser(null);
    setDriver(null);
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("loggedDriver");
  };

  // --- BOOKING MANAGEMENT ---
  const addBooking = (booking) => {
    const newBooking = {
      ...booking,
      id: Date.now(),
      userId: user?.id || null,
      driverId: null, // assigned later
      status: "Upcoming",
    };
    setBookings((prev) => [...prev, newBooking]);
  };

  const updateBooking = (id, updates) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          const updated = { ...b, ...updates };

          // If driver confirms/cancels ride, notify user
          if (updates.status === "Completed" || updates.status === "Cancelled" || updates.status === "Rejected") {
            addNotification({
              message: `Your ride from ${b.pickup} to ${b.dropoff} is ${updates.status}.`,
            });
          }

          return updated;
        }
        return b;
      })
    );
  };

  const deleteBooking = (id) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  // --- DRIVER ACTIONS ---
  const driverAcceptRide = (rideId) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === rideId) {
          addNotification({
            message: `Your ride from ${b.pickup} to ${b.dropoff} has been accepted by the driver.`,
          });
          return { ...b, status: "Confirmed", driverId: driver?.id || null };
        }
        return b;
      })
    );
  };

  const driverRejectRide = (rideId) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === rideId) {
          addNotification({
            message: `Your ride from ${b.pickup} to ${b.dropoff} has been rejected by the driver.`,
          });
          return { ...b, status: "Rejected" };
        }
        return b;
      })
    );
  };

  // --- NOTIFICATIONS ---
  const addNotification = ({ message }) => {
    const newNotif = {
      id: Date.now(),
      message,
      seen: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markNotificationsSeen = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, seen: true })));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        driver,
        bookings,
        notifications,
        loginUser,
        loginDriver,
        logout,
        addBooking,
        updateBooking,
        deleteBooking,
        driverAcceptRide,
        driverRejectRide,
        addNotification,
        markNotificationsSeen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

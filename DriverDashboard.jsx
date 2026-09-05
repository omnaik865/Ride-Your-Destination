// src/Driver/DriverDashboard.jsx
import React, { useEffect, useState } from "react";
import DriverLiveLocation from "./DriverLiveLocations";

import "./DriverDashboard.css"; // Add your styles if needed

const DriverDashboard = () => {
  const [stats, setStats] = useState({
    totalRides: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
    earnings: 0,
  });

  const [upcomingRides, setUpcomingRides] = useState([]);

  // Load driver rides from localStorage
  useEffect(() => {
    updateDashboard();
  }, []);

  const updateDashboard = () => {
    const allRides = JSON.parse(localStorage.getItem("tripHistory") || "[]");
    const driver = JSON.parse(localStorage.getItem("loggedDriver") || "{}");
    const driverId = driver?.id;

    // Filter rides assigned to this driver
    const driverRides = allRides.filter(
      (r) => r.driverId === driverId || r.status === "Upcoming"
    );

    // Stats
    const confirmed = driverRides.filter((r) => r.status === "Confirmed").length;
    const completed = driverRides.filter((r) => r.status === "Completed").length;
    const cancelled = driverRides.filter((r) => r.status === "Cancelled").length;

    // Conditional earnings: 30% without petrol, 15% with petrol
    const earnings = driverRides
      .filter((r) => r.status === "Completed")
      .reduce((sum, r) => {
        const fare = Number(r?.fare?.toString().replace("₹", "").trim() || 0);
        const percentage = r.hasPetrol ? 0.15 : 0.30;
        return sum + fare * percentage;
      }, 0);

    setStats({
      totalRides: driverRides.length,
      confirmed,
      completed,
      cancelled,
      earnings,
    });

    // Show only unassigned upcoming rides for accept/reject
    const upcoming = allRides.filter((r) => r.status === "Upcoming");
    setUpcomingRides(upcoming);
  };

  const handleRideAction = (rideId, action) => {
    const allRides = JSON.parse(localStorage.getItem("tripHistory") || "[]");
    const driver = JSON.parse(localStorage.getItem("loggedDriver") || "{}");

    const updatedRides = allRides.map((r) => {
      if (r.id === rideId) {
        return {
          ...r,
          status: action,
          driverId: action === "Confirmed" ? driver.id : null,
        };
      }
      return r;
    });

    localStorage.setItem("tripHistory", JSON.stringify(updatedRides));

    // Notify user
    const userNotifications = JSON.parse(localStorage.getItem("userNotifications") || "[]");
    const ride = allRides.find((r) => r.id === rideId);
    if (ride) {
      userNotifications.push({
        id: Date.now(),
        userId: ride.userId,
        message:
          action === "Confirmed"
            ? `Your ride from ${ride.pickup} to ${ride.dropoff} has been accepted by a driver!`
            : `Your ride from ${ride.pickup} to ${ride.dropoff} has been rejected by a driver.`,
        seen: false,
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem("userNotifications", JSON.stringify(userNotifications));
    }

    updateDashboard();
  };

  return (
    <div className="driver-page">
      <h1>Driver Dashboard</h1>

      {/* Stats Cards */}
      <div className="driver-cards">
        <div className="driver-card">
          <h3>Total Rides</h3>
          <p>{stats.totalRides}</p>
        </div>
        <div className="driver-card">
          <h3>Confirmed</h3>
          <p>{stats.confirmed}</p>
        </div>
        <div className="driver-card">
          <h3>Completed</h3>
          <p>{stats.completed}</p>
        </div>
        <div className="driver-card">
          <h3>Cancelled</h3>
          <p>{stats.cancelled}</p>
        </div>
        <div className="driver-card">
          <h3>Earnings</h3>
          <p>₹ {stats.earnings.toFixed(2)}</p>
        </div>
      </div>

      {/* Upcoming Rides */}
      <h2>Available Rides</h2>
      {upcomingRides.length === 0 && <p>No rides to accept at the moment.</p>}
      <div className="ride-list">
        {upcomingRides.map((ride) => (
          <div key={ride.id} className="ride-card">
            <p>
              <strong>Pickup:</strong> {ride.pickup} <br />
              <strong>Drop:</strong> {ride.dropoff} <br />
              <strong>Vehicle:</strong> {ride.vehicle} <br />
              <strong>Fare:</strong> {ride.fare} <br />
              <strong>Petrol Included:</strong> {ride.hasPetrol ? "Yes" : "No"}
            </p>
            <div className="ride-actions">
              <button onClick={() => handleRideAction(ride.id, "Confirmed")}>✅ Accept</button>
              <button onClick={() => handleRideAction(ride.id, "Rejected")}>❌ Reject</button>
            </div>
          </div>
        ))}
      </div>

      {/* Live Location */}
      <h2 style={{ marginTop: "20px" }}>Live Location</h2>
      <DriverLiveLocation small={false} />
    </div>
  );
};

export default DriverDashboard;

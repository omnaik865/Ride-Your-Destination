import React, { useEffect, useState } from "react";
import "./Activity.css";
import { MapPin, Clock, Car, DollarSign } from "lucide-react";

const Activity = () => {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    // Read rides saved from BookingPage
    const saved = JSON.parse(localStorage.getItem("tripHistory") || "[]");

    if (saved.length > 0) {
      setRides(saved.reverse()); // latest first
      return;
    }

    // If no local storage, fetch from backend (optional)
    fetch("http://localhost:6900/api/rides")
      .then((res) => res.json())
      .then((data) => setRides(data))
      .catch(() =>
        setRides([
          {
            id: 1,
            from: "Marine Drive, Mumbai",
            to: "Bandra Kurla Complex, Mumbai",
            date: "2025-10-13T18:30:00Z",
            fare: 240,
            vehicle: "UberGo",
            status: "Completed",
          },
          {
            id: 2,
            from: "Pune Station",
            to: "Magarpatta City, Pune",
            date: "2025-10-12T15:10:00Z",
            fare: 320,
            vehicle: "UberXL",
            status: "Cancelled",
          },
          {
            id: 3,
            from: "Viman Nagar, Pune",
            to: "Kharadi, Pune",
            date: "2025-10-10T10:00:00Z",
            fare: 150,
            vehicle: "UberAuto",
            status: "Completed",
          },
        ])
      );
  }, []);

  return (
    <div className="activity-page">
      <h1 className="activity-title">Ride Activity</h1>

      {rides.length === 0 ? (
        <p className="no-activity">No rides yet. Start your journey now!</p>
      ) : (
        <div className="activity-list">
          {rides.map((ride, index) => (
            <div
              key={ride.id}
              className="activity-card"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="ride-header">
                <div className="ride-icon-wrap">
                  <Car className="ride-icon" />
                </div>
                <div className="ride-title">
                  <h2>{ride.vehicle}</h2>

                  <span
                    className={`status ${
                      ride.status === "Completed"
                        ? "completed"
                        : ride.status === "Cancelled"
                        ? "cancelled"
                        : "pending"
                    }`}
                  >
                    {ride.status}
                  </span>
                </div>
              </div>

              <div className="ride-info">
                <div className="route">
                  <MapPin className="icon" />
                  <div>
                    <p className="from">{ride.from}</p>
                    <p className="to">→ {ride.to}</p>
                  </div>
                </div>

                <div className="meta">
                  <div className="time">
                    <Clock className="icon" />
                    {new Date(ride.date).toLocaleString()}
                  </div>

                  <div className="fare">
                    <DollarSign className="icon" /> ₹{ride.fare}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Activity;

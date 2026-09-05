import React, { useState, useEffect } from "react";
import { useAuth } from "../pages/AuthContext";
import "./DriverRideRequests.css";

const API = "http://localhost:5000";

const driverPerKm = { Cab: 5, Bike: 4, Auto: 4, Bus: 3 };

export default function DriverRideRequests() {
  const { user } = useAuth();

  const [requests, setRequests] = useState([]);
  const [active, setActive] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);

  // ================= LOAD REQUESTS =================
  const loadRequests = async () => {
    try {
      const res = await fetch(
        `${API}/driver/requests/${user.vehicleType}`
      );
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user?.vehicleType) loadRequests();
  }, [user]);

  // ================= ACCEPT =================
  const accept = async (ride) => {
    try {
      await fetch(`${API}/driver/accept`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ride_id: ride.id,
          driver_id: user.driver_id,
        }),
      });

      setActive([...active, ride]);
      setRequests(requests.filter((r) => r.id !== ride.id));

      // Earnings
      setTotalEarnings(
        totalEarnings + ride.distance * driverPerKm[ride.vehicle_type]
      );
    } catch (err) {
      console.log(err);
    }
  };

  // ================= REJECT =================
  const reject = async (ride) => {
    try {
      await fetch(`${API}/driver/reject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ride_id: ride.id }),
      });

      setRequests(requests.filter((r) => r.id !== ride.id));
    } catch (err) {
      console.log(err);
    }
  };

  // ================= COMPLETE =================
  const completeRide = async (id) => {
    try {
      await fetch(`${API}/driver/complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ride_id: id }),
      });

      setActive(active.filter((r) => r.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="driver-page-container">
      <h2>{user?.vehicleType} Ride Requests</h2>

      <div className="earnings-summary">
        <h4>Total Earnings: ₹ {totalEarnings.toFixed(2)}</h4>
      </div>

      <div className="requests-grid">
        {/* Pending */}
        <div className="requests-list">
          <h4>Pending Requests</h4>

          {requests.length === 0 && <p>No requests</p>}

          {requests.map((r) => (
            <div key={r.id} className="request-card">
              <strong>{r.pickup_location} → {r.drop_location}</strong>
              <p>Fare: ₹ {r.fare}</p>

              <div className="request-actions">
                <button onClick={() => accept(r)}>Accept</button>
                <button onClick={() => reject(r)}>Reject</button>
              </div>
            </div>
          ))}
        </div>

        {/* Active */}
        <div className="active-list">
          <h4>Active Rides</h4>

          {active.length === 0 && <p>No active rides</p>}

          {active.map((a) => (
            <div key={a.id} className="request-card">
              <strong>{a.pickup_location} → {a.drop_location}</strong>
              <p>
                Earnings: ₹{" "}
                {a.fare * (driverPerKm[a.vehicle_type] / 10)}
              </p>

              <button onClick={() => completeRide(a.id)}>
                Complete Ride
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
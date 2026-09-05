import React, { useEffect, useState } from "react";
import "./AdminRides.css";

const AdminRides = () => {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    const allRides = JSON.parse(localStorage.getItem("tripHistory") || "[]");
    setRides(allRides);
  }, []);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount);

  const viewOnMap = (pickup, dropoff) => {
    if (!pickup || !dropoff) return;
    const url = `https://www.google.com/maps/dir/${encodeURIComponent(pickup)}/${encodeURIComponent(dropoff)}`;
    window.open(url, "_blank");
  };

  const deleteRide = (id) => {
    const updatedRides = rides.filter((r) => r.id !== id);
    setRides(updatedRides);
    localStorage.setItem("tripHistory", JSON.stringify(updatedRides));
  };

  return (
    <div className="admin-page">
      <h1>All Rides</h1>

      {rides.length === 0 ? (
        <p>No rides available.</p>
      ) : (
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Pickup Location</th>
                <th>Drop Location</th>
                <th>Fare</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rides.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.pickup || "N/A"}</td>
                  <td>{r.dropoff || "N/A"}</td>
                  <td>{formatCurrency(r.fare)}</td>
                  <td className={r.status === "completed" ? "status-active" : "status-blocked"}>
                    {r.status}
                  </td>
                  <td>
                    <button
                      className="map-btn"
                      onClick={() => viewOnMap(r.pickup, r.dropoff)}
                    >
                      View Map
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteRide(r.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminRides;

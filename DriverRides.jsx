import React, { useEffect, useState } from "react";
import "./DriverRides.css";

const DriverRides = () => {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    const driver = JSON.parse(localStorage.getItem("loggedDriver") || "{}");
    const allRides = JSON.parse(localStorage.getItem("tripHistory") || "[]");

    const driverRides = allRides.filter(
      (r) => r.driverId === null || r.driverId === driver.id
    );

    setRides(driverRides);
  }, []);

  const acceptRide = (id) => {
    const driver = JSON.parse(localStorage.getItem("loggedDriver"));
    const allRides = JSON.parse(localStorage.getItem("tripHistory"));

    const updated = allRides.map((r) =>
      r.id === id
        ? { ...r, driverId: driver.id, status: "ongoing" }
        : r
    );

    localStorage.setItem("tripHistory", JSON.stringify(updated));
    setRides(updated.filter((r) => r.driverId === driver.id));
  };

  const viewOnMap = (from, to) => {
    if (!from || !to) return alert("Location missing");
    const url = `https://www.google.com/maps/dir/${encodeURIComponent(
      from
    )}/${encodeURIComponent(to)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="driver-page">
      <h1>Driver Rides</h1>

      {rides.length === 0 ? (
        <p>No rides available</p>
      ) : (
        <table className="driver-table">
          <thead>
            <tr>
              <th>Pickup</th>
              <th>Drop</th>
              <th>Fare</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rides.map((r) => {
              // ✅ SUPPORT OLD + NEW DATA
              const pickup = r.from || r.pickup || "N/A";
              const drop = r.to || r.dropoff || "N/A";

              return (
                <tr key={r.id}>
                  <td>{pickup}</td>
                  <td>{drop}</td>
                  <td>₹{r.fare || 0}</td>
                  <td>{r.status}</td>
                  <td>
                    {r.driverId ? (
                      <button onClick={() => viewOnMap(pickup, drop)}>
                        View Map
                      </button>
                    ) : (
                      <button onClick={() => acceptRide(r.id)}>
                        Accept Ride
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DriverRides;

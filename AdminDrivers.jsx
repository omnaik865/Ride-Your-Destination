import React, { useEffect, useState } from "react";
import "./AdminDrivers.css"; // Use the CSS I gave earlier

export default function AdminDrivers() {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const allDrivers = JSON.parse(localStorage.getItem("allDrivers") || "[]");
    setDrivers(allDrivers);
  }, []);

  const toggleStatus = (id) => {
    const updatedDrivers = drivers.map((d) => {
      if (d.id === id) d.status = d.status === "active" ? "blocked" : "active";
      return d;
    });
    setDrivers(updatedDrivers);
    localStorage.setItem("allDrivers", JSON.stringify(updatedDrivers));
  };

  return (
    <div className="admin-page">
      <h1>All Drivers</h1>
      {drivers.length === 0 ? (
        <p>No drivers available.</p>
      ) : (
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Vehicle</th>
                <th>Type</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((d) => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{d.name}</td>
                  <td>{d.phone}</td>
                  <td>{d.vehicle}</td>
                  <td>{d.vehicleType}</td>
                  <td>{d.email}</td>
                  <td className={d.status === "active" ? "status-active" : "status-blocked"}>
                    {d.status || "active"}
                  </td>
                  <td>
                    {d.status === "active" ? (
                      <button className="block-btn" onClick={() => toggleStatus(d.id)}>
                        Block
                      </button>
                    ) : (
                      <button className="unblock-btn" onClick={() => toggleStatus(d.id)}>
                        Unblock
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

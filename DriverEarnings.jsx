import React from "react";
import "./DriverEarnings.css";
const weekly = [
  { day: "Mon", earnings: 800 },
  { day: "Tue", earnings: 640 },
  { day: "Wed", earnings: 920 },
  { day: "Thu", earnings: 700 },
  { day: "Fri", earnings: 1120 },
  { day: "Sat", earnings: 950 },
  { day: "Sun", earnings: 430 },
];

export default function DriverEarnings() {
  const total = weekly.reduce((s, x) => s + x.earnings, 0);

  return (
    <div className="driver-page-container">
      <h2>Earnings</h2>

      <div className="earnings-summary">
        <div>
          <h3>Weekly Total</h3>
          <p className="big">₹ {total}</p>
        </div>

        <div>
          <h3>Wallet Balance</h3>
          <p className="big">₹ {Math.floor(total * 0.6)}</p>
        </div>
      </div>

      <table className="earnings-table">
        <thead>
          <tr>
            <th>Day</th>
            <th>Earnings</th>
          </tr>
        </thead>
        <tbody>
          {weekly.map((w) => (
            <tr key={w.day}>
              <td>{w.day}</td>
              <td>₹ {w.earnings}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

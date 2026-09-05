import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    drivers: 0,
    rides: 0,
    earnings: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = () => {
      // Offline storage keys
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const drivers = JSON.parse(localStorage.getItem("allDrivers") || "[]"); // updated
      const rides = JSON.parse(localStorage.getItem("tripHistory") || "[]");

      const totalEarnings = rides.reduce((sum, ride) => sum + (ride?.fare || 0), 0);

      setStats({
        users: users.length,
        drivers: drivers.length,
        rides: rides.length,
        earnings: totalEarnings,
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount);

  const cardData = [
    { title: "Total Users", value: stats.users },
    { title: "Total Drivers", value: stats.drivers },
    { title: "Total Rides", value: stats.rides },
    { title: "Total Earnings", value: formatCurrency(stats.earnings) },
  ];

  return (
    <div className="admin-page">
      <h1>Dashboard Overview</h1>

      <div className="admin-cards">
        {cardData.map((card, index) => (
          <div className="admin-card" key={index}>
            <h3>{card.title}</h3>
            <p>{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;

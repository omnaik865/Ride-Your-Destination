import React, { useEffect, useState } from "react";
import "./AdminEarnings.css";

const API = "http://localhost:5000";

const AdminEarnings = () => {
  const [earnings, setEarnings] = useState(0);
  const [loading, setLoading] = useState(true);

  // ================= LOAD EARNINGS =================
  const loadEarnings = async () => {
    try {
      const res = await fetch(`${API}/admin/earnings`);
      const data = await res.json();
      setEarnings(data.total || 0);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEarnings();
  }, []);

  // ================= FORMAT ₹ =================
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);

  if (loading) return <p>Loading earnings...</p>;

  return (
    <div className="admin-page earnings-page">
      <h1>💰 Total Earnings</h1>

      <h2 className="earnings-amount">
        {formatCurrency(earnings)}
      </h2>

      <p style={{ marginTop: "10px", color: "gray" }}>
        (Only completed rides are included)
      </p>
    </div>
  );
};

export default AdminEarnings;
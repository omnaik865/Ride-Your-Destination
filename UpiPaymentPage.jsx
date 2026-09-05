// src/pages/UpiPaymentPage.jsx
import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import "./Upi.css";

export default function UpiPaymentPage() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: "",
    upiId: "",
    amount: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateUPI = (upi) => {
    const pattern = /^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,}$/;
    return pattern.test(upi);
  };

  const handlePayment = () => {
    const { name, upiId, amount } = form;
    const amt = parseFloat(amount);

    if (!name || !upiId || !amount) {
      setStatus("⚠️ Please fill all fields.");
      return;
    }

    if (!validateUPI(upiId)) {
      setStatus("❌ Invalid UPI ID format.");
      return;
    }

    if (isNaN(amt) || amt <= 0) {
      setStatus("⚠️ Enter a valid amount greater than 0.");
      return;
    }

    setLoading(true);
    setStatus("⏳ Processing payment...");

    setTimeout(() => {
      // ✅ Update Wallet in localStorage
      const walletData = JSON.parse(localStorage.getItem("wallet") || "{}");
      walletData[user.id] = (walletData[user.id] || 0) + amt;
      localStorage.setItem("wallet", JSON.stringify(walletData));

      // ✅ Add transaction record
      const txData = JSON.parse(localStorage.getItem("walletTransactions") || "[]");
      const newTx = {
        id: Date.now(),
        userId: user.id,
        type: "Top Up (UPI)",
        amount: amt,
        date: new Date().toISOString(),
      };
      txData.push(newTx);
      localStorage.setItem("walletTransactions", JSON.stringify(txData));

      setStatus(`✅ Payment of ₹${amt} from ${name} was successful and added to your wallet!`);
      setLoading(false);
      setForm({ name: "", upiId: "", amount: "" });
    }, 1500);
  };

  return (
    <div className="upi-page">
      <div className="upi-card">
        <h2>💳 UPI Payment</h2>

        <input
          type="text"
          name="name"
          value={form.name}
          placeholder="Enter App Name"
          onChange={handleChange}
        />

        <input
          type="text"
          name="upiId"
          value={form.upiId}
          placeholder="Enter UPI ID (e.g. name@upi)"
          onChange={handleChange}
        />

        <input
          type="number"
          name="amount"
          value={form.amount}
          placeholder="Enter Amount (₹)"
          onChange={handleChange}
        />

        <button className="pay-btn" onClick={handlePayment} disabled={loading}>
          {loading ? "Processing..." : "🚀 Pay Now"}
        </button>

        <button className="back-btn" onClick={() => window.history.back()}>
          ⬅️ Back
        </button>

        {status && <p className={`status ${loading ? "loading" : "done"}`}>{status}</p>}
      </div>
    </div>
  );
}
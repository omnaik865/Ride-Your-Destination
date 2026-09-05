// src/pages/Wallet.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import "./Wallet.css";

const Wallet = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  // Load wallet balance and transactions from localStorage
  const loadWallet = () => {
    const walletData = JSON.parse(localStorage.getItem("wallet") || "{}");
    const walletTx = JSON.parse(localStorage.getItem("walletTransactions") || "[]");

    setBalance(walletData[user.id] || 0);
    setTransactions(walletTx.filter((tx) => tx.userId === user.id).sort((a, b) => new Date(b.date) - new Date(a.date)));
  };

  useEffect(() => {
    loadWallet();

    // Listen for localStorage updates (real-time)
    const handleStorageChange = (e) => {
      if (e.key === "wallet" || e.key === "walletTransactions") {
        loadWallet();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [user]);

  return (
    <div className="wallet-page">
      <h1>💼 My Wallet</h1>
      <div className="wallet-balance">
        <h2>Balance: ₹{balance.toFixed(2)}</h2>
        <button onClick={() => navigate("/upipaymentpage")}>➕ Add Money</button>
      </div>

      <h3>Transaction History</h3>
      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <div className="transaction-list">
          {transactions.map((tx) => (
            <div key={tx.id} className="transaction-card">
              <p><strong>{tx.type}</strong></p>
              <p>Amount: ₹{tx.amount.toFixed(2)}</p>
              <p>Date: {new Date(tx.date).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wallet;
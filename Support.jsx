import React from "react";

const Support = () => {
  return (
    <div className="page">
      <h2>Support & Help</h2>
      <div className="support-grid">
        <div className="support-card">❓ FAQs</div>
        <div className="support-card">📞 Contact Us</div>
        <div className="support-card">💰 Refund Policy</div>
        <div className="support-card">⚠️ Safety Guidelines</div>
      </div>
      
      <button className="back-btn" onClick={() => window.history.back()}>
        ⬅️ Back
      </button>
    </div>
  );
};

export default Support;

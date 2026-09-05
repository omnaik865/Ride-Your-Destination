import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AutoBook.css";

const autoOptions = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,

  name: [
    "CityRide Auto",
    "Comfort Auto",
    "Premium Auto",
    "Rapid Auto",
    "Eco Auto",
  ][i % 5] + ` ${i + 1}`,

  type: ["Economy", "Comfort", "Premium"][i % 3],

  // ✅ NEW FIELD (Fuel Type)
  fuel: ["Petrol", "CNG", "Electric", "Diesel"][i % 4],

  price: 18 + (i % 10) * 2,

  image: `https://source.unsplash.com/300x200/?auto,rickshaw&sig=${i}`,

  driver: {
    name: `Driver ${i + 1}`,
    phone: `98${Math.floor(10000000 + Math.random() * 90000000)}`,
    address: ["Mumbai", "Pune", "Delhi", "Bangalore"][i % 4],
    vehicleNo: `MH ${10 + i} AB ${1000 + i}`,
    age: 25 + (i % 15),
    avatar: `https://randomuser.me/api/portraits/men/${i + 10}.jpg`,
  },
}));

const AutoRental = () => {
  const navigate = useNavigate();

  const [selectedDriver, setSelectedDriver] = useState(null);
  const [search, setSearch] = useState("");
  const [fuelFilter, setFuelFilter] = useState("All");

  // 🔥 Fuel Types
  const fuels = ["All", "Petrol", "CNG", "Electric", "Diesel"];

  // 🔍 Filter Logic
  const filteredAutos = autoOptions.filter((auto) => {
    const matchesSearch =
      auto.name.toLowerCase().includes(search.toLowerCase());

    const matchesFuel =
      fuelFilter === "All" || auto.fuel === fuelFilter;

    return matchesSearch && matchesFuel;
  });

  return (
    <div className="auto-book-page">
      <h1>🚖 Find Your Perfect Ride</h1>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search auto..."
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 🔥 FUEL FILTER BUTTONS */}
      <div className="filter-buttons">
        {fuels.map((fuel, index) => (
          <button
            key={index}
            className={`filter-btn ${
              fuelFilter === fuel ? "active-filter" : ""
            }`}
            onClick={() => setFuelFilter(fuel)}
          >
            {fuel === "Petrol" && "⛽"}
            {fuel === "CNG" && "🟢"}
            {fuel === "Electric" && "⚡"}
            {fuel === "Diesel" && "🛢️"}
            {fuel === "All" && "🚖"} {fuel}
          </button>
        ))}
      </div>

      {/* 🚗 CARDS */}
      <div className="card-grid">
        {filteredAutos.map((auto) => (
          <div className="card" key={auto.id}>
            <img src={auto.image} alt={auto.name} className="card-image" />

            <div className="card-info">
              <h3>{auto.name}</h3>
              <p>{auto.type}</p>
              <p><strong>{auto.fuel}</strong></p>
              <p>₹{auto.price} / km</p>

              <div className="card-actions">
                <button
                  className="book-btn"
                  onClick={() => navigate("/book", { state: auto })}
                >
                  Book Now
                </button>

                <button
                  className="info-btn"
                  onClick={() => setSelectedDriver(auto.driver)}
                >
                  ℹ️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 👤 DRIVER MODAL */}
      {selectedDriver && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedDriver(null)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedDriver.avatar}
              alt="driver"
              className="driver-avatar"
            />
            <h2>{selectedDriver.name}</h2>
            <p>Age: {selectedDriver.age}</p>
            <p>Phone: {selectedDriver.phone}</p>
            <p>Address: {selectedDriver.address}</p>
            <p>Vehicle No: {selectedDriver.vehicleNo}</p>

            <button onClick={() => setSelectedDriver(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* 🔙 BACK */}
      <div className="bottom-back-container">
        <button
          className="bottom-back-btn"
          onClick={() => navigate(-1)}
        >
          ⬅ Back
        </button>
      </div>
    </div>
  );
};

export default AutoRental;
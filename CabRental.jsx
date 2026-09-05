import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./CabRental.css";

const cabRentals = [
  {
    id: 1,
    name: "City Cab",
    type: "Economy",
    pricePerDay: 1000,
    rating: 4,
    owner: "Ramesh Kumar",
    phone: "9876543210",
    model: "Maruti Swift 2021",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Comfort Sedan",
    type: "Comfort",
    pricePerDay: 1500,
    rating: 5,
    owner: "Suresh Patel",
    phone: "9123456780",
    model: "Honda City 2022",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3,
    name: "Premium SUV",
    type: "Premium",
    pricePerDay: 2200,
    rating: 4,
    owner: "Amit Singh",
    phone: "9988776655",
    model: "Toyota Fortuner 2023",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    name: "Mini Hatchback",
    type: "Budget",
    pricePerDay: 900,
    rating: 3,
    owner: "Anil Verma",
    phone: "9871234560",
    model: "Hyundai i10 2020",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
  },
];

const CabRental = () => {
  const navigate = useNavigate();

  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("default");
  const [search, setSearch] = useState("");
  const [days, setDays] = useState(1);

  // ✅ Get unique types
  const types = useMemo(() => {
    return ["All", ...new Set(cabRentals.map((c) => c.type))];
  }, []);

  // ✅ Calculate total fare
  const calculateFare = (pricePerDay) => {
    return pricePerDay * days;
  };

  // ✅ Filter + Search + Sort
  const filteredCabs = useMemo(() => {
    let data = [...cabRentals];

    if (filter !== "All") {
      data = data.filter((c) => c.type === filter);
    }

    if (search) {
      data = data.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.type.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "low") {
      data.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (sort === "high") {
      data.sort((a, b) => b.pricePerDay - a.pricePerDay);
    }

    return data;
  }, [filter, search, sort]);

  return (
    <div className="cab-container">
      <h1>🚖 Rent a Cab</h1>

      {/* 🔢 DAYS INPUT */}
      <div className="days-input">
        <label>Days: </label>
        <input
          type="number"
          min="1"
          value={days}
          onChange={(e) => setDays(Math.max(1, Number(e.target.value)))}
        />
      </div>

      {/* 🔍 SEARCH */}
      <input
        className="search"
        type="text"
        placeholder="Search cab..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 🎛 CONTROLS */}
      <div className="controls">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="default">Sort</option>
          <option value="low">💰 Price: Low → High</option>
          <option value="high">💰 Price: High → Low</option>
        </select>
      </div>

      {/* 🧱 GRID */}
      <div className="grid">
        {filteredCabs.length > 0 ? (
          filteredCabs.map((cab) => (
            <div className="card" key={cab.id}>
              <h3>{cab.name}</h3>
              <p>{cab.type}</p>

              <h4>₹{calculateFare(cab.pricePerDay)} total</h4>
              <p className="per-day">₹{cab.pricePerDay} / day</p>

              {/* ⭐ Rating */}
              <div className="rating">
                {"⭐".repeat(cab.rating)}
              </div>

              {/* 👤 DRIVER */}
              <div className="driver-info">
                <img
                  src={cab.avatar}
                  alt="driver"
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/100?text=Driver")
                  }
                />
                <div>
                  <p><strong>{cab.owner}</strong></p>
                  <p>{cab.model}</p>
                  <p>📞 {cab.phone}</p>
                </div>
              </div>

              {/* 🚀 BOOK */}
              <button
                className="book-btn"
                onClick={() =>
                  navigate("/book-cab", {
                    state: {
                      ...cab,
                      days,
                      totalFare: calculateFare(cab.pricePerDay),
                    },
                  })
                }
              >
                Book Now
              </button>
            </div>
          ))
        ) : (
          <p className="no-data">No cabs found 😢</p>
        )}
      </div>

      {/* 🔙 BACK */}
      <div className="back-container">
        <button onClick={() => navigate(-1)}>⬅ Back</button>
      </div>
    </div>
  );
};

export default CabRental;
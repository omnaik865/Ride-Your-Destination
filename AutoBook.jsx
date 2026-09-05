import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./AutoBook.css";

// ✅ 15 Fixed Images
const autoImages = [
  "https://images.pexels.com/photos/9796463/pexels-photo-9796463.jpeg",
  "https://images.pexels.com/photos/10074106/pexels-photo-10074106.jpeg",
  "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg",
  "https://images.pexels.com/photos/2365572/pexels-photo-2365572.jpeg",
  "https://images.pexels.com/photos/210182/pexels-photo-210182.jpeg",
  "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
  "https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg",
  "https://images.pexels.com/photos/248547/pexels-photo-248547.jpeg",
  "https://images.pexels.com/photos/315938/pexels-photo-315938.jpeg",
  "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg",
  "https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg",
  "https://images.pexels.com/photos/1580173/pexels-photo-1580173.jpeg",
  "https://images.pexels.com/photos/167700/pexels-photo-167700.jpeg",
  "https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg",
  "https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg",
];

// 🚖 15 Autos
const autoOptions = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,

  name:
    ["Bajaj RE", "TVS King", "Mahindra Treo", "Piaggio Ape", "Atul Shakti"][
      i % 5
    ] + ` ${i + 1}`,

  type: ["Petrol Auto", "CNG Auto", "Electric Auto", "Diesel Auto"][i % 4],

  price: `₹${15 + (i % 6)} / km`,

  image: autoImages[i], // ✅ fixed image

  driver: {
    name: `Driver ${i + 1}`,
    age: 25 + (i % 10),
    phone: `98${Math.floor(10000000 + Math.random() * 90000000)}`,
    address: "Pune",
    rating: `${(4 + (i % 5) / 10).toFixed(1)} ⭐`,
    autoNumber: `MH12AB${1000 + i}`,
    avatar: `https://randomuser.me/api/portraits/men/${i + 10}.jpg`,
  },
}));

const AutoBook = () => {
  const navigate = useNavigate();

  const [selectedDriver, setSelectedDriver] = useState(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [sortOption, setSortOption] = useState("");

  const types = useMemo(
    () => ["All", ...new Set(autoOptions.map((a) => a.type))],
    []
  );

  const getPriceValue = (price) =>
    parseInt(price.replace("₹", "").replace(" / km", ""));

  const getRatingValue = (rating) => parseFloat(rating);

  const sortedAutos = useMemo(() => {
    let filtered = autoOptions.filter((auto) => {
      return (
        (filterType === "All" || auto.type === filterType) &&
        (auto.name.toLowerCase().includes(search.toLowerCase()) ||
          auto.type.toLowerCase().includes(search.toLowerCase()))
      );
    });

    return filtered.sort((a, b) => {
      switch (sortOption) {
        case "priceLow":
          return getPriceValue(a.price) - getPriceValue(b.price);
        case "priceHigh":
          return getPriceValue(b.price) - getPriceValue(a.price);
        case "nameAZ":
          return a.name.localeCompare(b.name);
        case "ratingHigh":
          return (
            getRatingValue(b.driver.rating) -
            getRatingValue(a.driver.rating)
          );
        default:
          return 0;
      }
    });
  }, [search, filterType, sortOption]);

  return (
    <div className="auto-book-page">
      <h1>🚖 Book Your Auto</h1>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search auto..."
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FILTER */}
      <div className="filter-buttons">
        {types.map((type, i) => (
          <button
            key={i}
            className={`filter-btn ${
              filterType === type ? "active-filter" : ""
            }`}
            onClick={() => setFilterType(type)}
          >
            {type === "All" && "🚖"}
            {type === "Petrol Auto" && "⛽"}
            {type === "CNG Auto" && "🟢"}
            {type === "Electric Auto" && "⚡"}
            {type === "Diesel Auto" && "🛢️"} {type}
          </button>
        ))}
      </div>

      {/* SORT */}
      <div className="sort-section">
        <select
          className="sort-dropdown"
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="priceLow">💰 Low → High</option>
          <option value="priceHigh">💰 High → Low</option>
          <option value="nameAZ">🔤 A → Z</option>
          <option value="ratingHigh">⭐ Rating</option>
        </select>
      </div>

      {/* CARDS */}
      <div className="card-grid">
        {sortedAutos.map((auto) => (
          <div key={auto.id} className="card">
            <img src={auto.image} alt={auto.name} className="card-image" />

            <div className="card-info">
              <h3>{auto.name}</h3>
              <p>{auto.type}</p>
              <p>{auto.price}</p>

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

      {/* BACK */}
      <div className="bottom-back-container">
        <button className="bottom-back-btn" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
      </div>

      {/* MODAL */}
      {selectedDriver && (
        <div className="modal-overlay" onClick={() => setSelectedDriver(null)}>
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
            <p>Rating: {selectedDriver.rating}</p>
            <p>Auto No: {selectedDriver.autoNumber}</p>

            <button onClick={() => setSelectedDriver(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutoBook;
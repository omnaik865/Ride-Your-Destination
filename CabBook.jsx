import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CabBook.css";

const cabOptions = [
  {
    id: 1,
    name: "Mini Cab",
    type: "Economy",
    price: "₹50 / km",
    image: "https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg",
    driver: {
      name: "Ramesh Kumar",
      age: 34,
      phone: "9876543210",
      address: "Andheri East, Mumbai",
      rating: "4.8 ⭐",
      carNumber: "MH 12 AB 1234",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  },
  {
    id: 2,
    name: "Sedan",
    type: "Comfort",
    price: "₹80 / km",
    image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
    driver: {
      name: "Suresh Patil",
      age: 41,
      phone: "9123456780",
      address: "Wakad, Pune",
      rating: "4.6 ⭐",
      carNumber: "MH 14 XY 5678",
      avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    },
  },
  {
    id: 3,
    name: "SUV",
    type: "Premium",
    price: "₹120 / km",
    image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg",
    driver: {
      name: "Amit Sharma",
      age: 38,
      phone: "9988776655",
      address: "Sector 62, Noida",
      rating: "4.9 ⭐",
      carNumber: "DL 01 ZC 9087",
      avatar: "https://randomuser.me/api/portraits/men/68.jpg",
    },
  },

  // -------- 12 MORE CABS --------

  {
    id: 4,
    name: "Mini Cab",
    type: "Economy",
    price: "₹55 / km",
    image: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg",
    driver: {
      name: "Vikas Singh",
      age: 29,
      phone: "9012345678",
      address: "Indiranagar, Bangalore",
      rating: "4.7 ⭐",
      carNumber: "KA 05 MN 2233",
      avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    },
  },
  {
    id: 5,
    name: "Sedan",
    type: "Comfort",
    price: "₹85 / km",
    image: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
    driver: {
      name: "Rahul Mehta",
      age: 36,
      phone: "8899776655",
      address: "Navrangpura, Ahmedabad",
      rating: "4.5 ⭐",
      carNumber: "GJ 01 BC 8899",
      avatar: "https://randomuser.me/api/portraits/men/25.jpg",
    },
  },
  {
    id: 6,
    name: "SUV",
    type: "Premium",
    price: "₹130 / km",
    image: "https://images.pexels.com/photos/193991/pexels-photo-193991.jpeg",
    driver: {
      name: "Deepak Yadav",
      age: 42,
      phone: "7788996655",
      address: "Gurgaon Sector 21",
      rating: "4.8 ⭐",
      carNumber: "HR 26 DJ 4455",
      avatar: "https://randomuser.me/api/portraits/men/51.jpg",
    },
  },
  {
    id: 7,
    name: "Mini Cab",
    type: "Economy",
    price: "₹52 / km",
    image: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
    driver: {
      name: "Sunil Joshi",
      age: 31,
      phone: "9345678123",
      address: "Ujjain, MP",
      rating: "4.6 ⭐",
      carNumber: "MP 13 QW 7788",
      avatar: "https://randomuser.me/api/portraits/men/19.jpg",
    },
  },
  {
    id: 8,
    name: "Sedan",
    type: "Comfort",
    price: "₹78 / km",
    image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
    driver: {
      name: "Kunal Verma",
      age: 35,
      phone: "9998887776",
      address: "Rohini, Delhi",
      rating: "4.7 ⭐",
      carNumber: "DL 10 AB 1122",
      avatar: "https://randomuser.me/api/portraits/men/77.jpg",
    },
  },
  {
    id: 9,
    name: "SUV",
    type: "Premium",
    price: "₹140 / km",
    image: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg",
    driver: {
      name: "Naveen Rao",
      age: 39,
      phone: "8877665544",
      address: "Banjara Hills, Hyderabad",
      rating: "4.9 ⭐",
      carNumber: "TS 09 XY 9090",
      avatar: "https://randomuser.me/api/portraits/men/88.jpg",
    },
  },
  {
    id: 10,
    name: "Mini Cab",
    type: "Economy",
    price: "₹48 / km",
    image: "https://images.pexels.com/photos/193991/pexels-photo-193991.jpeg",
    driver: {
      name: "Manoj Das",
      age: 28,
      phone: "9011223344",
      address: "Cuttack, Odisha",
      rating: "4.4 ⭐",
      carNumber: "OD 05 AS 3344",
      avatar: "https://randomuser.me/api/portraits/men/9.jpg",
    },
  },
  {
    id: 11,
    name: "Sedan",
    type: "Comfort",
    price: "₹82 / km",
    image: "https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg",
    driver: {
      name: "Pradeep Jain",
      age: 45,
      phone: "9822113344",
      address: "Udaipur, Rajasthan",
      rating: "4.6 ⭐",
      carNumber: "RJ 27 KK 5566",
      avatar: "https://randomuser.me/api/portraits/men/61.jpg",
    },
  },
  {
    id: 12,
    name: "SUV",
    type: "Premium",
    price: "₹150 / km",
    image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg",
    driver: {
      name: "Harish Nair",
      age: 40,
      phone: "9744553322",
      address: "Kochi, Kerala",
      rating: "4.9 ⭐",
      carNumber: "KL 07 LM 7788",
      avatar: "https://randomuser.me/api/portraits/men/93.jpg",
    },
  },
  {
    id: 13,
    name: "Mini Cab",
    type: "Economy",
    price: "₹49 / km",
    image: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg",
    driver: {
      name: "Rohit Pal",
      age: 27,
      phone: "9090909090",
      address: "Durgapur, WB",
      rating: "4.5 ⭐",
      carNumber: "WB 40 CC 1234",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    },
  },
  {
    id: 14,
    name: "Sedan",
    type: "Comfort",
    price: "₹90 / km",
    image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
    driver: {
      name: "Anil Kapoor",
      age: 46,
      phone: "9898989898",
      address: "Juhu, Mumbai",
      rating: "4.8 ⭐",
      carNumber: "MH 02 ZZ 8888",
      avatar: "https://randomuser.me/api/portraits/men/73.jpg",
    },
  },
  {
    id: 15,
    name: "SUV",
    type: "Premium",
    price: "₹160 / km",
    image: "https://images.pexels.com/photos/193991/pexels-photo-193991.jpeg",
    driver: {
      name: "Akash Roy",
      age: 37,
      phone: "9765432100",
      address: "Salt Lake, Kolkata",
      rating: "5.0 ⭐",
      carNumber: "WB 06 RR 9999",
      avatar: "https://randomuser.me/api/portraits/men/56.jpg",
    },
  },
];
const CabBook = () => {
  const navigate = useNavigate();
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [filterType, setFilterType] = useState("All");
  const [sortOption, setSortOption] = useState("default");

  const getNumericPrice = (price) => {
    return parseInt(price.replace("₹", "").replace(" / km", ""));
  };

  // Filter
  let filteredCabs =
    filterType === "All"
      ? cabOptions
      : cabOptions.filter((cab) => cab.type === filterType);

  // Sort
  if (sortOption === "lowToHigh") {
    filteredCabs = [...filteredCabs].sort(
      (a, b) => getNumericPrice(a.price) - getNumericPrice(b.price)
    );
  }

  return (
    <div className="cab-book-page">
      <h1>🚖 Book Your Cab</h1>

      {/* FILTER + SORT */}
      <div className="filter-sort-container">
        <div>
          <label>Filter by Type: </label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Economy">Economy</option>
            <option value="Comfort">Comfort</option>
            <option value="Premium">Premium</option>
          </select>
        </div>

        <div>
          <label>Sort by Price: </label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="lowToHigh">Minimum Price</option>
          </select>
        </div>
      </div>

      {/* CAB CARDS */}
      <div className="card-grid">
        {filteredCabs.map((cab) => (
          <div className="card" key={cab.id}>
            <img src={cab.image} alt={cab.name} className="card-image" />

            <div className="card-info">
              <h3>{cab.name}</h3>
              <p>{cab.type}</p>
              <p className="card-price">{cab.price}</p>

              <div className="card-buttons">
                <button
                  className="info-btn"
                  onClick={() => setSelectedDriver(cab.driver)}
                >
                  ℹ️ Driver Info
                </button>

                <button
                  className="book-btn"
                  onClick={() => navigate("/book")}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

     {/* BACK BUTTON AT BOTTOM */}
<div className="bottom-back-container">
  <button
    className="bottom-back-btn"
    onClick={() => navigate(-1)}
  >
    ⬅ Back
  </button>
</div>

      {/* DRIVER MODAL */}
      {selectedDriver && (
        <div className="modal-overlay">
          <div className="modal">
            <img
              src={selectedDriver.avatar}
              alt="Driver"
              className="driver-avatar"
            />
            <h2>{selectedDriver.name}</h2>
            <p><strong>Age:</strong> {selectedDriver.age}</p>
            <p><strong>Phone:</strong> {selectedDriver.phone}</p>
            <p><strong>Address:</strong> {selectedDriver.address}</p>
            <p><strong>Rating:</strong> {selectedDriver.rating}</p>
            <p><strong>Car No:</strong> {selectedDriver.carNumber}</p>

            <button
              className="close-btn"
              onClick={() => setSelectedDriver(null)}
            >
              ❌ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CabBook;
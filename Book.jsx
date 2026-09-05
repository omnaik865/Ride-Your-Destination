// src/pages/BookingPage.jsx
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import IndianLocations from "../Data/IndianLocations";
import "./Book.css";

const carIcon = new L.DivIcon({ html: "🚖", className: "vehicle-icon" });
const autoIcon = new L.DivIcon({ html: "🛺", className: "vehicle-icon" });
const bikeIcon = new L.DivIcon({ html: "🏍️", className: "vehicle-icon" });
const busIcon = new L.DivIcon({ html: "🚌", className: "vehicle-icon" });

const AutoZoom = ({ pickupLoc, dropLoc }) => {
  const map = useMap();
  useEffect(() => {
    if (pickupLoc && dropLoc) {
      map.fitBounds([
        [pickupLoc.lat, pickupLoc.lng],
        [dropLoc.lat, dropLoc.lng],
      ]);
    }
  }, [pickupLoc, dropLoc]);
  return null;
};

const BookingPage = () => {
  const { addBooking, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const vehicleQuery = query.get("vehicle") || "car";

  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [pickupLoc, setPickupLoc] = useState(null);
  const [dropLoc, setDropLoc] = useState(null);
  const [vehicle, setVehicle] = useState(vehicleQuery);
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [fare, setFare] = useState(0);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropSuggestions, setDropSuggestions] = useState([]);
  const [walletBalance, setWalletBalance] = useState(0);

  // Load wallet
  useEffect(() => {
    const walletData = JSON.parse(localStorage.getItem("wallet") || "{}");
    setWalletBalance(walletData[user.id] || 0);
  }, [user]);

  const handleInputChange = (value, type) => {
    const filtered = IndianLocations.filter((loc) =>
      loc.name.toLowerCase().includes(value.toLowerCase())
    ).slice(0, 8);

    if (type === "pickup") {
      setPickup(value);
      setPickupSuggestions(filtered);
    } else {
      setDrop(value);
      setDropSuggestions(filtered);
    }
  };

  const handleSuggestionClick = (loc, type) => {
    if (type === "pickup") {
      setPickup(loc.name);
      setPickupLoc(loc);
      setPickupSuggestions([]);
    } else {
      setDrop(loc.name);
      setDropLoc(loc);
      setDropSuggestions([]);
    }
  };

  const calculateRide = (dist) => {
    let speed = 100, rate = 10;
    if (vehicle === "car") speed = 110, rate = 17;
    else if (vehicle === "auto") speed = 80, rate = 12;
    else if (vehicle === "bike") speed = 60, rate = 8;
    else speed = 70, rate = 15;

    const hours = dist / speed;
    setTime(hours.toFixed(2));
    setFare((dist * rate).toFixed(2));
  };

  useEffect(() => {
    if (pickupLoc && dropLoc) {
      const R = 6371;
      const dLat = ((dropLoc.lat - pickupLoc.lat) * Math.PI) / 180;
      const dLng = ((dropLoc.lng - pickupLoc.lng) * Math.PI) / 180;

      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((pickupLoc.lat * Math.PI) / 180) *
          Math.cos((dropLoc.lat * Math.PI) / 180) *
          Math.sin(dLng / 2) ** 2;

      const dist = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      setDistance(dist.toFixed(2));
      calculateRide(dist);
    }
  }, [pickupLoc, dropLoc, vehicle]);

  const getIcon = () => {
    if (vehicle === "car") return carIcon;
    if (vehicle === "auto") return autoIcon;
    if (vehicle === "bike") return bikeIcon;
    return busIcon;
  };

  const handleBooking = () => {
    if (!pickupLoc || !dropLoc) {
      alert("Please select valid pickup and drop locations.");
      return;
    }

    if (fare > walletBalance) {
      alert(`❌ Insufficient wallet balance. Your balance is ₹${walletBalance}. Please top up!`);
      navigate("/wallet");
      return;
    }

    const bookingId = Date.now();
    const newBooking = {
      id: bookingId,
      userId: user.id,
      vehicle:
        vehicle === "car" ? "Cab" : vehicle === "auto" ? "Auto" : vehicle === "bike" ? "Bike" : "Bus",
      pickup,
      dropoff: drop,
      distance: distance + " km",
      duration: time + " hours",
      fare: "₹" + fare,
      status: "Upcoming",
      driverId: null,
      createdAt: new Date().toISOString(),
    };

    // Deduct fare from wallet
    const walletData = JSON.parse(localStorage.getItem("wallet") || "{}");
    walletData[user.id] = (walletData[user.id] || 0) - fare;
    localStorage.setItem("wallet", JSON.stringify(walletData));
    setWalletBalance(walletData[user.id]);

    // Save booking
    const allRides = JSON.parse(localStorage.getItem("tripHistory") || "[]");
    allRides.push(newBooking);
    localStorage.setItem("tripHistory", JSON.stringify(allRides));
    addBooking(newBooking);

    // Driver notification
    const driverNotifications = JSON.parse(localStorage.getItem("driverNotifications") || "[]");
    driverNotifications.push({
      id: bookingId,
      userId: user.id,
      message: `New ride booked from ${pickup} to ${drop}`,
      seen: false,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("driverNotifications", JSON.stringify(driverNotifications));

    alert(`🎉 Ride booked successfully! ₹${fare} has been deducted from your wallet.`);
  };

  return (
    <div className="booking-container">
      <h1 className="page-title">🚗 Book Your Ride</h1>

      <div className="input-section">
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter Pickup Location"
            value={pickup}
            onChange={(e) => handleInputChange(e.target.value, "pickup")}
          />
          {pickupSuggestions.length > 0 && (
            <div className="suggestions-box">
              {pickupSuggestions.map((loc, i) => (
                <div key={i} onClick={() => handleSuggestionClick(loc, "pickup")}>
                  📍 {loc.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="Enter Drop Location"
            value={drop}
            onChange={(e) => handleInputChange(e.target.value, "drop")}
          />
          {dropSuggestions.length > 0 && (
            <div className="suggestions-box">
              {dropSuggestions.map((loc, i) => (
                <div key={i} onClick={() => handleSuggestionClick(loc, "drop")}>
                  📍 {loc.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="vehicle-options">
          <button className={vehicle === "car" ? "active" : ""} onClick={() => setVehicle("car")}>🚖 Cab</button>
          <button className={vehicle === "auto" ? "active" : ""} onClick={() => setVehicle("auto")}>🛺 Auto</button>
          <button className={vehicle === "bike" ? "active" : ""} onClick={() => setVehicle("bike")}>🏍️ Bike</button>
          <button className={vehicle === "bus" ? "active" : ""} onClick={() => setVehicle("bus")}>🚌 Bus</button>
        </div>
      </div>

      <div className="map-section">
        <MapContainer center={[19.076, 72.8777]} zoom={6} style={{ height: "400px", width: "100%", borderRadius: "10px" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <AutoZoom pickupLoc={pickupLoc} dropLoc={dropLoc} />
          {pickupLoc && <Marker position={[pickupLoc.lat, pickupLoc.lng]} icon={getIcon()} />}
          {dropLoc && <Marker position={[dropLoc.lat, dropLoc.lng]} icon={getIcon()} />}
          {pickupLoc && dropLoc && (
            <Polyline positions={[[pickupLoc.lat, pickupLoc.lng], [dropLoc.lat, dropLoc.lng]]} color="blue" />
          )}
        </MapContainer>
      </div>

      {distance > 0 && (
        <div className="ride-summary">
          <p>📏 Distance: {distance} km</p>
          <p>⏱ Time: {time} hours</p>
          <p>💰 Fare: ₹{fare}</p>
          <p>💼 Wallet Balance: ₹{walletBalance.toFixed(2)}</p>
          <button className="book-btn" onClick={handleBooking}>
            ✅ Confirm Booking
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
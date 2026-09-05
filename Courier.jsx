import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import IndianLocations from "../Data/IndianLocations";
import "./Courier.css";
import CourierTracking from "./CourierTracking";

// Custom courier icons
const courierIcons = {
  bus: new L.DivIcon({ html: "🚌", className: "emoji-icon" }),
  van: new L.DivIcon({ html: "🚐", className: "emoji-icon" }),
  truck: new L.DivIcon({ html: "🚚", className: "emoji-icon" }),
};

// Auto-fit map bounds
const FitBounds = ({ pickup, dropoff }) => {
  const map = useMap();
  useEffect(() => {
    if (pickup && dropoff) {
      const bounds = L.latLngBounds([pickup, dropoff]);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [pickup, dropoff, map]);
  return null;
};

const CourierPage = () => {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropCoords, setDropCoords] = useState(null);
  const [distance, setDistance] = useState(null);
  const [price, setPrice] = useState(null);
  const [time, setTime] = useState(null);
  const [isMoving, setIsMoving] = useState(false);
  const [courierPos, setCourierPos] = useState(null);
  const [progress, setProgress] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [activeInput, setActiveInput] = useState("");
  const [tripCompleted, setTripCompleted] = useState(false);
  const mapRef = useRef(null);
  const [bwMap, setBwMap] = useState(false); // Black and white map

  // Handle input suggestions
  const handleInputChange = (value, type) => {
    type === "pickup" ? setPickup(value) : setDrop(value);
    setActiveInput(type);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = IndianLocations.filter((loc) =>
      loc.name.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filtered.slice(0, 6));
  };

  const handleSelectSuggestion = (city) => {
    if (activeInput === "pickup") {
      setPickup(city.name);
      setPickupCoords([city.lat, city.lng]);
    } else {
      setDrop(city.name);
      setDropCoords([city.lat, city.lng]);
    }
    setSuggestions([]);
  };

  // Distance & fare calculation
  const calculateDistance = (c1, c2) => {
    const R = 6371;
    const dLat = ((c2[0] - c1[0]) * Math.PI) / 180;
    const dLng = ((c2[1] - c1[1]) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(c1[0] * (Math.PI / 180)) *
        Math.cos(c2[0] * (Math.PI / 180)) *
        Math.sin(dLng / 2) ** 2;
    return (R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)))).toFixed(2);
  };

  const calculateFare = (vehicleType, c1, c2) => {
    if (!c1 || !c2 || !vehicleType) return;
    const dist = calculateDistance(c1, c2);
    setDistance(dist);
    const rates = { bus: 25, van: 18, truck: 35 };
    const speeds = { bus: 60, van: 70, truck: 50 };
    setPrice((dist * rates[vehicleType]).toFixed(2));
    setTime((dist / speeds[vehicleType]).toFixed(2));
  };

  const handleCalculate = () => {
    if (!pickupCoords || !dropCoords || !vehicle)
      return alert("Please enter valid pickup, drop and vehicle.");
    calculateFare(vehicle, pickupCoords, dropCoords);
  };

  const handleVehicleChange = (value) => {
    setVehicle(value);
    if (pickupCoords && dropCoords) calculateFare(value, pickupCoords, dropCoords);
  };

  // Start courier movement
  const handleBook = () => {
    if (!distance || !price) return;
    alert(`📦 Courier booked successfully! Total Fare: ₹${price}`);
    setIsMoving(true);
    setTripCompleted(false);
    setProgress(0);
    setCourierPos(pickupCoords);
    setBwMap(false);
    setTimeout(() => {
      mapRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  // Animate courier
  useEffect(() => {
    if (!isMoving || !pickupCoords || !dropCoords) return;
    let interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 0.02;
        if (next >= 1) {
          clearInterval(interval);
          setIsMoving(false);
          setTripCompleted(true);
          setCourierPos(dropCoords);
          setBwMap(true); // Activate black & white map
          alert("✅ Courier reached destination!");
          return 1;
        }
        const lat = pickupCoords[0] + (dropCoords[0] - pickupCoords[0]) * next;
        const lng = pickupCoords[1] + (dropCoords[1] - pickupCoords[1]) * next;
        setCourierPos([lat, lng]);
        return next;
      });
    }, 500);
    return () => clearInterval(interval);
  }, [isMoving, pickupCoords, dropCoords]);

  const handleNewDelivery = () => {
    setPickup("");
    setDrop("");
    setVehicle("");
    setPickupCoords(null);
    setDropCoords(null);
    setDistance(null);
    setPrice(null);
    setTime(null);
    setCourierPos(null);
    setProgress(0);
    setTripCompleted(false);
    setBwMap(false);
  };

  return (
    <div className="courier-page">
      <h1 className="page-title">🚚 Ride Your Destination - Courier Service</h1>

      <div className="booking-form">
        <label>Pickup Location</label>
        <input
          type="text"
          value={pickup}
          onChange={(e) => handleInputChange(e.target.value, "pickup")}
          placeholder="Enter pickup city"
          onFocus={() => setActiveInput("pickup")}
        />
        {activeInput === "pickup" && suggestions.length > 0 && (
          <ul className="suggestion-box">
            {suggestions.map((city, i) => (
              <li key={i} onClick={() => handleSelectSuggestion(city)}>
                📍 {city.name}
              </li>
            ))}
          </ul>
        )}

        <label>Drop Location</label>
        <input
          type="text"
          value={drop}
          onChange={(e) => handleInputChange(e.target.value, "drop")}
          placeholder="Enter drop city"
          onFocus={() => setActiveInput("drop")}
        />
        {activeInput === "drop" && suggestions.length > 0 && (
          <ul className="suggestion-box">
            {suggestions.map((city, i) => (
              <li key={i} onClick={() => handleSelectSuggestion(city)}>
                🏠 {city.name}
              </li>
            ))}
          </ul>
        )}

        <label>Select Vehicle</label>
        <select value={vehicle} onChange={(e) => handleVehicleChange(e.target.value)}>
          <option value="">-- Choose Vehicle --</option>
          <option value="bus">🚌 Bus</option>
          <option value="van">🚐 Van</option>
          <option value="truck">🚚 Truck</option>
        </select>

        <button onClick={handleCalculate} className="btn-calc">
          Calculate Fare
        </button>

        {distance && price && (
          <div className="fare-box">
            <p>Distance: {distance} km</p>
            <p>Fare: ₹{price}</p>
            <p>Estimated Time: {time} hrs</p>

            <button onClick={handleBook} className="btn-book">
              Book & Ride Now
            </button>
          </div>
        )}
      </div>

      {/* Map Section */}
      <div className="map-section" ref={mapRef}>
        <MapContainer
          center={pickupCoords || [20.5937, 78.9629]}
          zoom={6.5}
          style={{ height: "350px", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url={
              bwMap
                ? "https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png" // Black & white map
                : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            }
          />

          {pickupCoords && <Marker position={pickupCoords} icon={new L.DivIcon({ html: "📦", className: "emoji-icon" })} />}
          {dropCoords && <Marker position={dropCoords} icon={new L.DivIcon({ html: "🏠", className: "emoji-icon" })} />}
          {pickupCoords && dropCoords && <Polyline positions={[pickupCoords, dropCoords]} color="yellow" />}
          {courierPos && <Marker position={courierPos} icon={courierIcons[vehicle] || courierIcons.van}>
            <Popup>Courier en route...</Popup>
          </Marker>}

          <FitBounds pickup={pickupCoords} dropoff={dropCoords} />
        </MapContainer>
      </div>

      {/* Progress */}
      {isMoving && (
        <div className="progress-section">
          <div className="progress-text">
            Courier is {Math.floor(progress * 100)}% to destination
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress * 100}%` }}></div>
          </div>
        </div>
      )}

      {/* New Delivery */}
      {tripCompleted && (
        <div className="new-delivery-section">
          <h3>🎉 Delivery Completed!</h3>
          <button onClick={handleNewDelivery} className="btn-new">
            Start New Delivery
          </button>
        </div>
      )}

      {/* Courier Tracking (Optional Detailed Tracking) */}
      {pickupCoords && dropCoords && <CourierTracking selected={{ pickup, dropoff: drop }} />}
    </div>
  );
};

export default CourierPage;

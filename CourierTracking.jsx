import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import IndianLocations from "../Data/IndianLocations";
import "./CourierTracking.css";

// Fix missing marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Auto-zoom helper
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

const CourierTracking = ({ selected }) => {
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropoffCoords, setDropoffCoords] = useState(null);
  const [reached, setReached] = useState(false);

  // Get coordinates from IndianLocations
  const fetchCoordinates = (place, setCoords) => {
    if (!place) return;
    const loc = IndianLocations.find(
      (item) => item.name.toLowerCase() === place.toLowerCase()
    );
    if (loc) setCoords([loc.lat, loc.lng]);
  };

  useEffect(() => {
    if (selected) {
      fetchCoordinates(selected.pickup, setPickupCoords);
      fetchCoordinates(selected.dropoff, setDropoffCoords);
      setReached(false);
    }
  }, [selected]);

  // Simulate courier movement
  useEffect(() => {
    if (!pickupCoords || !dropoffCoords) return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += 0.02;
      if (progress >= 1) {
        setReached(true);
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [pickupCoords, dropoffCoords]);

  if (!selected) return <p className="tracking-placeholder">📦 Select a courier to track</p>;

  return (
    <div className="live-tracking">
      <h3>📍 Route: {selected.pickup} → {selected.dropoff}</h3>

      {pickupCoords && dropoffCoords ? (
        <MapContainer
          style={{ height: "300px", borderRadius: "14px" }}
          zoom={12}
          center={pickupCoords}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <Marker position={pickupCoords}>
            <Popup>Pickup: {selected.pickup}</Popup>
          </Marker>

          <Marker position={dropoffCoords}>
            <Popup>Drop-off: {selected.dropoff}</Popup>
          </Marker>

          <Polyline positions={[pickupCoords, dropoffCoords]} color="blue" />

          <FitBounds pickup={pickupCoords} dropoff={dropoffCoords} />
        </MapContainer>
      ) : (
        <p className="tracking-placeholder">⏳ Fetching live location…</p>
      )}

      {reached && (
        <div className="reached-banner">
          ✅ Courier has reached the destination!
        </div>
      )}
    </div>
  );
};

export default CourierTracking;

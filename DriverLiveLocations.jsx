// src/Driver/DriverLiveLocation.jsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Custom marker icon
const driverIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61168.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

const DriverLiveLocation = () => {
  const [position, setPosition] = useState([19.076, 72.8777]); // Default: Mumbai coords

  useEffect(() => {
    // Watch position continuously
    if (navigator.geolocation) {
      const watcher = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
        },
        (err) => {
          console.error("Geolocation error:", err);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 10000,
          timeout: 5000,
        }
      );

      // Cleanup
      return () => navigator.geolocation.clearWatch(watcher);
    }
  }, []);

  return (
    <div>
      <h2>Driver Live Location</h2>
      <MapContainer center={position} zoom={13} className="leaflet-container">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <Marker position={position} icon={driverIcon}>
          <Popup>Your current location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default DriverLiveLocation;

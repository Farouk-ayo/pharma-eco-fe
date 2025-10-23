"use client";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Define Location Type
type Location = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
};

interface MapProps {
  center: [number, number];
  locations: Location[];
}

// Fix default marker icon issue in Leaflet with Next.js
const defaultIcon = L.icon({
  iconUrl: "/marker-icon.svg", // Make sure to have this file in the public folder
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const MapInner: React.FC<MapProps> = ({ center, locations }) => {
  return (
    <MapContainer
      center={center}
      className="w-full h-full rounded-lg"
      zoom={8}
      // zoomControl={false}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      {/* User-searched location */}
      <Marker position={center} icon={defaultIcon}>
        <Popup>Your selected location</Popup>
      </Marker>

      {/* Display dynamic locations */}
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.lat, location.lng]}
          icon={defaultIcon}
        >
          <Popup>
            <strong>{location.name}</strong>
            <br />
            {location.address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapInner;

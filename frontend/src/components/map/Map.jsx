import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./Map.css";
import "leaflet/dist/leaflet.css";
import Pin from "../pin/Pin";

import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "./playground.png",
  iconSize: [41, 41],
  className: "custom-marker-icon",
});

const Map = ({ items }) => {
  return (
    <MapContainer
      center={[51.049999, -114.066666]}
      zoom={7}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => (
        <Pin item={item} key={item.id} customIcon={customIcon} />
      ))}
    </MapContainer>
  );
};

export default Map;

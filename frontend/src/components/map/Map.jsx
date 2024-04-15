import React, { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Polygon,
  ZoomControl,
  LayersControl,
} from "react-leaflet";
import "./Map.css";
import "leaflet/dist/leaflet.css";
import Pin from "../pin/Pin";

import L from "leaflet";
import { jakarta } from "../../Playground";

const customIcon = new L.Icon({
  iconUrl: "./playground.png",
  iconSize: [41, 41],
  className: "custom-marker-icon",
});

const calgary = [51.0478, 114.0593];

const Map = ({ items }) => {
  const mapRef = useRef();
  const [coordinates, setCoordinates] = useState([]);
  useEffect(() => {
    setCoordinates(jakarta.map((row) => [row[1], row[0]]));
  }, []);

  useEffect(() => {
    const { current } = mapRef;

    if (current) {
      const { LeafletElement: map } = current;

      setTimeout(() => {
        map.flyTo(calgary, 14, {
          duration: 3,
        });
      }, 1000);
    }
  }, [mapRef]);

  const { BaseLayer } = LayersControl;
  return (
    <MapContainer
      center={[51.049999, -114.066666]}
      zoom={8}
      ZoomControl={false}
      scrollWheelZoom={false}
      className="map"
      bounds={coordinates}
      boundsOptions={{ padding: [1, 1] }}
      ref={mapRef}
    >
      <LayersControl>
        <BaseLayer checked name="OpenStreetMap">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </BaseLayer>
        <BaseLayer name="NASA Gibs Blue Marble">
          <TileLayer
            url="https://gibs-{s}.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_ShadedRelief_Bathymetry/default//EPSG3857_500m/{z}/{y}/{x}.jpeg"
            attribution="&copy; NASA Blue Marble, image service by OpenGeo"
          />
        </BaseLayer>
      </LayersControl>
      <Polygon
        color="red"
        weight={10}
        positions={coordinates}
        className="playground"
      />
      <ZoomControl position="bottomright" zoomInText="🍁" zoomOutText="🗺️" />
      {items.map((item) => (
        <Pin item={item} key={item.id} customIcon={customIcon} />
      ))}
    </MapContainer>
  );
};

export default Map;

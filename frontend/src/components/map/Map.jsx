import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import "./Map.css";

const customIcon = (animate = false) => {
  const iconElement = L.divIcon({
    className: animate ? "custom-icon-tilt" : "",
    html: '<img src="./Marker.svg" style="transform-origin: center; width: 35px; height: 35px;">',
    iconSize: [35, 35],
    iconAnchor: [17.5, 17.5],
  });
  return iconElement;
};

const Map = ({ items, onClusterClick }) => {
  const mapRef = useRef(null);
  const clusterLayerRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      const mapNode = ReactDOM.findDOMNode(document.getElementById("map"));
      if (!mapNode) return;

      mapRef.current = L.map(mapNode, {
        center: [51.049999, -114.066666],
        zoom: 10,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 17,
      }).addTo(mapRef.current);
    }

    if (clusterLayerRef.current) {
      mapRef.current.removeLayer(clusterLayerRef.current);
    }

    clusterLayerRef.current = L.markerClusterGroup({
      showCoverageOnHover: false,
    });

    clusterLayerRef.current.on("clusterclick", (a) => {
      const clusterItems = a.layer
        .getAllChildMarkers()
        .map((marker) => marker.options.item);
      onClusterClick(clusterItems);
    });

    items.forEach((item) => {
      if (item?.surface?.the_geom?.coordinates) {
        const polygonCoordinates = item.surface.the_geom.coordinates[0][0].map(
          ([lng, lat]) => [lat, lng]
        );
        // const playgroundPolygon = L.polygon(polygonCoordinates, {
        //   color: "blue",
        //   fillColor: "#f03",
        //   fillOpacity: 0.5,
        // }).addTo(mapRef.current);
        // playgroundPolygon.bindPopup("Playground Name or Any Info");
        const markerPosition = polygonCoordinates[0];
        const popupContent = `
        <div class="popupContainer">
          <p class="link">
            <span class="nameSpan">Name:</span>
            ${
              item.name && item.name.SITE_NAME
                ? item.name.SITE_NAME
                : "Community Park Playground"
            }
          </p>
          <p class="link">
            <span class="communitySpan">Community:</span>
            ${item.name.COMMUNITY_NAME}
          </p>
        </div>
      `;
        const marker = L.marker(markerPosition, {
          icon: customIcon(true),
          item: item,
        })
          .bindPopup(popupContent)
          .addTo(clusterLayerRef.current);
      }
    });

    mapRef.current.addLayer(clusterLayerRef.current);
  }, [items, onClusterClick]);

  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: "90vh",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        borderTopLeftRadius: "10px",
      }}
    />
  );
};

export default Map;

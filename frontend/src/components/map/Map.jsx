import React, { useEffect, useRef, useState } from "react";
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

const Map = ({ items, onClusterClick, userLocation }) => {
  const mapRef = useRef(null);
  const clusterLayerRef = useRef(null);
  const userMarkerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mapStyle = {
    width: "100%",
    height: isMobile ? "80vh" : "98vh",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    borderTopLeftRadius: isMobile ? "0" : "10px",
  };

  useEffect(() => {
    if (!mapRef.current) {
      const mapNode = ReactDOM.findDOMNode(document.getElementById("map"));
      if (!mapNode) return;

      mapRef.current = L.map(mapNode, {
        center: [51.049999, -114.066666],
        zoom: 10,
        maxZoom: 17,
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
      iconCreateFunction: function (cluster) {
        const count = cluster.getChildCount();

        const iconHtml = `
      <div style="background-color: #f69d45; color: #492B6B; width: 60px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 10%; color: #492B6B;">
        <img src="./playgroundpal_map_marker_green.svg" style="width: 30px; height: 30px; margin-right: 8px;">
        ${count}
      </div>
    `;

        return L.divIcon({
          html: iconHtml,
          className: "custom-cluster-icon",
          iconSize: L.point(30, 30),
        });
      },
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

    if (userLocation && mapRef.current) {
      if (userMarkerRef.current) {
        mapRef.current.removeLayer(userMarkerRef.current);
      }
      userMarkerRef.current = L.marker([
        userLocation.lat,
        userLocation.lng,
      ]).addTo(mapRef.current);
      mapRef.current.setView([userLocation.lat, userLocation.lng], 14);
    }

    mapRef.current.addLayer(clusterLayerRef.current);
  }, [items, onClusterClick, userLocation]);

  return <div id="map" style={mapStyle} />;
};

export default Map;

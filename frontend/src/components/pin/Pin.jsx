import React from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import "./Pin.css";
import { Link } from "react-router-dom";
import MarkerClusterGroup from "react-leaflet-cluster";

const Pin = ({ item }) => {
  // const map = useMap();
  const { name } = item;

  // let position;
  // if (
  //   item?.surface &&
  //   item?.surface?.the_geom &&
  //   item?.surface?.the_geom?.coordinates
  // ) {
  //   const firstPolygon = item?.surface?.the_geom?.coordinates[0][0][0];
  //   if (firstPolygon) {
  //     position = [firstPolygon[1], firstPolygon[0]];
  //   }
  // }

  // if (!position) {
  //   console.error("Invalid position for item", item);
  //   return null;
  // }

  return (
    <Popup>
      <div className="popupContainer">
        <Link to={`/${item.id}`} className="link">
          <span className="nameSpan">Name:</span>
          {name && name.SITE_NAME
            ? name.SITE_NAME
            : "Community Park Playground"}
        </Link>
        <p className="link">
          <span className="communitySpan">Community:</span>{" "}
          {name.COMMUNITY_NAME}
        </p>
      </div>
    </Popup>
  );
};

export default Pin;

// import React, { useEffect, useRef } from "react";
// import ReactDOM from "react-dom";
// import * as L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet.markercluster/dist/MarkerCluster.css";
// import "leaflet.markercluster/dist/MarkerCluster.Default.css";
// import "leaflet.markercluster/dist/leaflet.markercluster";

// const Map = ({ items }) => {
//   const mapRef = useRef(null);
//   const clusterLayerRef = useRef(null);

//   useEffect(() => {
//     if (!mapRef.current) {
//       const mapNode = ReactDOM.findDOMNode(document.getElementById("map"));
//       if (!mapNode) return;

//       mapRef.current = L.map(mapNode, {
//         center: [51.049999, -114.066666],
//         zoom: 11,
//       });

//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         maxZoom: 17,
//       }).addTo(mapRef.current);
//     }
//   }, []);

//   useEffect(() => {
//     if (clusterLayerRef.current) {
//       mapRef.current.removeLayer(clusterLayerRef.current);
//     }

//     clusterLayerRef.current = L.markerClusterGroup();

//     items.forEach((item) => {
//       if (item?.surface?.the_geom?.coordinates) {
//         const firstPolygon = item.surface.the_geom.coordinates[0][0][0];
//         if (firstPolygon) {
//           const lat = firstPolygon[1];
//           const lng = firstPolygon[0];
//           const marker = L.marker([lat, lng], {
//             title: item.name,
//           }).bindPopup(`Playground name is ${item.name}`);
//           clusterLayerRef.current.addLayer(marker);
//         }
//       }
//     });

//     mapRef.current.addLayer(clusterLayerRef.current);
//   }, [items]);

//   return <div id="map" style={{ width: "100%", height: "100vh" }} />;
// };

// export default Map;

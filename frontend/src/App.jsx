import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/homePage/HomePage";
import Playground from "./pages/playgroundPage/Playground";
import Layout from "./pages/layout/Layout";
import DetailedPage from "./pages/detailPage/DetailedPage";
import { useEffect, useState } from "react";

const App = () => {
  const [playgroundInfo, setPlaygroundInfo] = useState([]);

  async function fetchPlaygroundInfo() {
    try {
      const response = await fetch("/api/playground");
      const data = await response.json();
      const limitedData = data.slice(0, 100);
      setPlaygroundInfo(limitedData);
      console.log(data, "dfafsdfsdf");
    } catch (error) {
      console.error("Failed to fetch playground info:", error);
    }
  }

  useEffect(() => {
    fetchPlaygroundInfo();
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/playground",
          element: <Playground playgroundInfo={playgroundInfo} />,
        },
        {
          path: "/playground/:id",
          element: <DetailedPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;

// import React, { useEffect, useRef, useState } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   Polygon,
//   ZoomControl,
//   useMapEvent,
//   Marker,
//   useMapEvents,
//   Popup,
// } from "react-leaflet";
// // import MarkerClusterGroup from "react-leaflet-markercluster";
// // import "react-leaflet-markercluster/dist/styles.min.css";
// import "./Map.css";
// import "leaflet/dist/leaflet.css";
// import Pin from "../pin/Pin";

// import L from "leaflet";

// const customIcon = new L.Icon({
//   iconUrl: "./Marker.svg",
//   iconSize: [30, 30],
//   className: "custom-marker-icon",
// });

// function LocationMarker() {
//   const [position, setPosition] = useState(null);
//   const map = useMapEvents({
//     click() {
//       map.locate();
//     },
//     locationfound(e) {
//       setPosition(e.latlng);
//       map.flyTo(e.latlng, map.getZoom());
//     },
//   });

//   return position === null ? null : (
//     <Marker position={position}>
//       <Popup>You are here</Popup>
//     </Marker>
//   );
// }

// const SetViewOnClick = ({ animateRef }) => {
//   const map = useMapEvent("click", (e) => {
//     map.setView(e.latlng, map.getZoom(), {
//       animate: animateRef.current || false,
//     });
//   });

//   return null;
// };

// const Map = ({ items }) => {
//   const [polygons, setPolygons] = useState([]);
//   const animateRef = useRef(false);

//   useEffect(() => {
//     const newPolygons = items?.map((item) => {
//       const coordinates = item?.surface?.the_geom?.coordinates[0][0];
//       const latLngs = coordinates?.map(([lng, lat]) => [lat, lng]);
//       return latLngs;
//     });
//     setPolygons(newPolygons);
//   }, [items]);

//   return (
//     <MapContainer
//       center={[51.049999, -114.066666]}
//       zoom={10}
//       ZoomControl={false}
//       scrollWheelZoom={false}
//       className="map"
//       boundsOptions={{ padding: [1, 1] }}
//     >
//       <TileLayer
//         attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
//         url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
//       />
//       <SetViewOnClick animateRef={animateRef} />
//       {polygons?.map((polygonCoordinates, index) => (
//         <Polygon key={index} positions={polygonCoordinates} color="#492B6B" />
//       ))}
//       <LocationMarker />
//       <ZoomControl position="bottomright" zoomInText="🍁" zoomOutText="🗺️" />
//       {items?.map((item, index) => (
//         <Pin key={index} item={item} customIcon={customIcon} />
//       ))}
//     </MapContainer>
//   );
// };

// export default Map;

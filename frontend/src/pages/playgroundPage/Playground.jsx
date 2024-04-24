import React, { useEffect, useState } from "react";
import "./Playground.css";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";

const Playground = ({ playgroundInfo }) => {
  const [filteredPlaygrounds, setFilteredPlaygrounds] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  const handleResize = () => {
    setIsMobileView(window.innerWidth < 768);
  };
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMap = () => {
    setShowMap(!showMap);
    setToggle(!toggle);
  };

  useEffect(() => {
    setFilteredPlaygrounds(playgroundInfo);
  }, [playgroundInfo]);

  const handleClusterClick = (clusterItems) => {
    setFilteredPlaygrounds(clusterItems);
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredPlaygrounds(playgroundInfo);
    } else {
      const filtered = playgroundInfo?.filter((info) =>
        info?.name?.SITE_NAME?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPlaygrounds(filtered);
    }
  };

  const handleClear = () => {
    setFilteredPlaygrounds(playgroundInfo);
  };

  const handleFindNearMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const filtered = playgroundInfo.filter((info) => {
            if (!info.surface?.the_geom?.coordinates) {
              return false;
            }

            const polygonCoordinates = info.surface.the_geom.coordinates[0][0];

            const [lng, lat] = polygonCoordinates[0];

            const distance = calculateDistance(latitude, longitude, lat, lng);
            return distance <= 5000;
          });
          setFilteredPlaygrounds(filtered);
        },
        (error) => {
          toast.error(
            "Unable to access your location. Please enable location services."
          );
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const handleEquipmentSelect = (selectedEquipmentType) => {
    if (!selectedEquipmentType) {
      setFilteredPlaygrounds(playgroundInfo);
      return;
    }

    const filtered = playgroundInfo.filter((playground) =>
      playground.equipment?.equipment?.some(
        (equipmentItem) =>
          equipmentItem.TYPE_DESCRIPTION.toLowerCase() ===
          selectedEquipmentType.toLowerCase()
      )
    );
    setFilteredPlaygrounds(filtered);
  };

  return (
    <>
      {!isMobileView ? (
        <div className="mainContainer">
          <div className="playgroundList">
            <Filter
              onSearch={handleSearch}
              onClear={handleClear}
              onFindNearMe={handleFindNearMe}
              onEquipmentSelect={handleEquipmentSelect}
            />
            <div className="wrapper">
              {filteredPlaygrounds?.length > 0 ? (
                filteredPlaygrounds.map((info) => (
                  <Card key={info._id} {...info} />
                ))
              ) : (
                <div className="loader-container">
                  <span className="loader"></span>
                </div>
              )}
            </div>
          </div>
          <div className="mapContainer">
            <Map
              items={filteredPlaygrounds}
              onClusterClick={handleClusterClick}
            />
          </div>
          <ToastContainer />
        </div>
      ) : (
        <div className="mainContainer">
          <Filter
            onSearch={handleSearch}
            onClear={handleClear}
            onFindNearMe={handleFindNearMe}
            onEquipmentSelect={handleEquipmentSelect}
          />
          <div className="toggleButton" onClick={toggleMap}>
            <h1 className="toggleHeading">Map View</h1>
            <div>{toggle ? <FaToggleOn /> : <FaToggleOff />}</div>
            <h1 className="toggleHeading">List View</h1>
          </div>
          {showMap ? (
            <div className="playgroundList">
              <div className="wrapper">
                {filteredPlaygrounds?.length > 0 ? (
                  filteredPlaygrounds.map((info) => (
                    <Card key={info._id} {...info} />
                  ))
                ) : (
                  <div className="loader-container">
                    <span className="loader"></span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="mapContainer">
              <Map
                items={filteredPlaygrounds}
                onClusterClick={handleClusterClick}
              />
            </div>
          )}
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default Playground;

import React from "react";
import { Marker, Popup } from "react-leaflet";
import "./Pin.css";
import { Link } from "react-router-dom";

const Pin = ({ item, customIcon }) => {
  return (
    <Marker position={[item.latitude, item.longitude]} icon={customIcon}>
      <Popup>
        <div className="popupContainer">
          <img src={item.images} alt="" />
          <div className="textContainer">
            <Link to={`/${item.id}`} className="link">
              {item.name}
            </Link>
            <div className="features">
              {item.amenities.map((a) => (
                <div className="feature" key={a.id}>
                  <span>{a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default Pin;

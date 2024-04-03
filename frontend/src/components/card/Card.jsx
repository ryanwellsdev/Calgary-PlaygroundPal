import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const Card = ({ item }) => {
  console.log(item);
  return (
    <div className="card">
      <Link to={`/playground/${item.id}`} className="imageContainer">
        <img src={item.images} alt="" />
      </Link>
      <div className="textContainer">
        <div className="nameContainer">
          <h2 className="title">
            <Link to={`/playground/${item.id}`} className="link">
              {item.name}
            </Link>
          </h2>
          <p className="description">{item.description}</p>
        </div>

        <div className="bottom">
          <p className="address">
            <img src="/pin.png" alt="" />
            <span>{item.address}</span>
          </p>
          <div className="features">
            {item.amenities.map((a) => (
              <div className="feature">
                <span>{a}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

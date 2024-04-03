import React from "react";
import "./DetailedPage.css";
import Carousel from "../../components/carousel/Carousel";
import Map from "../../components/map/Map";
import { DetailedData } from "../../Playground";
import { PiShareFatLight } from "react-icons/pi";

const DetailedPage = () => {
  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Carousel images={DetailedData.images} />
          <div className="info">
            <div className="top">
              <div className="cardaddress">
                <h1>{DetailedData.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{DetailedData.address}</span>
                </div>
              </div>
            </div>
            <div className="bottom">{DetailedData.description}</div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">Equipments</p>
          <div className="equipments">
            {DetailedData.amenities.map((a) => (
              <div className="equipment" key={a.id}>
                <img src={a.image} alt="" className="imgbg" key={a.id} />
                <span>{a.name}</span>
              </div>
            ))}
          </div>
          <p className="title">Nearby Places</p>
          <div className="list">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>1000km away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/bus.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>100m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/restaurant.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>100m away</p>
              </div>
            </div>
          </div>

          <p className="title">Location</p>

          <div className="buttons">
            <button>
              <PiShareFatLight className="shareicon" />
              share the location
            </button>
            <button>
              <img src="/save.png" alt="" />
              save the place
            </button>
          </div>
        </div>
        <div className="mapContainer">
          <Map items={[DetailedData]} />
        </div>
      </div>
    </div>
  );
};

export default DetailedPage;

import React from "react";
import "./Playground.css";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { Data } from "../../Playground";

const Playground = () => {
  const data = Data;
  return (
    <div className="mainContainer">
      <div className="playgroundList">
        <div className="wrapper">
          <Filter />
          {data.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="mapContainer">
        <Map items={data} />
      </div>
    </div>
  );
};

export default Playground;

import { useEffect, useState } from "react"
import React from "react";
import "./Playground.css";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { Data } from "../../Playground";

const Playground = () => {
  const data = Data;
  async function wrap() {
    const response = await fetch("/api/playground");
    const playgroundData = await response.json()
    return playgroundData;
  };

  const [playgroundInfo, setPlaygroundInfo] = useState()

  async function addInfo() {
    try {
      const playgroundFetch = await wrap()
      console.log("currently fetching", playgroundFetch)
      setPlaygroundInfo(playgroundFetch)
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    addInfo()
  }, [])
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

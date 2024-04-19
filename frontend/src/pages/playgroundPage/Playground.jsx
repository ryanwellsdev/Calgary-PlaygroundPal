import "./Playground.css";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";

const Playground = ({ playgroundInfo }) => {
  return (
    <div className="mainContainer">
      <div className="playgroundList">
        <Filter />
        <div className="wrapper">
          {playgroundInfo?.length > 0 ? (
            playgroundInfo?.map((info) => <Card key={info._id} {...info} />)
          ) : (
            <p>Loading playground information...</p>
          )}
        </div>
      </div>
      <div className="mapContainer">
        <Map items={playgroundInfo} />
      </div>
    </div>
  );
};

export default Playground;

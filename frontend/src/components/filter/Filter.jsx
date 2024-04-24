import React, { useState } from "react";
import "./Filter.css";
import { CiSearch, CiLocationOn } from "react-icons/ci";

const Filter = ({ onSearch, onClear, onFindNearMe, onEquipmentSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  const handleSearchClear = () => {
    onClear();
    setSearchTerm("");
  };

  const handleEquipmentChange = (e) => {
    onEquipmentSelect(e.target.value);
  };

  return (
    <div className="filter">
      <h1>Calgary Playgrounds</h1>
      <div className="top">
        <div className="search">
          <div className="inputSearch">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <CiSearch className="search-icon" />
          </div>
          <div className="searchButtons">
            <button className="filterButton" onClick={handleSearchClick}>
              Search
            </button>
            <button className="filterButton" onClick={handleSearchClear}>
              Clear
            </button>
          </div>
        </div>
      </div>
      <div className="bottom">
        <button onClick={onFindNearMe} className="locationButton">
          <CiLocationOn className="icon" />
          <span className="locationText">Parks Near Me</span>
        </button>
        <div>
          <select
            onChange={handleEquipmentChange}
            className="equipmentDropdown"
          >
            <option value="">Select Equipment</option>
            <option value="swing">SWING</option>
            <option value="slide">SLIDE</option>
            <option value="climber">CLIMBER</option>
            <option value="climber">TEETER TOTTER SEESAW</option>
            <option value="climber">MULTI PLAY COMPLEX</option>
            <option value="climber">STATIONARY TOY</option>
            <option value="climber">SPRING TOY</option>
            <option value="climber">TRACK RIDE</option>
            <option value="climber">FITNESS EQUIPMENT</option>
            <option value="climber">DIGGING TOY</option>
            <option value="climber">CLIMBING WALL STRUCT</option>
            <option value="climber">LOG ROLL</option>
            <option value="climber">SPINNING TOY</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;

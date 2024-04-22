import React, { useState } from "react";
import "./Filter.css";
import { CiSearch, CiLocationOn } from "react-icons/ci";

const Filter = ({ onSearch, onClear, onFindNearMe }) => {
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

  return (
    <div className="filter">
      <h1>Calgary Playgrounds</h1>
      <div className="top">
        <label htmlFor="search">Search for playgrounds</label>
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
          <button className="filterButton" onClick={handleSearchClick}>
            Search
          </button>
          <button className="filterButton" onClick={handleSearchClear}>
            Clear
          </button>
        </div>
      </div>
      <div className="bottom">
        <button onClick={onFindNearMe} className="locationButton">
          <CiLocationOn className="icon" />
          <span className="locationText">Parks Near Me</span>
        </button>
      </div>
    </div>
  );
};

export default Filter;

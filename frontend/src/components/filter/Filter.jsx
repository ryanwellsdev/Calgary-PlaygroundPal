import React from "react";
import "./Filter.css";
import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";

const Filter = () => {
  return (
    <div className="filter">
      <h1>Search results for Calgary playground</h1>
      <div className="top">
        <label htmlFor="search">Search for playgrounds</label>
        <div className="search">
          <div className="inputSearch">
            <input type="text" name="" id="" placeholder="search" />
            <CiSearch className="search-icon" />
          </div>
          <button>search</button>
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="type">Location</label>
          <div className="inputLocation">
            <input type="text" name="" id="" placeholder="location" />
            <CiLocationOn className="location-icon" />
          </div>
        </div>
        <div className="item">
          <label htmlFor="all_playground">Equipments</label>
          <select name="all_playground" id="all_playground">
            <option value="">any</option>
            <option value="Swings">Swings</option>
            <option value="Slides">Slides</option>
            <option value="Climbers">Climbers</option>
            <option value="Spinners">Spinners</option>
            <option value="Spring riders">Spring riders</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;

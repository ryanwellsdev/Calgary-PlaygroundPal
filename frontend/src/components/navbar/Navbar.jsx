import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Navbar = () => {
  return (
    <div className="NavbarContainer">
      <img src="./PlaygroundPal_Logo_white.svg" alt="" className="logo" />
    </div>
  );
};

export default Navbar;

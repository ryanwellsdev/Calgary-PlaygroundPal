import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className="NavbarContainer">
      <img src="./PlaygroundPal_Logo_white.svg" alt="" className="logo" onClick={handleClick} />
    </div>
  );
};

export default Navbar;
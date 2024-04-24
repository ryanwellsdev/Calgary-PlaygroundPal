import React from "react";
import "./Footer.css";

const NameLink = ({ name, url }) => (
  <span className="name-link">
    <a href={url} target="_blank" rel="noopener noreferrer">{name}</a>,
  </span>
);

const Footer = () => {
  return (
    <div className="FooterContainer">
      <p className="footer-text">
        <NameLink name="Abbas Anosh" url="https://github.com/AbbasAnosh" />
        <NameLink name="Mia Taylor" url="https://github.com/Mrsaless" />
        <NameLink name="Ryan Wells" url="https://github.com/ryanwellsdev" />
      </p>
    </div>
  );
};

export default Footer;

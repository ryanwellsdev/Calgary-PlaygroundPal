import React from "react";
import "./Footer.css";
import { FaInstagram } from "react-icons/fa6";
import { IoShareSocialSharp } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="FooterContainer">
      <div className="footer-icons">
        {" "}
        <FaInstagram className="instagram_footer" />
        <IoShareSocialSharp className="share_footer" />
        <FaRegHeart className="like_footer" />
      </div>
    </div>
  );
};

export default Footer;

import React from "react";
import "./homepage.css";
import { Link } from "react-router-dom";
/*import "./playgroundpal_logo_color.svg"; */

const HomePage = () => {
  return (
    <div className="home">
      <img
        src="playgroundpal_logo_color.svg"
        alt="color logo"
        className="color_logo_landing"
      />
      <div className="content">
        <h2 className="heading1">Welcome To</h2>
        <h1 className="heading2">Playground Pal</h1>
        <p className="paragraph1">
          Welcome to our Playpal app, an easy way to find playgrounds near you!
          <br />
          To begin please click on the button below to access our main page
          <br />
          where you will be able to find any playgrounds with specific fratures.
        </p>
      </div>
      <Link to="/playground" className="link">
        <button type="button" className="landing_page_button">
          Let's Get Started
        </button>
      </Link>
      <img
        src="PlaygroundPal_hand_icon.svg"
        alt="hand icon"
        className="hand_icon_landing"
      />
    </div>
  );
};

export default HomePage;

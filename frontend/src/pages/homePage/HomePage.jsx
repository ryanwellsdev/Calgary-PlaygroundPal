import React from "react";
import "./homepage.css";
/*import "./playgroundpal_logo_color.svg"; */

const HomePage = () => {
  return (
    <div className="home">
      <img
        src="playgroundpal_logo_color.svg"
        alt="color logo"
        className="color_logo_landing"
      />
      <h2>Welcome To</h2>
      <h1>Playground Pal</h1>
      <p>
        Welcome to our Playpal app, an easy way to find playgrounds near you! To
        begin please click on the button below to access our main page where you
        will be able to find any playgrounds with specific fratures.
      </p>
      <button type="button" className="landing_page_button">
        Let's Get Started
      </button>
      <img
        src="PlaygroundPal_hand_icon.svg"
        alt="hand icon"
        className="hand_icon_landing"
      />
    </div>
  );
};

export default HomePage;

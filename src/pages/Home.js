import React, { useState } from "react";

import DarkHome from "./homeTheme/DarkHome";
import LightHome from "./homeTheme/LightHome";

import "../pages/homeTheme/ToggleSwitch.css";
import "../pages/homeTheme/Background.css";

const Home = () => {
  const [isDarkMode, setDarkMode] = useState(true);

  const toggleMode = () => {
    setDarkMode(!isDarkMode);
  };

  return (
    <div style={{ flex: 1 }} className="full-page">
      <div className="background">
        {isDarkMode ? <DarkHome /> : <LightHome />}
      </div>
      <div className="content">
        <div style={{ height: "0px", width: "0px" }}>
          <div className={`switch-container ${isDarkMode ? "text" : "text2"}`}>
            <input
              type="checkbox"
              id="toggle"
              checked={isDarkMode}
              onChange={toggleMode}
            />
            <label id="switch" for="toggle">
              <div id="circle"></div>
              <div id="text"></div>
              <div id="text2"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

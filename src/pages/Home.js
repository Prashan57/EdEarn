import React, { useState } from "react";

import DarkHome from "./homeTheme/DarkHome";
import LightHome from "./homeTheme/LightHome";

import "../pages/homeTheme/ToggleSwitch.css";
import "../pages/homeTheme/Background.css";
import Layout from "./Layout/layout";

const Home = () => {
  return (
    <Layout>
      <div className="relative h-screen overflow-hidden">
        <DarkHome />
        <div>
          {
            <div class="h-screen flex items-center justify-center">
              <div class=" p-8 rounded shadow-md">
                <p>This is a Home Screen container.</p>
              </div>
            </div>
          }
        </div>
      </div>
    </Layout>
  );
};

export default Home;

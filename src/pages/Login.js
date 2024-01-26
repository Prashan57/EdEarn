import React from "react";
import NavigationBar from "./Layout/header";
import Layout from "./Layout/layout";
import Home from "./Home";
import DarkHome from "./homeTheme/DarkHome";

const Login = () => {
  return (
    <Layout>
      <div className="relative h-screen overflow-hidden">
        <DarkHome />
        <div>
          {
            <div class="h-screen flex items-center justify-center">
              <div class=" p-8 rounded shadow-md">
                <p>This is a centered container.</p>
              </div>
            </div>
          }
        </div>
      </div>
    </Layout>
  );
};

export default Login;

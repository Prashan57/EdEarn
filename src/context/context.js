import React, { useEffect, useState } from "react";

import context from "./mainContext";
import { loginInUserApi, signUpUserApi } from "../api/user";

const Context = ({ children }) => {
  const [user, setUser] = useState({
    email: "",
  });
  const [loggedIn, setLoggedIn] = useState();
  const [toggleSignPage, setToggleSignPage] = useState(true);
  const [onChangeLoginData, setOnChangeLoginData] = useState({
    email: "",
    password: "",
  });

  const [onChangeSignInData, setOnChangeSignInData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async ({ email, password }) => {
    try {
      const userResp = await loginInUserApi({ email, password });
      console.log("Context login userdata", userResp);

      setUser({ email: email });
      setLoggedIn(true);
      if (userResp.status)
        return {
          success: true,
        };
      else
        return {
          success: false,
        };
    } catch (err) {
      console.log("Error in context Login Api", err);
    }
  };

  const signInUser = async ({ email, password }) => {
    try {
      const userResp = await signUpUserApi({ email, password });
      console.log("Context login userdata", userResp);

      if (userResp.status)
        return {
          success: true,
        };
      else
        return {
          success: false,
        };
    } catch (err) {
      console.log("Error in context SigIn", err);
    }
  };
  return (
    <context.Provider
      value={{
        user,
        setUser,
        loggedIn,
        setLoggedIn,
        loginUser,
        signInUser,
        setOnChangeLoginData,
        onChangeLoginData,
        setOnChangeSignInData,
        onChangeSignInData,
        toggleSignPage,
        setToggleSignPage,
      }}
    >
      {children}
    </context.Provider>
  );
};

export default Context;

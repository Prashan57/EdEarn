import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import context from "../context/mainContext";

const Login = () => {
  const {
    user,
    setLoggedIn,
    loggedIn,
    loginUser,
    signInUser,
    setOnChangeLoginData,
    onChangeLoginData,
    setOnChangeSignInData,
    onChangeSignInData,
    toggleSignPage,
    setToggleSignPage,
  } = useContext(context);

  const navigate = useNavigate();
  const handleChangeLogin = (e) => {
    setOnChangeLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(onChangeLoginData);
  };

  const handleChangeSigIn = (e) => {
    setOnChangeLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(onChangeLoginData);
  };

  const handleSubmit = async (e, page) => {
    e.preventDefault();
    if (page === "Login") {
      const resp = await loginUser(onChangeLoginData);
      console.log("Logged IN resp login page", resp);
      if (resp.success) {
        navigate("/competition");
        console.log("user data", user);
      }
    } else {
      const resp = await signInUser(onChangeLoginData);
      console.log("Logged IN resp login page", resp);
      if (resp.success) {
        setToggleSignPage((prev) => !prev);
        console.log("user data", user);
      }
    }
  };
  return (
    <div>
      <div>
        {toggleSignPage ? (
          <div>
            <form onSubmit={(event) => handleSubmit(event, "Login")}>
              <div>
                <h1>{toggleSignPage && <div>Login</div>}</h1>
              </div>

              <input
                type="text"
                placeholder="Email"
                name="email"
                onChange={(e) => {
                  handleChangeLogin(e);
                }}
                min="3"
              />

              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => {
                  handleChangeLogin(e);
                }}
                min="8"
              />

              <button type="submit">Login</button>
            </form>
            <h1
              onClick={() => {
                setToggleSignPage((prev) => !prev);
              }}
            >
              Dont Have an Account Sign Here
            </h1>
          </div>
        ) : (
          <div>
            <form onSubmit={(event) => handleSubmit(event, "SignUp")}>
              <div>
                <h1>{toggleSignPage || <div>Register</div>}</h1>
              </div>

              <input
                type="text"
                placeholder="Email"
                name="email"
                onChange={(e) => {
                  handleChangeSigIn(e);
                }}
                min="3"
              />

              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => {
                  handleChangeSigIn(e);
                }}
                min="8"
              />

              <button type="submit">Login</button>
            </form>
            <h1
              onClick={() => {
                setToggleSignPage((prev) => !prev);
              }}
            >
              Have an Account Login Here!
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

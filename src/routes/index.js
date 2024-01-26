import Home from "../pages/Home";
import Payment from "../pages/Payment";
import Login from "../pages/Login";
import Game from "../pages/Game";

export const routes = [
  {
    name: "Home",
    element: <Home />,
    path: "/home",
  },
  {
    name: "Payment",
    element: <Payment />,
    path: "/payment",
  },

  {
    name: "Login",
    element: <Login />,
    path: "/login",
  },
  {
    name: "Game",
    element: <Game />,
    path: "/game",
  },
];

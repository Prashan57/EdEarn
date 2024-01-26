import Home from "../pages/Home";
import Payment from "../pages/Payment";
import Login from "../pages/Login";
import Competition from "../pages/Competition";
export const routes = [
  {
    name: "Home",
    element: <Home />,
    path: "/",
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
    name: "Competition",
    element: <Competition room="room1" />,
    path: "/competition",
  },
];

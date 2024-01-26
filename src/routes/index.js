import Home from "../pages/Home";
import Payment from "../pages/Payment";
import Login from "../pages/Login";

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
];

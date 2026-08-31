import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";

export const router = createBrowserRouter([
  // home route
  {
    path: "/",
    element: <h1>Home Page</h1>,
  },
  // register route
  {
    path: "/register",
    element: <Register />,
  },
  // login route
  {
    path: "login",
    element: <Login />,
  },
]);

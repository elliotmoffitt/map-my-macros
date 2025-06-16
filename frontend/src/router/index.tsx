import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Landing from "../components/Landing/Landing";
import MenuItems from "../components/MenuItems";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "results",
        element: <MenuItems />,
      },
    ],
  },
]);

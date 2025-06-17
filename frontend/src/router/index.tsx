import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Landing from "../components/Landing/Landing";
import MenuItems from "../components/MenuItems";
import DailyGoals from "../components/DailyGoals";

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
      {
        path: "dailyGoals",
        element: <DailyGoals />,
      },
    ],
  },
]);

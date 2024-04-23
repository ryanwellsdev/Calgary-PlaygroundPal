import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/homePage/HomePage";
import Playground from "./pages/playgroundPage/Playground";
import Layout from "./pages/layout/Layout";
import DetailedPage from "./pages/detailPage/DetailedPage";
import { useEffect, useState } from "react";

const App = () => {
  const [playgroundInfo, setPlaygroundInfo] = useState([]);

  async function fetchPlaygroundInfo() {
    try {
      const response = await fetch("/api/playground");
      const data = await response.json();
      const limitedData = data.slice(0, 200);
      setPlaygroundInfo(limitedData);
      console.log(data, "dfafsdfsdf");
    } catch (error) {
      console.error("Failed to fetch playground info:", error);
    }
  }

  useEffect(() => {
    fetchPlaygroundInfo();
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/playground",
          element: <Playground playgroundInfo={playgroundInfo} />,
        },
        {
          path: "/playground/:id",
          element: <DetailedPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;

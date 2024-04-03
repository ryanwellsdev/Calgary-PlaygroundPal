import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/homePage/HomePage";
import Playground from "./pages/playgroundPage/Playground";
import Layout from "./pages/layout/Layout";
import DetailedPage from "./pages/detailPage/DetailedPage";

const App = () => {
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
          element: <Playground />,
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

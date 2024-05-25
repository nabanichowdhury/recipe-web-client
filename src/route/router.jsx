import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Layout from "../layout/Layout";
import AllRecipe from "../pages/AllRecipe";
import PrivateRoute from "../privateRoute/PrivateRoute";
import AddRecipe from "../pages/AddRecipe";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/all-recipe",
        element: <AllRecipe />,
      },
      {
        path: "/add-recipe",
        element: (
          <PrivateRoute>
            <AddRecipe />
          </PrivateRoute>
        ),
      },
      // Add additional routes here
    ],
  },
]);

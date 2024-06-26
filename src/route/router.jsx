import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Layout from "../layout/Layout";
import AllRecipe from "../pages/AllRecipe";
import PrivateRoute from "../privateRoute/PrivateRoute";
import AddRecipe from "../pages/AddRecipe";
import RecipeDetails from "../pages/RecipeDetails";
import PurchaseCoin from "../pages/PurchaseCoin";

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
        path: "/recipe/:recipeId",
        element: (
          <PrivateRoute>
            <RecipeDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-recipe",
        element: (
          <PrivateRoute>
            <AddRecipe />
          </PrivateRoute>
        ),
      },
      {
        path: "/purchase-coins",
        element: (
          <PrivateRoute>
            <PurchaseCoin />
          </PrivateRoute>
        ),
      },
      // Add additional routes here
    ],
  },
]);

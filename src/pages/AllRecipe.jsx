import React, { useEffect, useState } from "react";
import { getAllRecipe } from "../services/getAllRecipe";
import Recipe from "../components/Recipe";

const AllRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await getAllRecipe();

      setRecipes(response.data);
    };
    fetchRecipes();
  }, []);

  return (
    <div>
      {recipes.map((recipe) => (
        <Recipe key={recipe._id} recipe={recipe} />
      ))}
    </div>
  );
};

export default AllRecipe;

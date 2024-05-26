import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../services/getRecipeById";

const RecipeDetails = () => {
  const { recipeId } = useParams();

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await getRecipeById(recipeId);

      setRecipe(response.data);
    };

    fetchRecipe();
  }, [recipeId]);

  return (
    <div>
      <div className="container mx-auto">
        <div>
          <figure>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${recipe?.videoCode}`}
              title="YouTube Video Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </figure>
          <h2>{recipe?.category}</h2>
          <p>{recipe?.RecipeDetails}</p>
          <p>Creator Email: {recipe?.creatorEmail}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../services/getRecipeById";
import { getAllRecipe } from "../services/getAllRecipe";
import Recipe from "../components/Recipe";
import SuggestionCard from "../components/SuggestionCard";

const RecipeDetails = () => {
  const { recipeId } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [allRecipe, setAllRecipe] = useState([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await getRecipeById(recipeId);
      setRecipe(response.data);

      const recipies = await getAllRecipe();
      setAllRecipe(recipies.data);
    };
    console.log(allRecipe);

    fetchRecipe();
  }, [recipeId]);

  const matchingCategory = allRecipe.filter(
    (r) => r.category === recipe?.category && r._id !== recipe?._id
  );
  const matchingCountry = allRecipe.filter(
    (r) => r.country === recipe?.country && r._id !== recipe?._id
  );

  return (
    <div>
      <div className="grid grid-cols-2">
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
        <div className="grid grid-cols-2 grid-gap-4">
          <div className="text-center ">
            {matchingCategory.length === 0 ? (
              <p className="text-xl font-bold">
                No recipe from the same Category
              </p>
            ) : (
              <h2 className="text-xl font-bold">More from the same Category</h2>
            )}
            <div className="mt-4">
              {matchingCategory.map((recipe) => (
                <SuggestionCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
          <div>
            {matchingCountry.length === 0 ? (
              <p className="text-xl font-bold">
                No recipe from the same country
              </p>
            ) : (
              <h2 className="text-xl font-bold">More from the same country</h2>
            )}
            <div>
              {matchingCountry.map((recipe) => (
                <SuggestionCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;

import React from "react";

const SuggestionCard = ({ recipe }) => {
  return (
    <div>
      <div className="card bg-base-100 shadow-xl ">
        <figure>
          <img src={recipe.recipeImage} alt="Recipe Image" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            Top suggestions for you
            {/* <div className="badge badge-secondary">{}</div> */}
          </h2>
          <p>{recipe.title}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">{recipe.country}</div>
            <div className="badge badge-outline">{recipe.category}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestionCard;

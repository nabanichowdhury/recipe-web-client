import React, { useEffect, useState } from "react";
import "./Counter.css";
import { getAllRecipe } from "../services/getAllRecipe";

const CounterSection = () => {
  const [recipesCount, setRecipesCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  // const allRecipe = getAllRecipe().data;
  const targetRecipesCount = 8; // Replace with actual number of recipes
  const targetUsersCount = 5; // Replace with actual number of users

  useEffect(() => {
    animateValue("recipes-count", 0, targetRecipesCount, 2000);
    animateValue("users-count", 0, targetUsersCount, 2000);
  }, []);

  const animateValue = (id, start, end, duration) => {
    let range = end - start;
    let current = start;
    let increment = end > start ? 1 : -1;
    let stepTime = Math.abs(Math.floor(duration / range));
    let obj = document.getElementById(id);

    let timer = setInterval(() => {
      current += increment;
      obj.textContent = current + "+";
      if (current === end) {
        clearInterval(timer);
      }
    }, stepTime);
  };

  return (
    <div className="counter-container">
      <h2 className="title">Why Choose Recipe Treasure?</h2>
      <p className="description">
        Join a vibrant community of home cooks and food enthusiasts. Explore a
        world of flavors with our extensive collection of authentic recipes, and
        see why thousands trust Recipe Treasure for their culinary adventures.
      </p>
      <div className="counter-section">
        <div className="counter">
          <div className="count" id="recipes-count">
            0+
          </div>
          <p className="label">Recipes</p>
        </div>
        <div className="counter">
          <div className="count" id="users-count">
            0+
          </div>
          <p className="label">Users</p>
        </div>
      </div>
    </div>
  );
};

export default CounterSection;

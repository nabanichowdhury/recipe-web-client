import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { checkUserExist } from "../services/userExist";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateUserCoin } from "../services/updateUserCoin";
import { updateWatchCount } from "../services/updateWatchCount"; // Assuming you have this service

const Recipe = ({ recipe }) => {
  const [user, loading] = useAuthState(auth);
  const [userExist, setUserExist] = useState(null);
  const isLoggedIn = !!user;
  const [isCreator, setIsCreator] = useState(false);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [hasEnoughCoins, setHasEnoughCoins] = useState(false);
  const navigate = useNavigate();

  //   useEffect(() => {
  //     const handleUserExistence = async () => {
  //       if (user?.email) {
  //         const isUserExist = await checkUserExist(user.email);
  //         if (isUserExist.success) {
  //           setUserExist(isUserExist.data);
  //         }
  //       }
  //     };

  //     handleUserExistence();

  //     const isCreator = user?.email === recipe.creatorEmail;
  //     const hasPurchased = recipe.purchasedBy.includes(user?.displayName);
  //     const hasEnoughCoins = userExist?.coin >= 10;

  //     setIsCreator(isCreator);
  //     setHasPurchased(hasPurchased);
  //     setHasEnoughCoins(hasEnoughCoins);
  //   }, [user, recipe.creatorEmail, recipe.purchasedBy]);
  useEffect(() => {
    const handleUserExistence = async () => {
      if (user?.email) {
        const isUserExist = await checkUserExist(user.email);
        if (isUserExist.success) {
          const userExistData = isUserExist.data;
          const isCreator = user.email === recipe.creatorEmail;
          const hasPurchased = recipe.purchasedBy.includes(user.displayName);
          const hasEnoughCoins = userExistData.coin >= 10;

          await Promise.all([
            setUserExist(userExistData),
            setIsCreator(isCreator),
            setHasPurchased(hasPurchased),
            setHasEnoughCoins(hasEnoughCoins),
          ]);
        }
      }
    };

    handleUserExistence();
  }, [user, recipe.creatorEmail, recipe.purchasedBy]);

  const [showModal, setShowModal] = useState(false);

  const redirectToRecipeDetails = () => {
    navigate(`/recipe/${recipe._id}`);
  };

  const redirectToPurchaseCoins = () => {
    navigate("/purchase-coins");
  };

  const handleViewRecipe = () => {
    if (!isLoggedIn) {
      toast.error("Please log in to view the recipe.");
      navigate("/");
    } else if (isCreator) {
      redirectToRecipeDetails();
    } else if (!hasEnoughCoins) {
      redirectToPurchaseCoins();
      toast.error("You don't have enough coins to view this recipe.");
    } else if (hasPurchased) {
      redirectToRecipeDetails();
    } else {
      setShowModal(true);
    }
  };

  const handleConfirmPurchase = async () => {
    try {
      await updateUserCoin({ email: user.email, coin: -10 });
      await updateUserCoin({ email: recipe.creatorEmail, coin: 1 });
      await updateWatchCount(recipe._id, user?.displayName);

      const updatedRecipe = {
        ...recipe,
        purchasedBy: [...recipe.purchasedBy, user.displayName],
        watchCount: recipe.watchCount,
      };

      // Update the recipe in your data source with the updated data
      // e.g., updateRecipeInDataSource(updatedRecipe);

      redirectToRecipeDetails();
      setShowModal(false);
    } catch (error) {
      console.error("Error during purchase:", error);
      toast.error("An error occurred during the purchase. Please try again.");
    }
  };

  return (
    <div>
      <div className="card card-side bg-base-100 shadow-xl">
        <figure>
          <img
            src={
              recipe.recipeImage ||
              "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
            }
            alt="Recipe"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{recipe.category}</h2>
          <p>Recipe Description: {recipe.recipeDetails}</p>
          <p>Creator Email: {recipe.creatorEmail}</p>
          {recipe.purchasedBy.length > 0 && (
            <p>Purchased by: {recipe.purchasedBy.join(", ")}</p>
          )}
          <div className="card-actions justify-end">
            {isCreator ? (
              <button className="btn btn-primary" onClick={handleViewRecipe}>
                See your Recipe
              </button>
            ) : (
              <label
                htmlFor="my_modal_7"
                className="btn btn-primary"
                onClick={handleViewRecipe}
              >
                View Whole Recipe
              </label>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <>
          <input type="checkbox" id="my_modal_7" className="modal-toggle" />
          <div className="modal" role="dialog">
            <div className="modal-box">
              <h3 className="text-lg font-bold">Confirm Purchase</h3>
              <p className="py-4">
                Do you want to spend 10 coins to view this recipe?
              </p>
              <div className="modal-action">
                <label
                  htmlFor="my_modal_7"
                  className="btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </label>
                <button
                  onClick={handleConfirmPurchase}
                  className="btn btn-primary"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Recipe;

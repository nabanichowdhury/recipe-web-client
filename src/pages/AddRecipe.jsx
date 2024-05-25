import React, { useState } from "react";
import axios from "axios";

const AddRecipe = () => {
  const [recipeImage, setRecipeImage] = useState(null);
  const [recipeDetails, setRecipeDetails] = useState("");
  const [videoCode, setVideoCode] = useState("");
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // const form = new FormData(event.target);
    // const image = form.get("image");

    // const data = new FormData();
    // data.append("image", image);

    // try {
    //   const response = await fetch(
    //     "https://api.imgbb.com/1/upload?key=1e567c36c232bdfbf4a73c9b005586ba",
    //     {
    //       method: "POST",
    //       body: data,
    //     }
    //   );

    //   const resdata = await response.json();
    //   const uploadedImageUrl = resdata.data.display_url;

    console.log({
      recipeImage: uploadedImageUrl,
      recipeDetails,
      videoCode,
      country,
      category,
    });
    // } catch (error) {
    //   console.error("Image upload error:", error);
    // }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card-body shrink-0 w-full max-w-sm mx-auto "
    >
      <div className="text-center text-primary font-bold">Add Recipe</div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Recipe Image</span>
        </label>
        <input
          type="file"
          name="image"
          accept="image/*"
          className="file-input file-input-bordered w-full max-w-xs"
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Recipe Details</span>
        </label>
        <textarea
          className="textarea textarea-bordered"
          placeholder="Recipe details"
          value={recipeDetails}
          onChange={(e) => setRecipeDetails(e.target.value)}
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Embedded YouTube Video Code</span>
        </label>
        <input
          type="text"
          placeholder="YouTube video code"
          className="input input-bordered"
          value={videoCode}
          onChange={(e) => setVideoCode(e.target.value)}
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Country</span>
        </label>
        <input
          type="text"
          placeholder="Country"
          className="input input-bordered"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Category</span>
        </label>
        <select
          className="select select-bordered"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select category</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="non-vegetarian">Non-Vegetarian</option>
          <option value="vegan">Vegan</option>
          {/* Add more categories as needed */}
        </select>
      </div>
      <div className="form-control mt-6">
        <button type="submit" className="btn btn-primary">
          Add Recipe
        </button>
      </div>
    </form>
  );
};

export default AddRecipe;

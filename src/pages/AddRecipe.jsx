import React, { useState } from "react";
import axios from "axios";
import { postRecipe } from "../services/postRecipe";
import auth from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const [recipeImage, setRecipeImage] = useState(null);
  const [recipeDetails, setRecipeDetails] = useState("");
  const [videoCode, setVideoCode] = useState("");
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [user, loading] = useAuthState(auth);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };
  //   const handleUpload = async () => {
  //     if (!selectedFile) return;

  //     setUploading(true);

  //     const formData = new FormData();
  //     formData.append("image", selectedFile);

  //     try {
  //       const response = await axios.post(
  //         "https://api.imgbb.com/1/upload",
  //         formData,
  //         {
  //           params: {
  //             key: "YOUR_IMGBB_API_KEY", // Replace with your ImgBB API key
  //           },
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );

  //       setImageUrl(response.data.data.url);
  //     } catch (error) {
  //       console.error("Error uploading image:", error);
  //     } finally {
  //       setUploading(false);
  //     }
  //   };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!image) return;
    console.log("image: ", image);

    setUploading(true);

    const data = new FormData();
    data.append("image", image);

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        data,
        {
          params: {
            key: "339ad5cc8b64b015d634a06bdb99b805",
          },
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
          },
        }
      );

      setUploadedImageUrl(response.data.data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
    console.log("uploadedImageUrl: ", uploadedImageUrl);

    const recipe = {
      recipeImage: uploadedImageUrl,
      recipeDetails: recipeDetails,
      videoCode: videoCode,
      country: country,
      category: category,
      creatorEmail: user.email,
      watchCount: 0,
      purchasedBy: [],
    };
    console.log(recipe);

    const res = await postRecipe(recipe);
    console.log(res);
    if (res.success) {
      toast.success("Recipe added successfully");
      navigate("/all-recipe");
    } else {
      toast.error("Failed to add recipe");
    }
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
          onChange={handleFileChange}
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

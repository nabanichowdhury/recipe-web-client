export async function postRecipe(recipe) {
  try {
    const response = await fetch(
      "http://localhost:7001/api/recipe/post-recipe",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to post recipe");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    // Handle error
  }
}

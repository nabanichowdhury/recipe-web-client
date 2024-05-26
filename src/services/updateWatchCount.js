export async function updateWatchCount(id, name) {
  try {
    const para = {
      name: name,
    };
    const response = await fetch(
      `http://localhost:7001/api/recipe/update-count/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(para),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to UPDATE watch count");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    // Handle error
  }
}

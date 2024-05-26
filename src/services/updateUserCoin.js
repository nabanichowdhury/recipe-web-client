export async function updateUserCoin(userData) {
  try {
    const response = await fetch(
      "http://localhost:7001/api/users/update-user-coin",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to UPDATE user coin");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    // Handle error
  }
}

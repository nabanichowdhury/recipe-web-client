export async function createUser(userData) {
  try {
    const response = await fetch(
      "http://localhost:7001/api/users/create-user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    // Handle error
  }
}

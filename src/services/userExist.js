export async function checkUserExist(email) {
  try {
    const response = await fetch(
      `http://localhost:7001/api/users/get-user/${email}`
    );

    const data = await response.json();
    console.log(data);

    return data;

    // if (response.ok) {
    //   return data.exists;
    // } else {
    //   throw new Error(data.message);
    // }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to check user existence");
  }
}

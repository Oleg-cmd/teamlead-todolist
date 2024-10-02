import { getToken } from "../../../shared/api/getToken";

// Function to get the count of tasks based on the provided key
export const getCount = async (key) => {
  try {
    const token = await getToken(); // Retrieve JWT token

    const response = await fetch("/api/count", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + token,
      },
      body: JSON.stringify({ key }),
    });

    if (!response.ok) {
      console.error(`Error: ${response.status} ${response.statusText}`);
      return null;
    }

    return await response.json(); // Return parsed response data
  } catch (error) {
    console.error("Error fetching task count:", error);
    return null;
  }
};

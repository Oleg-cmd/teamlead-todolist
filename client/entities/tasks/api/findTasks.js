import { getToken } from "../../../shared/api/getToken";

// Function to find tasks based on parameters
export const findTasks = async (key, maxResults, startAt) => {
  try {
    const token = await getToken(); // Get JWT token

    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + token,
      },
      body: JSON.stringify({ key, maxResults, startAt }),
    });

    if (!response.ok) {
      console.error(`Error: ${response.status} ${response.statusText}`);
      return null;
    }

    return await response.json(); // Return parsed response data
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return null;
  }
};

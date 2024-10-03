import { getToken } from "../../../shared/api/getToken";

// Function to delete tasks based on id
export const deleteTask = async (issueID) => {
  try {
    const token = await getToken(); // Get JWT token

    const response = await fetch("/api/task/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + token,
      },
      body: JSON.stringify({ issueID }),
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

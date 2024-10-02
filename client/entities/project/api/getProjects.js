import { getToken } from "../../../shared/api/getToken";

// Function to fetch the list of projects
export const getProjects = async () => {
  try {
    const token = await getToken(); // Retrieve the JWT token

    const response = await fetch("/api/projects", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "JWT " + token, // Include the token
      },
    });

    return await response.json(); // Return parsed response data
  } catch (error) {
    console.error("Error fetching projects:", error); // Handle errors
  }
};

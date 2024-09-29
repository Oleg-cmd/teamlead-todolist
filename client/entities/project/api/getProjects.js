export const getProjects = async () => {
  try {
    const response = await fetch("/api/projects");

    if (!response.ok) {
      console.error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
};

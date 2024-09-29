import { jiraConfig } from "../../config.js";

export const fetchProjects = async () => {
  const response = await fetch(`${jiraConfig.baseUrl}/rest/api/3/project`, {
    method: "GET",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${jiraConfig.username}:${jiraConfig.password}`
      ).toString("base64")}`,
      Accept: "application/json",
    },
  });
  return response.json();
};

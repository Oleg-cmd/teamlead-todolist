import { jiraConfig } from "../../config.js";
import { formQuery } from "../../utils/formQuery.js";

export const fetchTasks = async (req) => {
  const response = await fetch(`${jiraConfig.baseUrl}/rest/api/3/search`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${jiraConfig.username}:${jiraConfig.password}`
      ).toString("base64")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formQuery(req)),
  });
  return response.json();
};

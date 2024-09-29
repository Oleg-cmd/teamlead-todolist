import { jiraConfig } from "../../config.js";

export const fetchTaskCount = async (req) => {
  const response = await fetch(
    `${jiraConfig.baseUrl}/rest/api/3/search/approximate-count`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${jiraConfig.username}:${jiraConfig.password}`
        ).toString("base64")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ jql: `project = ${req.body.key}` }),
    }
  );
  return response.json();
};

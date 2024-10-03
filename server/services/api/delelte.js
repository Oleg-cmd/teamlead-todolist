import { addon } from "../../../app.js";

export const remove = (req, endpoint) => {
  const client = addon.httpClient(req);

  if (!client) {
    console.error(
      "addon.httpClient(req) returned null. Please check authentication."
    );
    return Promise.reject(new Error("Authentication error"));
  }

  const options = {
    url: endpoint,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return new Promise((resolve, reject) => {
    client.del(options, (err, response, body) => {
      if (err) {
        console.error(`Error performing DELETE request to ${endpoint}:`, err, {
          response: response ? response.toJSON() : undefined,
        });
        reject(err);
        return;
      }

      // Handle non-200 status codes
      if (![200, 204].includes(response.statusCode)) {
        const error = `Error DELETE request to ${endpoint}: ${response.statusCode} ${response.statusMessage}`;
        console.error(error);
        reject(new Error(error));
        return;
      }

      // Handle 204 No Content (successful but no body)
      if (response.statusCode === 204) {
        resolve(null); // No content to return
        return;
      }

      try {
        // Some DELETE requests might not return JSON
        const parsedBody = body ? JSON.parse(body) : null;
        resolve(parsedBody);
      } catch (parseError) {
        console.error(
          `Error parsing JSON response from ${endpoint}:`,
          parseError
        );
        reject(parseError);
      }
    });
  });
};

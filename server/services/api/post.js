import { addon } from "../../../app.js";

export const post = (req, endpoint, data) => {
  const client = addon.httpClient(req);

  if (!client) {
    console.error(
      "addon.httpClient(req) returned null. Please check authentication."
    );
    return Promise.reject(new Error("Authentication error"));
  }

  const options = {
    url: endpoint,
    method: "POST",
    body: data, // Assuming you're sending JSON data
    headers: {
      "Content-Type": "application/json",
    },
  };

  return new Promise((resolve, reject) => {
    client.post(options, (err, response, body) => {
      if (err) {
        console.error(`Error performing POST request to ${endpoint}:`, err, {
          response: response ? response.toJSON() : undefined,
          requestBody: data,
        });
        reject(err);
        return;
      }

      // Check statuses
      if (![200, 201, 204].includes(response.statusCode)) {
        const error = `Error POST request to ${endpoint}: ${JSON.stringify(
          response ? response.toJSON() : undefined,
          null,
          2
        )}`;
        console.error(error);
        reject(error);
        return;
      }

      try {
        // Some POST requests might not return JSON
        const parsedBody = typeof body === "string" ? JSON.parse(body) : body;
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

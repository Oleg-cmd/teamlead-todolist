import { addon } from "../../../app.js";

export const get = (req, endpoint) => {
  const client = addon.httpClient(req);

  if (!client) {
    console.error(
      "addon.httpClient(req) returned null. Check the authentication."
    );
    return Promise.reject(new Error("Authentication error"));
  }

  return new Promise((resolve, reject) => {
    client.get(endpoint, (err, response, body) => {
      // Error handling
      if (err) {
        console.error(
          `Error during GET request to ${endpoint}:`,
          err, // Log the entire error object
          { response: response ? response.toJSON() : undefined } // Log response if available
        );
        reject(err);
        return;
      }

      // Check HTTP status
      if (response.statusCode !== 200) {
        const error = `Request error to ${endpoint}: ${JSON.stringify(
          response ? response.toJSON() : undefined,
          null,
          2
        )}`;
        reject(error);
        return;
      }

      // Parse JSON response
      try {
        const data = JSON.parse(body);
        resolve(data);
      } catch (parseError) {
        console.error(`JSON parsing error from ${endpoint}:`, parseError);
        reject(parseError);
      }
    });
  });
};

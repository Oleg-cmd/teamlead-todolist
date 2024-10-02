import { addon } from "../../../app.js";

export const post = (req, endpoint, data) => {
  const client = addon.httpClient(req);

  if (!client) {
    console.error(
      "addon.httpClient(req) вернул null. Проверьте аутентификацию."
    );
    return Promise.reject(new Error("Ошибка аутентификации"));
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
        console.error(
          `Ошибка при выполнении POST запроса к ${endpoint}:`,
          err,
          {
            response: response ? response.toJSON() : undefined,
            requestBody: data,
          }
        );
        reject(err);
        return;
      }

      // Проверка HTTP статуса (adjust success codes as needed)
      if (![200, 201].includes(response.statusCode)) {
        const error = `Ошибка POST запроса к ${endpoint}: ${JSON.stringify(
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
          `Ошибка парсинга JSON ответа от ${endpoint}:`,
          parseError
        );
        reject(parseError);
      }
    });
  });
};

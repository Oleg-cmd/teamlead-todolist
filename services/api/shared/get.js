import { addon } from "../../../app.js";

export const get = (req, endpoint) => {
  const client = addon.httpClient(req);

  if (!client) {
    console.error(
      "addon.httpClient(req) вернул null. Проверьте аутентификацию."
    );
    return Promise.reject(new Error("Ошибка аутентификации"));
  }

  return new Promise((resolve, reject) => {
    client.get(endpoint, (err, response, body) => {
      // Обработка ошибок
      if (err) {
        console.error(
          `Ошибка при выполнении GET запроса к ${endpoint}:`,
          err, // Log the entire error object
          { response: response ? response.toJSON() : undefined } // Log response if available
        );
        reject(err);
        return;
      }

      // Проверка HTTP статуса
      if (response.statusCode !== 200) {
        const error = `Ошибка запроса к ${endpoint}: ${JSON.stringify(
          response ? response.toJSON() : undefined,
          null,
          2
        )}`;
        // console.error(error);
        reject(error);
        return;
      }

      // Парсинг JSON ответа
      try {
        const data = JSON.parse(body);
        resolve(data);
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

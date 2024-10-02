import { post } from "../services/api/shared/post.js";
import { formQuery } from "../utils/formQuery.js";

export default function tasksRoutes(app, addon) {
  /**
   * @swagger
   * /api/tasks:
   *   post:
   *     summary: Получение списка задач из Jira
   *     description: Возвращает список задач Jira, соответствующих заданному JQL запросу.
   *     tags:
   *       - Tasks
   *     security:
   *       - jwtAuth: []
   *     parameters:
   *       - in: body
   *         name: body
   *         description: Параметры запроса к Jira (форматированные с помощью formQuery)
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             jql:
   *               type: string
   *               description: JQL запрос для фильтрации задач
   *               example: project = "My Project" AND status = "In Progress"
   *             maxResults:
   *               type: integer
   *               description: Максимальное количество возвращаемых задач
   *               example: 50
   *             startAt:
   *               type: integer
   *               description: Индекс первой возвращаемой задачи (для пагинации)
   *               example: 0
   *     responses:
   *       200:
   *         description: Успешный ответ с массивом задач
   *         schema:
   *           $ref: '#/components/schemas/Task'
   *       400:
   *         description: Неверный запрос (например, неверный JQL)
   *       401:
   *         description: Необходима аутентификация
   */
  app.post("/api/tasks", addon.checkValidToken(), async (req, res) => {
    const data = JSON.stringify(formQuery(req));
    const tasks = await post(req, "/rest/api/3/search", data);
    res.json(tasks);
  });

  /**
   * @swagger
   * /api/count:
   *   post:
   *     summary: Получение примерного количества задач в Jira
   *     description: Возвращает примерное количество задач Jira, соответствующих заданному JQL запросу.
   *     tags:
   *       - Tasks
   *     security:
   *       - jwtAuth: []
   *     parameters:
   *       - in: body
   *         name: body
   *         description: Ключ проекта Jira
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             key:
   *               type: string
   *               description: Ключ проекта Jira
   *               example: "MYPROJECT"
   *     responses:
   *       200:
   *         description: Успешный ответ с примерным количеством задач
   *       400:
   *         description: Неверный запрос (например, неверный ключ проекта)
   *       401:
   *         description: Необходима аутентификация
   */
  app.post("/api/count", addon.checkValidToken(), async (req, res) => {
    const data = JSON.stringify({ jql: `project = ${req.body.key}` });
    const count = await post(req, "/rest/api/3/search/approximate-count", data);
    res.json(count);
  });
}

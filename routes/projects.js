import { get } from "../services/api/shared/get.js";

export default function projectsRoutes(app, addon) {
  /**
   * @swagger
   * /api/projects:
   *   get:
   *     summary: Получение списка проектов Jira
   *     description: Возвращает список проектов Jira, доступных текущему пользователю.
   *     tags:
   *       - Projects
   *     security:
   *       - jwtAuth: []
   *     responses:
   *       200:
   *         description: Успешный ответ с массивом проектов
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/components/schemas/Project'
   *       401:
   *         description: Необходима аутентификация
   */
  app.get("/api/projects", addon.checkValidToken(), async function (req, res) {
    const projects = await get(req, "/rest/api/3/project");
    res.json(projects);
  });
}

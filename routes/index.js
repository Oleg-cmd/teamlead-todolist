import projectsRoutes from "./projects.js";
import tasksRoutes from "./tasks.js";

export default function routes(app, addon) {
  /**
   * @swagger
   * /:
   *   get:
   *     summary: Перенаправление на файл дескриптора приложения
   *     description: Перенаправляет на `/atlassian-connect.json`.
   *     responses:
   *       302:
   *         description: Перенаправление
   */
  app.get("/", (req, res) => {
    res.redirect("/atlassian-connect.json");
  });

  /**
   * @swagger
   * /todolist:
   *   get:
   *     summary: Отображение страницы TodoList
   *     description: Возвращает страницу TodoList для авторизованных пользователей.
   *     security:
   *       - jwtAuth: []
   *     responses:
   *       200:
   *         description: Страница TodoList
   *       401:
   *         description: Необходима аутентификация
   */
  app.get("/todolist", addon.authenticate(), (req, res) => {
    res.render("todolist.jsx", {
      title: "TodoList",
    });
  });

  projectsRoutes(app, addon);
  tasksRoutes(app, addon);
}

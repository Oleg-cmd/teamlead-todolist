import projectsRoutes from "./projects.js";
import tasksRoutes from "./tasks.js";

export default function routes(app, addon) {
  /**
   * @swagger
   * /:
   *   get:
   *     summary: Redirect to the application descriptor file
   *     description: Redirects to `/atlassian-connect.json`.
   *     responses:
   *       302:
   *         description: Redirection
   */
  app.get("/", (req, res) => {
    res.redirect("/atlassian-connect.json");
  });

  /**
   * @swagger
   * /todolist:
   *   get:
   *     summary: Display the TodoList page
   *     description: Returns the TodoList page for authorized users.
   *     security:
   *       - jwtAuth: []
   *     responses:
   *       200:
   *         description: TodoList page
   *       401:
   *         description: Authentication required
   */
  app.get("/todolist", addon.authenticate(), (req, res) => {
    res.render("todolist.jsx", {
      title: "TodoList",
    });
  });

  projectsRoutes(app, addon);
  tasksRoutes(app, addon);
}

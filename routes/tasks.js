import { post } from "../services/api/shared/post.js";
import { formQuery } from "../utils/formQuery.js";

export default function tasksRoutes(app, addon) {
  /**
   * @swagger
   * /api/tasks:
   *   post:
   *     summary: Retrieve the list of tasks from Jira
   *     description: Returns a list of Jira tasks matching the given JQL query.
   *     tags:
   *       - Tasks
   *     security:
   *       - jwtAuth: []
   *     parameters:
   *       - in: body
   *         name: body
   *         description: Request parameters for Jira (formatted using formQuery)
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             jql:
   *               type: string
   *               description: JQL query for task filtering
   *               example: project = "My Project" AND status = "In Progress"
   *             maxResults:
   *               type: integer
   *               description: Maximum number of tasks to return
   *               example: 50
   *             startAt:
   *               type: integer
   *               description: Index of the first task to return (for pagination)
   *               example: 0
   *     responses:
   *       200:
   *         description: Successful response with an array of tasks
   *         schema:
   *           $ref: '#/components/schemas/Task'
   *       400:
   *         description: Invalid request (e.g., incorrect JQL)
   *       401:
   *         description: Authentication required
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
   *     summary: Retrieve approximate task count in Jira
   *     description: Returns an approximate count of Jira tasks matching the given JQL query.
   *     tags:
   *       - Tasks
   *     security:
   *       - jwtAuth: []
   *     parameters:
   *       - in: body
   *         name: body
   *         description: Jira project key
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             key:
   *               type: string
   *               description: Jira project key
   *               example: "MYPROJECT"
   *     responses:
   *       200:
   *         description: Successful response with approximate task count
   *       400:
   *         description: Invalid request (e.g., incorrect project key)
   *       401:
   *         description: Authentication required
   */
  app.post("/api/count", addon.checkValidToken(), async (req, res) => {
    const data = JSON.stringify({ jql: `project = ${req.body.key}` });
    const count = await post(req, "/rest/api/3/search/approximate-count", data);
    res.json(count);
  });
}

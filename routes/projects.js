import { get } from "../services/api/shared/get.js";

export default function projectsRoutes(app, addon) {
  /**
   * @swagger
   * /api/projects:
   *   get:
   *     summary: Retrieve the list of Jira projects
   *     description: Returns a list of Jira projects available to the current user.
   *     tags:
   *       - Projects
   *     security:
   *       - jwtAuth: []
   *     responses:
   *       200:
   *         description: Successful response with an array of projects
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/components/schemas/Project'
   *       401:
   *         description: Authentication required
   */
  app.get("/api/projects", addon.checkValidToken(), async function (req, res) {
    const projects = await get(req, "/rest/api/3/project");
    res.json(projects);
  });
}

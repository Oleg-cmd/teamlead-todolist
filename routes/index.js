import { fetchTaskCount } from "../services/count/fetchTaskCount.js";
import { fetchProjects } from "../services/projects/fetchProjects.js";
import { fetchTasks } from "../services/tasks/fetchTasks.js";

export default function routes(app, addon) {
  app.get("/", (req, res) => {
    res.redirect("/atlassian-connect.json");
  });

  app.get("/todolist", addon.authenticate(), (req, res) => {
    res.render("todolist.jsx", {
      title: "TodoList",
    });
  });

  app.post("/api/tasks", async (req, res) => {
    try {
      const data = await fetchTasks(req);
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).send("Ошибка при получении задач");
    }
  });

  app.post("/api/count", async (req, res) => {
    try {
      const data = await fetchTaskCount(req);
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).send("Ошибка при получении количества задач");
    }
  });

  app.get("/api/projects", async (req, res) => {
    try {
      const data = await fetchProjects();
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).send("Ошибка при получении проектов");
    }
  });
}

import projectsRouter from "./projects/projects.router.js";
import tasksRouter from "./tasks/tasks.router.js";

export default function routes(app, addon) {
  app.get("/", (req, res) => {
    res.redirect("/atlassian-connect.json");
  });

  app.get("/todolist", addon.authenticate(), (req, res) => {
    res.render("todolist.jsx", {
      title: "TodoList",
    });
  });

  app.use("/api/projects", projectsRouter);
  app.use("/api/task", tasksRouter);

  // Centralized error handler
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({ message: err.message });
  });
}

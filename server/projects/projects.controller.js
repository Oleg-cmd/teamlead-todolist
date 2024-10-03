import { getProjects } from "./projects.service.js";

export const getProjectsController = async (req, res, next) => {
  try {
    const projects = await getProjects(req);
    res.json(projects);
  } catch (error) {
    next(error); // centralized
  }
};

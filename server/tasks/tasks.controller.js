import { getTasks, getCount, deleteTask } from "./tasks.service.js";
import { formQuery } from "../utils/formQuery.js";

export const getTasksController = async (req, res, next) => {
  try {
    const data = JSON.stringify(formQuery(req));
    const tasks = await getTasks(req, data);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export const getCountController = async (req, res, next) => {
  try {
    const data = JSON.stringify({ jql: `project = ${req.body.key}` });
    const count = await getCount(req, data);
    res.json(count);
  } catch (error) {
    next(error);
  }
};

export const deleteTaskController = async (req, res, next) => {
  try {
    const issueID = req.body.issueID;

    if (!issueID) {
      return res.status(400).json({ error: "Issue ID is required" });
    }

    const issueEndpoint = `/rest/api/3/issue/${issueID}`;
    const deleted = await deleteTask(req, issueEndpoint);
    res.json(deleted);
  } catch (error) {
    next(error);
  }
};

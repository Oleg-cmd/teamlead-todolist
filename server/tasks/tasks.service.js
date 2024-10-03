import { remove } from "../services/api/delelte.js";
import { post } from "../services/api/post.js";

export const getTasks = async (req, data) => {
  const endpoint = "/rest/api/3/search";
  const tasks = await post(req, endpoint, data);
  return tasks;
};

export const getCount = async (req, data) => {
  const endpoint = "/rest/api/3/search/approximate-count";
  const count = await post(req, endpoint, data);
  return count;
};

export const deleteTask = async (req, issueEndpoint) => {
  const deleted = await remove(req, issueEndpoint);
  return deleted;
};

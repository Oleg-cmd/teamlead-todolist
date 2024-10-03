import { get } from "../services/api/get.js";

export const getProjects = async (req) => {
  const endpoint = "/rest/api/3/project";
  const projects = await get(req, endpoint);
  return projects;
};

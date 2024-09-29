import fs from "fs";

const credentials = JSON.parse(fs.readFileSync("credentials.json"));
const currentHost = Object.keys(credentials.hosts)[0];

export const jiraConfig = {
  baseUrl: currentHost,
  username: credentials.hosts[currentHost].username,
  password: credentials.hosts[currentHost].password,
};

import swaggerUi from "swagger-ui-express";
import yaml from "js-yaml";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const yamlPath = path.join(__dirname, "swagger.yaml");

const swaggerDocument = yaml.load(fs.readFileSync(yamlPath, "utf8"));

export function swagger(app) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";

// current dir
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const definitionsPath = path.join(__dirname, "definitions.yaml");

const definitions = yaml.load(fs.readFileSync(definitionsPath, "utf8"));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "Documentation for Addon REST API",
    },
    components: {
      schemas: definitions.components.schemas,
    },
  },
  apis: ["./routes/*.js"],
};

const openapiSpecification = swaggerJsdoc(options);

export function swagger(app) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
}

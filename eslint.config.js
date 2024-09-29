const path = require("path");

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: "babel-eslint",
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ["@shared", path.resolve(__dirname, "/client/shared")],
          ["@entities", path.resolve(__dirname, "/client/entities")],
          ["@features", path.resolve(__dirname, "/client/features")],
          ["@app", path.resolve(__dirname, "/client/app")],
        ],
        extensions: [".js", ".jsx"],
      },
    },
  },
  rules: {
    "import/no-unresolved": "error",
  },
};

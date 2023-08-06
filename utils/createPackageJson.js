const { logInfo } = require("./logs");
const path = require("path");
const fs = require("fs").promises;

async function createPackageJson(targetPath, projectName) {
  const packageData = {
    name: projectName,
    version: "1.0.0",
    description: `A project created with the CLI: ${projectName}`,
    main: "index.js",
    scripts: {
      start: "node server.js",
    },
    keywords: [],
    author: "",
    license: "MIT",
    dependencies: {
      napnux: "*",
    },
  };

  const packageJsonPath = path.join(targetPath, "package.json");

  await fs.writeFile(packageJsonPath, JSON.stringify(packageData, null, 2));
  logInfo(`Created package.json: ${packageJsonPath}`);
}

module.exports = createPackageJson;

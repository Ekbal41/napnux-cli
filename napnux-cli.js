#!/usr/bin/env node

const { program } = require("commander");
const fs = require("fs").promises;
const path = require("path");
const { green, red, blue, bold } = require("colorette");
const { exec } = require("child_process"); // Add this import

program
  .version("1.0.0")
  .command("create-project <projectName>")
  .action(async (projectName) => {
    const sourcePath = path.join(__dirname, "templates", "project-temp");
    const targetPath = path.join(process.cwd(), projectName);

    console.log(bold(blue(`Creating project: ${projectName}`)));

    try {
      await fs.mkdir(targetPath);
      await copyFolderRecursive(sourcePath, targetPath);
      await createPackageJson(targetPath, projectName);
      await installDependencies(targetPath);
      console.log(green(`Project ${projectName} created successfully.`));
    } catch (error) {
      console.error(red("Error creating project:"), error);
    }
  });

program.parse(process.argv);

async function copyFolderRecursive(source, target) {
  try {
    const files = await fs.readdir(source);

    for (const file of files) {
      const sourceFilePath = path.join(source, file);
      const targetFilePath = path.join(target, file);

      const stats = await fs.stat(sourceFilePath);

      if (stats.isDirectory()) {
        await fs.mkdir(targetFilePath);
        console.log(bold(green(`   Created folder: ${targetFilePath}`)));
        await copyFolderRecursive(sourceFilePath, targetFilePath);
      } else {
        await fs.copyFile(sourceFilePath, targetFilePath);
        console.log(bold(green(`   Copied file: ${targetFilePath}`)));
      }
    }
  } catch (error) {
    throw error;
  }
}

async function createPackageJson(targetPath, projectName) {
  const packageData = {
    name: projectName,
    version: "1.0.0",
    description: `A project created with the CLI: ${projectName}`,
    main: "index.js",
    scripts: {
      start: "node index.js",
    },
    keywords: [],
    author: "",
    license: "ISC",
    dependencies: {
      napnus: "^1.0.1",
    },
  };

  const packageJsonPath = path.join(targetPath, "package.json");

  await fs.writeFile(packageJsonPath, JSON.stringify(packageData, null, 2));
  console.log(bold(green(`   Created package.json: ${packageJsonPath}`)));
}

async function installDependencies(targetPath) {
  console.log(bold(blue("Installing dependencies...")));

  const npmInstall = exec("npm install", { cwd: targetPath });

  return new Promise((resolve, reject) => {
    npmInstall.on("close", (code) => {
      if (code === 0) {
        console.log(green("Dependencies installed successfully."));
        resolve();
      } else {
        console.error(red("Error installing dependencies."));
        reject(new Error(`npm install exited with code ${code}`));
      }
    });
  });
}

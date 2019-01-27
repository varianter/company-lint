import { writeFile } from "fs";
import prompts from "prompts";
import { join } from "path";
import chalk from "chalk";

import { emptyObj } from "../lib/helpers";
import config from "../lib/config";

const win = process.platform === "win32";
const home = win ? process.env.USERPROFILE : process.env.HOME;

export default async function configCommand() {
  if (!home) {
    throw new Error("Could not find home directory");
  }

  const storage = join(home, ".companylintrc");

  if (config.set) {
    console.log(chalk.cyan("Existing configuration:"));
    console.log(`    API: ${config.api}`);
    console.log(`  Token: ${config.token}\n\n`);
  }

  const res = await prompts([
    {
      type: "text",
      name: "api",
      message: "Specify URL to API endpoints",
      initial: config.api
    },
    {
      type: "text",
      name: "token",
      message: "Specify token for ADD endpoint (optional)",
      initial: config.token
    }
  ]);

  if (emptyObj(res)) return;

  await writeFileP(storage, {
    ...res,
    set: true
  });
  console.log(chalk.green(`Updated configuration on path ${storage}`));
}

function writeFileP<T>(path: string, data: T): Promise<void> {
  return new Promise(function(res, rej) {
    writeFile(path, JSON.stringify(data, null, 2), function(err) {
      if (err) return rej(err);
      res();
    });
  });
}

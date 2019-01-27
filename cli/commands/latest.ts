import { empty } from "../helpers";
import { latest } from "../api";
import print from "../printer";
import chalk from "chalk";

export default async function() {
  const l = await latest();
  if (empty(l.categories)) {
    return console.log(chalk.red("No lint sets found."));
  }

  console.log(
    chalk.cyan(`Latest lint set (created ${new Date(Number(l.created))})`)
  );
  print(l.categories);
}

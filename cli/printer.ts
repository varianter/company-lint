import { LintCategory, LintRule } from "../lib/types";
import chalk from "chalk";

function printRuleSet(rule: LintRule) {
  if (rule.assert) {
    console.log(chalk.green(`  ✔︎ ${rule.question}`));
  } else {
    console.log(chalk.red(`  ⨯ ${rule.question}`));
  }
  if (rule.comment) {
    console.log(chalk.italic(`    Comment: ${rule.comment}`));
  }
  if (rule.suggestedEdit) {
    console.log(chalk.italic(`    Suggeste edit: ${rule.suggestedEdit}`));
  }
  if (rule.shouldBeRemoved) {
    console.log(chalk.italic(`    Should not be included next time.`));
  }
}

const add = (a: number, b: number) => a + b;
function printNumberOfSuccesses(category: LintCategory) {
  const total = category.questions.length;
  const success = category.questions.map(i => Number(i.assert)).reduce(add, 0);

  if (total !== success) {
    console.log(
      chalk.red(`Some rules didn't pass (success ${success}/${total})`)
    );
  } else {
    console.log(
      chalk.green(`All rules cleared (success ${success}/${total}) `)
    );
  }
}

function printCategory(category: LintCategory) {
  console.log(category.name);
  category.questions.forEach(printRuleSet);
  printNumberOfSuccesses(category);
  console.log("");
}

export default function print(ruleSet: LintCategory[]): void {
  console.log("\n\nRule set:");
  ruleSet.forEach(printCategory);
}

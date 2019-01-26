import fromRuleSet from "./prompt-flows/from-ruleset";
import newRuleSet from "./prompt-flows/new-ruleset";

import { LintCategory } from "../lib/types";
import { latest, add } from "./api";

function empty(obj: LintCategory[]) {
  if (!obj || Object.keys(obj).length === 0) {
    return true;
  }
  if (obj.length === 0) {
    return true;
  }
  const questions = obj
    .map(category => category.questions.length)
    .reduce((a, b) => a + b, 0);
  return questions === 0;
}

async function start() {
  const l = await latest();
  let data = await (empty(l.categories)
    ? newRuleSet()
    : fromRuleSet(l.categories));

  if (empty(data)) {
    return console.log("Empty rule set. Not storing.");
  }

  try {
    const id = await add(data);
    console.log(`Stored lint results (id ${id})`);
  } catch (e) {
    console.log("Could not save:", e.message);
  }
}

start();

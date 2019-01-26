// import prompts from "prompts";
import fromRuleSet from "./prompt-flows/from-ruleset";
import newRuleSet from "./prompt-flows/new-ruleset";

import { latest } from "./api";

function empty<T>(obj: T) {
  return Object.keys(obj).length === 0;
}

async function start() {
  const l = await latest();
  let data = await (empty(l.categories)
    ? newRuleSet()
    : fromRuleSet(l.categories));

  console.log("New set:", JSON.stringify(data, null, 2));
  // add(data);
}

start();

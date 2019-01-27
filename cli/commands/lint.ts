import fromRuleSet from "../prompt-flows/from-ruleset";
import newRuleSet from "../prompt-flows/new-ruleset";

import { latest, add } from "../api";
import print from "../printer";
import { confirm } from "../prompt-flows/questions";
import { empty } from "../helpers";

export default async function start() {
  const l = await latest();
  let data = await (empty(l.categories)
    ? newRuleSet()
    : fromRuleSet(l.categories));

  if (empty(data)) {
    return console.log("Empty rule set. Not storing.");
  }

  print(data);
  const save = await confirm("Save rule set?");

  try {
    const id = await add({
      save,
      categories: data
    });

    if (save) {
      console.log(`Stored lint results (id ${id})`);
    }
  } catch (e) {
    console.log("Could not save:", e.message);
  }
}

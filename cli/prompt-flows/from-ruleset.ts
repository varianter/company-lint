import { confirm, questionLoop, categoryLoop } from "./utils";
import { LintCategory, LintRule } from "../../lib/types";
import prompts from "prompts";

async function answer(
  originalQuestion: LintRule
): Promise<LintRule | undefined> {
  const question = originalQuestion.suggestedEdit || originalQuestion.question;

  const assert = await prompts({
    type: "confirm",
    name: "assert",
    message: question,
    initial: true
  });

  if (typeof assert.assert === "undefined") {
    return undefined;
  }
  const removeQuestion = await prompts({
    type: "confirm",
    name: "remove",
    message: "Should this question be removed?",
    initial: false
  });
  if (removeQuestion.remove) {
    return undefined;
  }

  const comment = await prompts({
    type: "text",
    name: "comment",
    message: "Any comments on the point? (leave empty if not)"
  });
  const suggestedEdit = await prompts({
    type: "text",
    name: "suggestedEdit",
    message: "Any change to the original question? (leave empty if not)"
  });

  return {
    question,
    assert: assert.assert,
    comment: comment.comment,
    suggestedEdit: suggestedEdit.suggestedEdit
  };
}

async function fromCategory(category: LintCategory): Promise<LintCategory> {
  console.log(`\n${category.name}:`);
  let questions: LintRule[] = [];
  for (let question of category.questions) {
    const result = await answer(question);
    if (result) {
      questions.push(result);
    }
  }

  if (await confirm("Any additional questions?")) {
    questions = questions.concat(await questionLoop());
  }

  return {
    name: category.name,
    questions
  };
}

export default async function(
  previous: LintCategory[]
): Promise<LintCategory[]> {
  console.log("Creating lint rule set based on previous lint sets");

  let categories: LintCategory[] = [];
  for (let category of previous) {
    const result = await fromCategory(category);
    categories.push(result);
  }

  console.log("\n");
  if (await confirm("Any additional categories?")) {
    categories = categories.concat(await categoryLoop());
  }

  return categories;
}
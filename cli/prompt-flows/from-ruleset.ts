import { confirm, questionLoop, categoryLoop } from "./utils";
import { LintCategory, LintRule } from "../../lib/types";
import prompts from "prompts";

type EditTypes = "ShouldRemove" | "Comment" | "SuggestEdit" | "NoChange";

export async function editQuestion(): Promise<EditTypes> {
  const res = await prompts({
    type: "select",
    name: "edit",
    message: "Any change or comment to the question?",
    choices: [
      { title: "No changes", value: "NoChange" },
      { title: "Should be removed", value: "ShouldRemove" },
      { title: "Add comment", value: "Comment" },
      { title: "Suggest edit", value: "SuggestEdit" }
    ]
  });

  if (typeof res.edit === "undefined") {
    return "NoChange";
  }

  return res.edit as EditTypes;
}

async function editLoop(rule: LintRule): Promise<LintRule> {
  let edit: EditTypes;
  while ((edit = await editQuestion()) !== "NoChange") {
    switch (edit) {
      case "Comment":
        const comment = await prompts({
          type: "text",
          name: "comment",
          message: "Any comments on the point? (leave empty if not)"
        });

        rule = {
          ...rule,
          comment: comment.comment
        };
        break;

      case "ShouldRemove":
        const removeQuestion = await prompts({
          type: "confirm",
          name: "remove",
          message: "Should this question be removed?",
          initial: false
        });

        rule = {
          ...rule,
          shouldBeRemoved: removeQuestion.remove
        };
        break;

      case "SuggestEdit":
        const suggestedEdit = await prompts({
          type: "text",
          name: "suggestedEdit",
          message: "Any change to the original question? (leave empty if not)"
        });
        rule = {
          ...rule,
          suggestedEdit: suggestedEdit.suggestedEdit
        };
        break;
    }
  }

  return rule;
}

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

  return editLoop({
    question,
    assert: Boolean(assert.assert)
  });
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

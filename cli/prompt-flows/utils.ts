import prompts from "prompts";
import { LintRule, LintCategory } from "../../lib/types";
const opts = {
  onCancel() {
    return false;
  }
};

export async function confirm(message: string): Promise<boolean> {
  const res = await prompts({
    type: "confirm",
    name: "more",
    message,
    initial: true
  });

  if (typeof res.more === "undefined") {
    return false;
  }

  return res.more as boolean;
}

export async function newCategoryConfirm(): Promise<boolean> {
  return confirm("Add more categories?");
}

export async function newQuestionConfirm(): Promise<boolean> {
  return confirm("Add more questions?");
}

export async function questionLoop(): Promise<LintRule[]> {
  let addMoreQuestions = true;
  let questions: LintRule[] = [];

  do {
    const question = await newQuestion();
    if (question) {
      questions.push(question);
    }

    addMoreQuestions = await newQuestionConfirm();
  } while (addMoreQuestions);
  return questions;
}

export async function newCategory(): Promise<LintCategory | undefined> {
  const res = await prompts({
    type: "text",
    name: "name",
    message: "What's the category name?"
  });

  if (!res.name) {
    return undefined;
  }

  let questions: LintRule[] = await questionLoop();

  return {
    name: res.name,
    questions
  };
}

export async function categoryLoop(): Promise<LintCategory[]> {
  let addMoreQuestions = true;

  let categories: LintCategory[] = [];
  do {
    const category = await newCategory();
    if (category) {
      categories.push(category);
    }

    addMoreQuestions = await newCategoryConfirm();
  } while (addMoreQuestions);

  return categories;
}

export async function newQuestion(): Promise<LintRule | undefined> {
  const res = await prompts(
    [
      {
        type: "text",
        name: "question",
        message: "What's the rule?"
      },
      {
        type: "confirm",
        name: "assert",
        message: "Was it a success?",
        initial: true
      }
    ],
    opts
  );

  if (!res.question || typeof res.assert === "undefined") {
    return undefined;
  }

  return res as LintRule;
}

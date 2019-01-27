import prompts from "prompts";
import { LintRule, LintCategory } from "../../lib/types";

type ThunkPredicate = () => Promise<boolean>;

const opts = {
  onCancel() {
    return false;
  }
};

export async function confirmLoop<T>(
  predicate: ThunkPredicate,
  adder: () => Promise<T | []>
): Promise<T[]> {
  let addMore = true;
  let data: T[] = [];

  do {
    data = data.concat(await adder());
    addMore = await predicate();
  } while (addMore);
  return data;
}

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
  return confirm("Add more lint rules?");
}

export async function questionLoop(): Promise<LintRule[]> {
  return confirmLoop(newQuestionConfirm, async () => {
    const question = await newQuestion();
    return question ? question : [];
  });
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
  return confirmLoop(newCategoryConfirm, async () => {
    const category = await newCategory();
    return category ? category : [];
  });
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
        message: "Was it accomplished?",
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

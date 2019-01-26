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
  return confirm("Legge til flere kategorier?");
}

export async function newQuestionConfirm(): Promise<boolean> {
  return confirm("Legge til flere spørsmål?");
}

export async function newCategory(): Promise<LintCategory | undefined> {
  const res = await prompts({
    type: "text",
    name: "name",
    message: "Hva heter kategoriern?"
  });

  if (!res.name) {
    return undefined;
  }

  let addMoreQuestions = true;
  let questions: LintRule[] = [];

  do {
    const question = await newQuestion();
    if (question) {
      questions.push(question);
    }

    addMoreQuestions = await newQuestionConfirm();
  } while (addMoreQuestions);

  return {
    name: res.name,
    questions
  };
}

export async function newQuestion(): Promise<LintRule | undefined> {
  const res = await prompts(
    [
      {
        type: "text",
        name: "question",
        message: "Hva er regelen?"
      },
      {
        type: "confirm",
        name: "assert",
        message: "Evaluert som grønn test?",
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

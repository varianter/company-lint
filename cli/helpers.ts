import { LintCategory } from "../lib/types";

export function empty(obj: LintCategory[]) {
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

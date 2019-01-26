import { LintCategory } from "../../lib/types";
import { newCategoryConfirm, newCategory } from "./utils";

export default async function(): Promise<LintCategory[]> {
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

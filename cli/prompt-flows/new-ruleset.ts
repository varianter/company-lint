import { LintCategory } from "../../lib/types";
import { categoryLoop } from "./questions";

export default async function(): Promise<LintCategory[]> {
  console.log("Creating new lint rule set");
  return categoryLoop();
}

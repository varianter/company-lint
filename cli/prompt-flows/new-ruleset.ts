import { LintCategory } from "../index.d";
import { categoryLoop } from "./questions";

export default async function(): Promise<LintCategory[]> {
  console.log("Creating new lint rule set");
  return categoryLoop();
}

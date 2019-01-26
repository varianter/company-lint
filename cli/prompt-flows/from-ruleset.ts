import { LintCategory } from "../../lib/types";

export default function(_: LintCategory[]): Promise<LintCategory[]> {
  console.log("Create ruleset from copy");
  return Promise.resolve([]);
}

import { json } from "../../lib/api";
import { LintRuleSet } from "../../lib/types";

const handler = json<LintRuleSet, LintRuleSet>(async function(
  respond,
  collection
) {
  const lints = await collection
    .find()
    .sort({ created: -1 })
    .limit(1)
    .toArray();

  return respond(lints[0] || {});
});

export default handler;

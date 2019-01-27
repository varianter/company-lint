import { json } from "../../api-lib/api";
import { LintRuleSet } from "../../api-lib/types";

const handler = json<LintRuleSet, LintRuleSet>(async function(
  respond,
  collection
) {
  const lints = await collection
    .find({ save: true })
    .sort({ created: -1 })
    .limit(1)
    .toArray();

  return respond(lints[0] || {});
});

export default handler;

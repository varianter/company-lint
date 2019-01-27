import { json } from "../../lib/api";
import { LintRuleSet } from "../../lib/types";

type RespondType = { success: true; lints: LintRuleSet[] };

const handler = json<LintRuleSet, RespondType>(async function(
  respond,
  collection
) {
  const data = await collection.find({ save: true });
  const lints = await data.toArray();

  return respond({
    success: true,
    lints
  });
});

export default handler;

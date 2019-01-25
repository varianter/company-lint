import { json } from "../../lib/api";
import { LintRule } from "../../lib/types";

const handler = json(async function(respond, collection) {
  const lints = await collection
    .find<LintRule>({})
    .sort({ created: -1 })
    .limit(1)
    .toArray();
  return respond(lints[0]);
});

export default handler;

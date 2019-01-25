import { json } from "../../lib/api";
import { LintRule } from "../../lib/types";

const handler = json(async function(respond, collection) {
  const data = await collection.find<LintRule>({});
  const lints = await data.toArray();

  return respond({ lints });
});

export default handler;

import { LintRuleSet, AddRespondType } from "../../cli";
import { lintRuleDecoder } from "../../api-lib/types.validation";
import { jsonSecured, jsonBody } from "../../api-lib/api";
import { constants } from "http2";

const handler = jsonSecured<LintRuleSet, AddRespondType>(async function(
  respond,
  collection,
  { req, error }
) {
  try {
    if (req.method !== "POST") {
      throw new Error("Method not allowed");
    }

    const data = await jsonBody<LintRuleSet>(req);
    const lintRuleSet = lintRuleDecoder.runWithException(data);
    const result = await collection.insertOne({
      ...lintRuleSet,
      created: Date.now().toString()
    });

    respond({
      success: true,
      inserted: result.insertedId.toHexString()
    });
  } catch (e) {
    error(constants.HTTP_STATUS_BAD_REQUEST, {
      success: false,
      error: e.message
    });
  }
});

export default handler;

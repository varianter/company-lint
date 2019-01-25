import { lintRuleDecoder } from "../../lib/types.validation";
import { json, jsonBody } from "../../lib/api";
import { LintRuleSet } from "../../lib/types";
import { ObjectId } from "mongodb";
import { constants } from "http2";

type RespondBase = { success: boolean };
type RespondType =
  | RespondBase & { inserted: ObjectId }
  | RespondBase & { error: string };

const handler = json<LintRuleSet, RespondType>(async function(
  respond,
  collection,
  { req, error }
) {
  try {
    if (req.method !== "POST") {
      throw new Error("Method not allowed");
    }

    const data = await jsonBody(req);
    const lintRules = lintRuleDecoder.runWithException(data);

    const result = await collection.insertOne({
      created: Date.now().toString(),
      questions: lintRules
    });

    respond({
      success: true,
      inserted: result.insertedId
    });
  } catch (e) {
    error(constants.HTTP_STATUS_BAD_REQUEST, {
      success: false,
      error: e.message
    });
  }
});

export default handler;

import { LintCategory } from "./types";
import {
  Decoder,
  object,
  string,
  boolean,
  array,
  optional
} from "@mojotech/json-type-validation";

export const lintRuleDecoder: Decoder<Array<LintCategory>> = array(
  object({
    name: string(),
    questions: array(
      object({
        question: string(),
        assert: boolean(),
        comment: optional(string()),
        suggestedEdit: optional(string())
      })
    )
  })
);

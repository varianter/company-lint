import { LintRuleSet } from "./types";
import {
  Decoder,
  object,
  string,
  boolean,
  array,
  optional
} from "@mojotech/json-type-validation";

export const lintRuleDecoder: Decoder<LintRuleSet> = object({
  created: optional(string()),
  save: boolean(),
  categories: array(
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
  )
});

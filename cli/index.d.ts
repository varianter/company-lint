// Type definitions for @variant/lint 1.0.0
// Project: @variant/lint
// Definitions by: Mikael Brevik <https://mib.im>

export function connect(config: Configuration): LintData;

export type Configuration = {
  api: string;
  token?: string;
  set?: boolean;
};

export interface LintData {
  all(): Promise<LintRuleSet[]>;
  latest(): Promise<LintRuleSet>;
  add(rulest: LintRuleSet): Promise<string>;
}

export type AddRespondType =
  | { success: true; inserted: string }
  | { success: false; error: string };

export type LintRule = {
  question: string;
  assert: boolean;
  comment?: string;
  suggestedEdit?: string;
  shouldBeRemoved?: boolean;
};

export type LintCategory = {
  name: string;
  questions: Array<LintRule>;
};

export type LintRuleSet = {
  created?: string;
  save: boolean;
  categories: Array<LintCategory>;
};

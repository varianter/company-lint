export type LintRule = {
  question: string;
  assert: boolean;
  comment?: string;
  suggestedEdit?: string;
};

export type LintCategory = {
  name: string;
  questions: Array<LintRule>;
};

export type LintRuleSet = {
  created: string;
  categories: Array<LintCategory>;
};

export type AddRespondType =
  | { success: true; inserted: string }
  | { success: false; error: string };

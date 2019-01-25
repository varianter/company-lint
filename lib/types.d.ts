export type LintRule = {
  question: string;
  assert: boolean;
  comment?: string;
  suggestedEdit?: string;
};

export type LintRuleSet = {
  created: string;
  questions: Array<LintRule>;
};

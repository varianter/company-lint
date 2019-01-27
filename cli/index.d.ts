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

export function all(): Promise<LintRuleSet[]>;
export function latest(): Promise<LintRuleSet>;
export function add(rulest: LintRuleSet): Promise<string>;

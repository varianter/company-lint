import fetch, { Headers } from "node-fetch";
import { LintRuleSet, Configuration, LintData, AddRespondType } from "..";

export default function connect(config: Configuration): LintData {
  return {
    async latest() {
      return request<LintRuleSet>(config, "latest");
    },

    async all() {
      return request<LintRuleSet[]>(config, "all");
    },

    async add(ruleset: LintRuleSet) {
      const result = await post<LintRuleSet, AddRespondType>(
        config,
        "add",
        ruleset
      );
      if (!result.success) {
        throw new Error(result.error);
      }

      return result.inserted;
    }
  };
}

async function request<T>(config: Configuration, endpoint: string): Promise<T> {
  const url = `${padUrl(config.api)}api/${endpoint}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function post<G, T>(
  config: Configuration,
  endpoint: string,
  data: G
): Promise<T> {
  const url = `${padUrl(config.api)}api/${endpoint}`;
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: getHeaders(config)
  });

  const result = await response.json();
  return result;
}

function padUrl(url: string): string {
  return url.replace(/\/$/, "") + "/";
}

function getHeaders(config: Configuration): Headers {
  if (!config.password) {
    return new Headers();
  }

  return new Headers({
    Authorization: `Bearer ${config.password}`
  });
}

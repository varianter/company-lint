import fetch, { Headers } from "node-fetch";

import { LintRuleSet, AddRespondType } from "../lib/types";
import config from "./config";

export async function latest() {
  return request<LintRuleSet>("latest");
}

export async function all() {
  return request<LintRuleSet[]>("all");
}

export async function add(ruleset: LintRuleSet) {
  const result = await post<LintRuleSet, AddRespondType>("add", ruleset);
  if (!result.success) {
    throw new Error(result.error);
  }

  return result.inserted;
}

async function request<T>(endpoint: string): Promise<T> {
  const url = `${padUrl(config.api)}api/${endpoint}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function post<G, T>(endpoint: string, data: G): Promise<T> {
  const url = `${padUrl(config.api)}api/${endpoint}`;
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: getHeaders()
  });

  const result = await response.json();
  return result;
}

function padUrl(url: string): string {
  return url.replace(/\/$/, "") + "/";
}

function getHeaders(): Headers {
  if (!config.password) {
    return new Headers();
  }

  return new Headers({
    Authorization: `Bearer ${config.password}`
  });
}

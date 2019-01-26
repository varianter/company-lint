import fetch from "node-fetch";
import config from "./config";
import { LintRuleSet } from "../lib/types";

function padUrl(url: string): string {
  return url.replace(/\/$/, "") + "/";
}

async function request<T>(endpoint: string): Promise<T> {
  const url = `${padUrl(config.api)}api/${endpoint}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function latest() {
  return request<LintRuleSet>("latest");
}

export async function all() {
  return request<LintRuleSet[]>("all");
}

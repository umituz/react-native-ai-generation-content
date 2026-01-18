/**
 * Rule Executor
 * Chain of Responsibility pattern for URL extraction
 * Tries each rule in order, returns first successful extraction
 */

import type { ExtractionRule } from "./extraction-rules";

declare const __DEV__: boolean;

/**
 * Get value from object by path array
 * Supports array indices as string numbers: ['images', '0', 'url']
 */
function getValueByPath(obj: unknown, path: readonly string[]): unknown {
  let current: unknown = obj;

  for (const key of path) {
    if (current === null || current === undefined) {
      return undefined;
    }

    if (typeof current !== "object") {
      return undefined;
    }

    const record = current as Record<string, unknown>;
    current = record[key];
  }

  return current;
}

/**
 * Execute extraction rules in order
 * Returns first successful string extraction or undefined
 */
export function executeRules(
  result: unknown,
  rules: readonly ExtractionRule[],
  debugPrefix?: string,
): string | undefined {
  if (typeof result !== "object" || result === null) {
    return undefined;
  }

  if (__DEV__ && debugPrefix) {
    console.log(`[${debugPrefix}] Result keys:`, Object.keys(result as object));
  }

  for (const rule of rules) {
    const value = getValueByPath(result, rule.path);

    if (typeof value === "string" && value.length > 0) {
      if (__DEV__ && debugPrefix) {
        console.log(`[${debugPrefix}] Found via ${rule.description}:`, value);
      }
      return value;
    }
  }

  if (__DEV__ && debugPrefix) {
    console.log(`[${debugPrefix}] No URL found in result`);
  }

  return undefined;
}

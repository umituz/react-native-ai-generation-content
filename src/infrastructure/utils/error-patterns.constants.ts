/**
 * Error Pattern Constants
 * Error classification patterns for error classifier utility
 */

export const NETWORK_ERROR_PATTERNS = [
  "network",
  "socket",
  "econnrefused",
  "enotfound",
  "fetch failed",
  "connection",
] as const;

export const RATE_LIMIT_PATTERNS = ["rate limit", "too many requests", "429"] as const;

export const AUTH_ERROR_PATTERNS = [
  "unauthorized",
  "authentication",
  "invalid api key",
  " 401",
  "401 ",
  " 403",
  "403 ",
] as const;

export const CONTENT_POLICY_PATTERNS = [
  "content policy",
  "content_policy_violation",
  "policy violation",
  "safety",
  "moderation",
  "inappropriate",
  "content blocked",
  "blocked by",
  "flagged by a content checker",
] as const;

export const VALIDATION_ERROR_PATTERNS = [
  "validation",
  "invalid input",
  "required field",
  "invalid parameter",
] as const;

export const SERVER_ERROR_PATTERNS = [
  "internal server error",
  " 500",
  "500 ",
  " 502",
  "502 ",
  " 503",
  "503 ",
  " 504",
  "504 ",
  "service unavailable",
] as const;

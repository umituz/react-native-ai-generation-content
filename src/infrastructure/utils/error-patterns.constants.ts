/**
 * Error Pattern Constants
 * Error classification patterns for error classifier utility
 */

export const NETWORK_ERROR_PATTERNS = [
  "network",
  "timeout",
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
  "401",
  "403",
] as const;

export const CONTENT_POLICY_PATTERNS = [
  "content policy",
  "safety",
  "moderation",
  "inappropriate",
  "blocked",
] as const;

export const SERVER_ERROR_PATTERNS = [
  "internal server error",
  "500",
  "502",
  "503",
  "504",
  "service unavailable",
] as const;

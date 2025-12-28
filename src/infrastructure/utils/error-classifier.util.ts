/**
 * Error Classifier Utility
 * Classifies errors for retry and user feedback decisions
 */

import { AIErrorType, type AIErrorInfo } from "../../domain/entities";

declare const __DEV__: boolean;

const NETWORK_ERROR_PATTERNS = [
  "network",
  "timeout",
  "socket",
  "econnrefused",
  "enotfound",
  "fetch failed",
  "connection",
];

const RATE_LIMIT_PATTERNS = ["rate limit", "too many requests", "429"];

const AUTH_ERROR_PATTERNS = [
  "unauthorized",
  "authentication",
  "invalid api key",
  "401",
  "403",
];

const CONTENT_POLICY_PATTERNS = [
  "content policy",
  "safety",
  "moderation",
  "inappropriate",
  "blocked",
];

const SERVER_ERROR_PATTERNS = [
  "internal server error",
  "500",
  "502",
  "503",
  "504",
  "service unavailable",
];

function matchesPatterns(message: string, patterns: string[]): boolean {
  const lowerMessage = message.toLowerCase();
  return patterns.some((pattern) => lowerMessage.includes(pattern));
}

function getStatusCode(error: unknown): number | undefined {
  if (error && typeof error === "object") {
    const err = error as Record<string, unknown>;
    if (typeof err.status === "number") return err.status;
    if (typeof err.statusCode === "number") return err.statusCode;
    if (err.response && typeof err.response === "object") {
      const resp = err.response as Record<string, unknown>;
      if (typeof resp.status === "number") return resp.status;
    }
  }
  return undefined;
}

function logClassification(info: AIErrorInfo): AIErrorInfo {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    // eslint-disable-next-line no-console
    console.log("[ErrorClassifier] Classified as:", {
      type: info.type,
      messageKey: info.messageKey,
      retryable: info.retryable,
    });
  }
  return info;
}

export function classifyError(error: unknown): AIErrorInfo {
  const message = error instanceof Error ? error.message : String(error);
  const statusCode = getStatusCode(error);

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    // eslint-disable-next-line no-console
    console.log("[ErrorClassifier] Classifying error:", {
      message: message.slice(0, 100),
      statusCode,
    });
  }

  if (statusCode === 429 || matchesPatterns(message, RATE_LIMIT_PATTERNS)) {
    return logClassification({
      type: AIErrorType.RATE_LIMIT,
      messageKey: "error.rateLimit",
      retryable: true,
      originalError: error,
      statusCode,
    });
  }

  if (
    statusCode === 401 ||
    statusCode === 403 ||
    matchesPatterns(message, AUTH_ERROR_PATTERNS)
  ) {
    return logClassification({
      type: AIErrorType.AUTHENTICATION,
      messageKey: "error.authentication",
      retryable: false,
      originalError: error,
      statusCode,
    });
  }

  if (matchesPatterns(message, CONTENT_POLICY_PATTERNS)) {
    return logClassification({
      type: AIErrorType.CONTENT_POLICY,
      messageKey: "error.contentPolicy",
      retryable: false,
      originalError: error,
      statusCode,
    });
  }

  if (matchesPatterns(message, NETWORK_ERROR_PATTERNS)) {
    return logClassification({
      type: AIErrorType.NETWORK,
      messageKey: "error.network",
      retryable: true,
      originalError: error,
      statusCode,
    });
  }

  if (
    (statusCode && statusCode >= 500) ||
    matchesPatterns(message, SERVER_ERROR_PATTERNS)
  ) {
    return logClassification({
      type: AIErrorType.SERVER,
      messageKey: "error.server",
      retryable: true,
      originalError: error,
      statusCode,
    });
  }

  if (message.toLowerCase().includes("timeout")) {
    return logClassification({
      type: AIErrorType.TIMEOUT,
      messageKey: "error.timeout",
      retryable: true,
      originalError: error,
      statusCode,
    });
  }

  return logClassification({
    type: AIErrorType.UNKNOWN,
    messageKey: "error.unknown",
    retryable: false,
    originalError: error,
    statusCode,
  });
}

export function isTransientError(error: unknown): boolean {
  const info = classifyError(error);
  return info.retryable;
}

export function isPermanentError(error: unknown): boolean {
  return !isTransientError(error);
}

/**
 * Check if result is not ready yet (used during polling)
 * More specific than isTransientError for result fetching scenarios
 * Returns true for 404/not-found errors that indicate job still processing
 */
export function isResultNotReady(
  error: unknown,
  retryAttempt: number,
  maxRetries: number,
): boolean {
  if (isPermanentError(error)) {
    return false;
  }

  const message = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();
  const errorName = error instanceof Error ? error.constructor.name.toLowerCase() : "";

  return (
    message.includes("not found") ||
    message.includes("404") ||
    message.includes("still in progress") ||
    message.includes("result not ready") ||
    message.includes("request is still in progress") ||
    message.includes("job result not found") ||
    (errorName === "apierror" && retryAttempt < maxRetries - 1)
  );
}

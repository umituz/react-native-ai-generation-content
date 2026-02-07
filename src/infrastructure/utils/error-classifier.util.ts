/**
 * Error Classifier Utility
 * Classifies errors for retry and user feedback decisions
 */

import { AIErrorType, type AIErrorInfo } from "../../domain/entities";
import {
  NETWORK_ERROR_PATTERNS,
  RATE_LIMIT_PATTERNS,
  AUTH_ERROR_PATTERNS,
  CONTENT_POLICY_PATTERNS,
  VALIDATION_ERROR_PATTERNS,
  SERVER_ERROR_PATTERNS,
} from "./error-patterns.constants";

declare const __DEV__: boolean;

function matchesPatterns(message: string, patterns: readonly string[]): boolean {
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

  if (matchesPatterns(message, VALIDATION_ERROR_PATTERNS)) {
    return logClassification({
      type: AIErrorType.VALIDATION,
      messageKey: "error.validation",
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
  const message = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();
  const errorName = error instanceof Error ? error.constructor.name.toLowerCase() : "";

  // Check 404/not-found patterns first - these indicate the job is still processing
  const isNotFoundPattern =
    message.includes("not found") ||
    message.includes("404") ||
    message.includes("still in progress") ||
    message.includes("result not ready") ||
    message.includes("request is still in progress") ||
    message.includes("job result not found");

  if (isNotFoundPattern) {
    return true;
  }

  // Only then check for permanent errors
  if (isPermanentError(error)) {
    return false;
  }

  return errorName === "apierror" && retryAttempt < maxRetries - 1;
}

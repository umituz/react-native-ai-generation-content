/**
 * Error Classification Logic
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
import { matchesPatterns, getStatusCode, logClassification } from "./classifier-helpers";

declare const __DEV__: boolean;

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

  // 422 = Content Policy Violation
  if (statusCode === 422 || matchesPatterns(message, CONTENT_POLICY_PATTERNS)) {
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
  return info.retryable ?? false;
}

export function isPermanentError(error: unknown): boolean {
  return !isTransientError(error);
}

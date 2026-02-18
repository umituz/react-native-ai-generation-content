/**
 * Error Classifier Helper Functions
 */

import type { AIErrorInfo } from "../../domain/entities";


export function matchesPatterns(message: string, patterns: readonly string[]): boolean {
  const lowerMessage = message.toLowerCase();
  return patterns.some((pattern) => lowerMessage.includes(pattern));
}

export function getStatusCode(error: unknown): number | undefined {
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

export function logClassification(info: AIErrorInfo): AIErrorInfo {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[ErrorClassifier] Classified as:", {
      type: info.type,
      messageKey: info.messageKey,
      retryable: info.retryable,
    });
  }
  return info;
}

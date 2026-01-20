/**
 * Generation Errors
 * Centralized error handling for generation orchestration
 */

import type { GenerationError, GenerationErrorType, AlertMessages } from "./types";
import { CONTENT_POLICY_PATTERNS } from "../../../infrastructure/utils/error-patterns.constants";

export const createGenerationError = (
  type: GenerationErrorType,
  message: string,
  originalError?: Error,
): GenerationError => ({
  type,
  message,
  originalError,
});

export const getAlertMessage = (
  error: GenerationError,
  messages: AlertMessages,
): string => {
  switch (error.type) {
    case "network":
      return messages.networkError;
    case "credits":
      return messages.creditFailed;
    case "policy":
      return messages.policyViolation;
    case "save":
      return messages.saveFailed;
    default:
      return messages.unknown;
  }
};

const isContentPolicyError = (message: string): boolean => {
  const lowerMessage = message.toLowerCase();
  return CONTENT_POLICY_PATTERNS.some((pattern) => lowerMessage.includes(pattern));
};

export const parseError = (err: unknown): GenerationError => {
  if (isGenerationError(err)) {
    return err;
  }

  if (err instanceof Error) {
    if (err.name === "ContentPolicyViolationError" || isContentPolicyError(err.message)) {
      return createGenerationError("policy", err.message, err);
    }
    return createGenerationError("unknown", err.message, err);
  }

  if (typeof err === "string" && isContentPolicyError(err)) {
    return createGenerationError("policy", err);
  }

  return createGenerationError("unknown", "Generation failed");
};

const isGenerationError = (err: unknown): err is GenerationError => {
  return (
    typeof err === "object" &&
    err !== null &&
    "type" in err &&
    "message" in err
  );
};

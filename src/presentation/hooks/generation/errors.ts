/**
 * Generation Errors
 * Centralized error handling for generation orchestration
 */

import type { GenerationError, GenerationErrorType, AlertMessages } from "./types";

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

export const parseError = (err: unknown): GenerationError => {
  if (isGenerationError(err)) {
    return err;
  }

  if (err instanceof Error) {
    if (err.name === "ContentPolicyViolationError") {
      return createGenerationError("policy", err.message, err);
    }
    return createGenerationError("unknown", err.message, err);
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

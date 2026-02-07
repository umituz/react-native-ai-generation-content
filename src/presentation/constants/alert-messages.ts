/**
 * Default Alert Messages
 * Shared constant for generation error messages
 */

import type { AlertMessages } from "../hooks/generation/types";

export const DEFAULT_ALERT_MESSAGES: AlertMessages = {
  networkError: "No internet connection. Please check your network.",
  policyViolation: "Content not allowed. Please try again.",
  saveFailed: "Failed to save. Please try again.",
  creditFailed: "Credit operation failed. Please try again.",
  unknown: "An error occurred. Please try again.",
};

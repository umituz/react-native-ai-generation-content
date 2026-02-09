/**
 * Common Validation Utilities
 * Reusable validation functions for forms and data
 */

import {
  MAX_PROMPT_LENGTH,
  MIN_PROMPT_LENGTH,
  MAX_USER_ID_LENGTH,
  MAX_CREATION_ID_LENGTH,
  MAX_URL_LENGTH,
  MIN_VIDEO_DURATION_SECONDS,
  MAX_VIDEO_DURATION_SECONDS,
} from "../constants/validation.constants";

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validates text prompt length
 */
export function validatePrompt(prompt: string): ValidationResult {
  if (!prompt || typeof prompt !== "string") {
    return { isValid: false, error: "Prompt is required" };
  }

  if (prompt.length < MIN_PROMPT_LENGTH) {
    return { isValid: false, error: "Prompt is too short" };
  }

  if (prompt.length > MAX_PROMPT_LENGTH) {
    return { isValid: false, error: "Prompt is too long" };
  }

  return { isValid: true };
}

/**
 * Validates user ID
 */
export function validateUserId(userId: string): ValidationResult {
  if (!userId || typeof userId !== "string") {
    return { isValid: false, error: "User ID is required" };
  }

  if (userId.length > MAX_USER_ID_LENGTH) {
    return { isValid: false, error: "User ID is too long" };
  }

  return { isValid: true };
}

/**
 * Validates creation ID
 */
export function validateCreationId(creationId: string): ValidationResult {
  if (!creationId || typeof creationId !== "string") {
    return { isValid: false, error: "Creation ID is required" };
  }

  if (creationId.length > MAX_CREATION_ID_LENGTH) {
    return { isValid: false, error: "Creation ID is too long" };
  }

  return { isValid: true };
}

/**
 * Validates URL format
 */
export function validateUrl(url: string): ValidationResult {
  if (!url || typeof url !== "string") {
    return { isValid: false, error: "URL is required" };
  }

  if (url.length > MAX_URL_LENGTH) {
    return { isValid: false, error: "URL is too long" };
  }

  try {
    new URL(url);
    return { isValid: true };
  } catch {
    return { isValid: false, error: "Invalid URL format" };
  }
}

/**
 * Validates video duration
 */
export function validateVideoDuration(duration: number): ValidationResult {
  if (typeof duration !== "number" || isNaN(duration)) {
    return { isValid: false, error: "Duration must be a number" };
  }

  if (duration < MIN_VIDEO_DURATION_SECONDS) {
    return {
      isValid: false,
      error: `Duration must be at least ${MIN_VIDEO_DURATION_SECONDS} seconds`,
    };
  }

  if (duration > MAX_VIDEO_DURATION_SECONDS) {
    return {
      isValid: false,
      error: `Duration must not exceed ${MAX_VIDEO_DURATION_SECONDS} seconds`,
    };
  }

  return { isValid: true };
}

/**
 * Validates email format
 */
export function validateEmail(email: string): ValidationResult {
  if (!email || typeof email !== "string") {
    return { isValid: false, error: "Email is required" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: "Invalid email format" };
  }

  return { isValid: true };
}

/**
 * Validates that a value is not empty
 */
export function validateNotEmpty(value: unknown, fieldName = "Value"): ValidationResult {
  if (value === null || value === undefined) {
    return { isValid: false, error: `${fieldName} is required` };
  }

  if (typeof value === "string" && value.trim().length === 0) {
    return { isValid: false, error: `${fieldName} cannot be empty` };
  }

  if (Array.isArray(value) && value.length === 0) {
    return { isValid: false, error: `${fieldName} cannot be empty` };
  }

  return { isValid: true };
}

/**
 * Validates numeric range
 */
export function validateNumericRange(
  value: number,
  options: {
    min?: number;
    max?: number;
    fieldName?: string;
  }
): ValidationResult {
  const { min, max, fieldName = "Value" } = options;

  if (typeof value !== "number" || isNaN(value)) {
    return { isValid: false, error: `${fieldName} must be a number` };
  }

  if (min !== undefined && value < min) {
    return { isValid: false, error: `${fieldName} must be at least ${min}` };
  }

  if (max !== undefined && value > max) {
    return { isValid: false, error: `${fieldName} must not exceed ${max}` };
  }

  return { isValid: true };
}

/**
 * Combines multiple validation results
 */
export function combineValidations(...results: ValidationResult[]): ValidationResult {
  for (const result of results) {
    if (!result.isValid) {
      return result;
    }
  }
  return { isValid: true };
}

/**
 * General Validation Utilities
 */

import type { ValidationResult } from "./validation-types";

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

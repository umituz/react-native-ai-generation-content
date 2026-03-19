/**
 * Shared Validation Utilities
 */

import type {
  ValidationResult,
  StringValidationOptions,
  NumericValidationOptions,
} from "../../../infrastructure/validation/base-validator.types";

// Re-export types
export type {
  ValidationResult,
  StringValidationOptions,
  NumericValidationOptions,
};

// Export functions from advanced-validator
export { combineValidationResults } from "../../../infrastructure/validation/advanced-validator";

// Export error handling utilities
export { handleError } from "./error-handler";
export { ErrorType } from "./error-handler.types";

/**
 * Validate a string is not empty
 */
export function validateString(value: string): ValidationResult {
  if (typeof value !== 'string') {
    return { isValid: false, errors: ['Value must be a string'] };
  }

  if (value.trim().length === 0) {
    return { isValid: false, errors: ['String cannot be empty'] };
  }

  return { isValid: true, errors: [] };
}

/**
 * Validate URL format
 */
export function validateUrl(url: string): ValidationResult {
  if (typeof url !== 'string') {
    return { isValid: false, errors: ['URL must be a string'] };
  }

  try {
    new URL(url);
    return { isValid: true, errors: [] };
  } catch {
    return { isValid: false, errors: ['Invalid URL format'] };
  }
}

/**
 * Validate required fields in an object
 */
export function validateRequiredFields<T extends Record<string, unknown>>(
  obj: T,
  requiredFields: (keyof T)[]
): { isValid: boolean; missingFields: string[] } {
  const missingFields: string[] = [];

  for (const field of requiredFields) {
    const value = obj[field];
    if (value === undefined || value === null || value === '') {
      missingFields.push(String(field));
    }
  }

  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
}

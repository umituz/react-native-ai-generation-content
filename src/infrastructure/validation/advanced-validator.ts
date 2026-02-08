/**
 * Advanced Validation Utilities
 * Complex validators for objects, arrays, and combined validations
 */

import type { ValidationResult } from "./base-validator";
import { validateString } from "./base-validator";
import type { StringValidationOptions } from "./base-validator";

/**
 * Validates object structure
 */
export function validateObject(
  input: unknown,
  requiredFields: readonly string[] = []
): ValidationResult {
  const errors: string[] = [];

  if (typeof input !== "object" || input === null) {
    return { isValid: false, errors: ["Input must be an object"] };
  }

  for (const field of requiredFields) {
    if (!(field in input)) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  return { isValid: errors.length === 0, errors };
}

/**
 * Validates array input
 */
export function validateArray(
  input: unknown,
  options: {
    readonly minLength?: number;
    readonly maxLength?: number;
    readonly itemType?: "string" | "number" | "object";
  } = {}
): ValidationResult {
  const errors: string[] = [];

  if (!Array.isArray(input)) {
    return { isValid: false, errors: ["Input must be an array"] };
  }

  if (options.minLength !== undefined && input.length < options.minLength) {
    errors.push(`Array must have at least ${options.minLength} items`);
  }

  if (options.maxLength !== undefined && input.length > options.maxLength) {
    errors.push(`Array must have at most ${options.maxLength} items`);
  }

  if (options.itemType) {
    for (let i = 0; i < input.length; i++) {
      const item = input[i];
      const isValidType =
        options.itemType === "string"
          ? typeof item === "string"
          : options.itemType === "number"
          ? typeof item === "number"
          : typeof item === "object" && item !== null;

      if (!isValidType) {
        errors.push(`Item at index ${i} is not a ${options.itemType}`);
      }
    }
  }

  return { isValid: errors.length === 0, errors };
}

/**
 * Combines multiple validation results
 */
export function combineValidationResults(
  results: readonly ValidationResult[]
): ValidationResult {
  const allErrors = results.flatMap((r) => r.errors);
  return { isValid: allErrors.length === 0, errors: allErrors };
}

/**
 * Sanitizes and validates user input in one step
 */
export function sanitizeAndValidate(
  input: unknown,
  sanitizeFn: (input: unknown) => string,
  options: StringValidationOptions = {}
): { readonly sanitized: string; readonly validation: ValidationResult } {
  const sanitized = sanitizeFn(input);
  const validation = validateString(sanitized, options);
  return { sanitized, validation };
}

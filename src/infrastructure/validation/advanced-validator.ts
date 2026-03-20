/**
 * Advanced Validation Utilities
 * Complex validators for objects, arrays, and combined validations
 */

import type { ValidationResult, StringValidationOptions } from "../../shared-kernel/infrastructure/validation";
import { validateString } from "../../shared-kernel/infrastructure/validation";

/**
 * Validates object structure
 */
export function validateObject(
  input: unknown,
  requiredFields: readonly string[] = []
): ValidationResult {
  const errors: Record<string, string> = {};

  if (typeof input !== "object" || input === null) {
    return { isValid: false, errors: { input: "Input must be an object" } };
  }

  for (const field of requiredFields) {
    if (!(field in input)) {
      errors[field] = `Missing required field: ${field}`;
    }
  }

  return { isValid: Object.keys(errors).length === 0, errors };
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
  const errors: Record<string, string> = {};

  if (!Array.isArray(input)) {
    return { isValid: false, errors: { input: "Input must be an array" } };
  }

  if (options.minLength !== undefined && input.length < options.minLength) {
    errors.minLength = `Array must have at least ${options.minLength} items`;
  }

  if (options.maxLength !== undefined && input.length > options.maxLength) {
    errors.maxLength = `Array must have at most ${options.maxLength} items`;
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
        errors[`item_${i}`] = `Item at index ${i} is not a ${options.itemType}`;
      }
    }
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

/**
 * Combines multiple validation results
 */
export function combineValidationResults(
  ...results: ValidationResult[]
): ValidationResult {
  const allErrors = results.reduce((acc, result) => {
    return { ...acc, ...result.errors };
  }, {} as Record<string, string>);

  return {
    isValid: Object.keys(allErrors).length === 0,
    errors: allErrors,
  };
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

/**
 * Entity Validation Utilities
 * Validators for domain entities like user ID and creation ID
 */

import { validateString, type ValidationResult, type StringValidationOptions } from "./base-validator";

/**
 * Validates user ID
 */
export function validateUserId(input: unknown): ValidationResult {
  const options: StringValidationOptions = {
    minLength: 1,
    maxLength: 100,
    pattern: /^[a-zA-Z0-9_-]+$/,
  };
  return validateString(input, options);
}

/**
 * Validates creation ID
 */
export function validateCreationId(input: unknown): ValidationResult {
  const options: StringValidationOptions = {
    minLength: 1,
    maxLength: 100,
  };
  return validateString(input, options);
}


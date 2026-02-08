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

/**
 * Validates scenario ID
 */
export function validateScenarioId(input: unknown): ValidationResult {
  const options: StringValidationOptions = {
    minLength: 1,
    maxLength: 100,
    pattern: /^[a-z0-9-]+$/,
  };
  return validateString(input, options);
}

/**
 * Validates model name
 */
export function validateModelName(input: unknown): ValidationResult {
  const options: StringValidationOptions = {
    minLength: 1,
    maxLength: 100,
  };
  return validateString(input, options);
}

/**
 * Validates provider name
 */
export function validateProviderName(input: unknown): ValidationResult {
  const options: StringValidationOptions = {
    minLength: 1,
    maxLength: 50,
    pattern: /^[a-z0-9-]+$/,
  };
  return validateString(input, options);
}

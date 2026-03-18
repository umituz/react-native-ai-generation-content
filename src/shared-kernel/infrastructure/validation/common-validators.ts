/**
 * Common validation utilities
 * Shared validation logic across all domains
 */

import type { ValidationResult, StringValidationOptions, NumberValidationOptions } from "./common-validators.types";

/**
 * Validate a string value
 */
export function validateString(
  value: string,
  options: StringValidationOptions = {}
): ValidationResult {
  const errors: Record<string, string> = {};
  let processedValue = value;

  if (options.trim) {
    processedValue = value.trim();
  }

  if (options.required && !processedValue) {
    errors.required = 'This field is required';
  }

  if (options.minLength && processedValue.length < options.minLength) {
    errors.minLength = `Minimum length is ${options.minLength}`;
  }

  if (options.maxLength && processedValue.length > options.maxLength) {
    errors.maxLength = `Maximum length is ${options.maxLength}`;
  }

  if (options.pattern && !options.pattern.test(processedValue)) {
    errors.pattern = 'Invalid format';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validate a number value
 */
export function validateNumber(
  value: number,
  options: NumberValidationOptions = {}
): ValidationResult {
  const errors: Record<string, string> = {};

  if (options.required && (value === null || value === undefined)) {
    errors.required = 'This field is required';
    return { isValid: false, errors };
  }

  if (value === null || value === undefined) {
    return { isValid: true, errors: {} };
  }

  if (options.integer && !Number.isInteger(value)) {
    errors.integer = 'Must be an integer';
  }

  if (options.min !== undefined && value < options.min) {
    errors.min = `Minimum value is ${options.min}`;
  }

  if (options.max !== undefined && value > options.max) {
    errors.max = `Maximum value is ${options.max}`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validate a URL
 */
export function validateUrl(url: string): ValidationResult {
  const urlPattern = /^https?:\/\/.+/i;
  return validateString(url, {
    required: true,
    pattern: urlPattern,
  });
}

/**
 * Validate an object has required fields
 */
export function validateRequiredFields<T extends Record<string, unknown>>(
  obj: T,
  requiredFields: (keyof T)[]
): ValidationResult {
  const errors: Record<string, string> = {};

  for (const field of requiredFields) {
    if (obj[field] === null || obj[field] === undefined) {
      errors[field as string] = `${String(field)} is required`;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Combine multiple validation results
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

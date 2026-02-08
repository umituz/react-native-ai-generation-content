/**
 * Base Validation Utilities
 * Core validation functions for strings, numbers, URLs, emails, and base64
 */

/**
 * Validation result type
 */
export interface ValidationResult {
  readonly isValid: boolean;
  readonly errors: readonly string[];
}

/**
 * String validation options
 */
export interface StringValidationOptions {
  readonly minLength?: number;
  readonly maxLength?: number;
  readonly pattern?: RegExp;
  readonly allowedCharacters?: RegExp;
  readonly trim?: boolean;
}

/**
 * Numeric validation options
 */
export interface NumericValidationOptions {
  readonly min?: number;
  readonly max?: number;
  readonly integer?: boolean;
}

/**
 * Validates a string input against provided rules
 */
export function validateString(
  input: unknown,
  options: StringValidationOptions = {}
): ValidationResult {
  const errors: string[] = [];

  if (typeof input !== "string") {
    return { isValid: false, errors: ["Input must be a string"] };
  }

  const value = options.trim !== false ? input.trim() : input;

  if (options.minLength !== undefined && value.length < options.minLength) {
    errors.push(`Input must be at least ${options.minLength} characters`);
  }

  if (options.maxLength !== undefined && value.length > options.maxLength) {
    errors.push(`Input must be at most ${options.maxLength} characters`);
  }

  if (options.pattern && !options.pattern.test(value)) {
    errors.push("Input format is invalid");
  }

  if (options.allowedCharacters && !options.allowedCharacters.test(value)) {
    errors.push("Input contains invalid characters");
  }

  return { isValid: errors.length === 0, errors };
}

/**
 * Validates a numeric input
 */
export function validateNumber(
  input: unknown,
  options: NumericValidationOptions = {}
): ValidationResult {
  const errors: string[] = [];

  if (typeof input !== "number" || isNaN(input)) {
    return { isValid: false, errors: ["Input must be a number"] };
  }

  if (options.integer && !Number.isInteger(input)) {
    errors.push("Input must be an integer");
  }

  if (options.min !== undefined && input < options.min) {
    errors.push(`Input must be at least ${options.min}`);
  }

  if (options.max !== undefined && input > options.max) {
    errors.push(`Input must be at most ${options.max}`);
  }

  return { isValid: errors.length === 0, errors };
}

/**
 * Validates URL format
 */
export function validateURL(input: unknown): ValidationResult {
  if (typeof input !== "string") {
    return { isValid: false, errors: ["URL must be a string"] };
  }

  try {
    const url = new URL(input);
    if (!["http:", "https:"].includes(url.protocol)) {
      return { isValid: false, errors: ["Only HTTP and HTTPS protocols are allowed"] };
    }
    return { isValid: true, errors: [] };
  } catch {
    return { isValid: false, errors: ["Invalid URL format"] };
  }
}

/**
 * Validates email format
 */
export function validateEmail(input: unknown): ValidationResult {
  if (typeof input !== "string") {
    return { isValid: false, errors: ["Email must be a string"] };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(input)) {
    return { isValid: false, errors: ["Invalid email format"] };
  }

  return { isValid: true, errors: [] };
}

/**
 * Validates base64 string
 */
export function validateBase64(input: unknown): ValidationResult {
  if (typeof input !== "string") {
    return { isValid: false, errors: ["Input must be a string"] };
  }

  const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
  if (!base64Regex.test(input)) {
    return { isValid: false, errors: ["Invalid base64 format"] };
  }

  if (input.length % 4 !== 0) {
    return { isValid: false, errors: ["Base64 string length must be a multiple of 4"] };
  }

  return { isValid: true, errors: [] };
}

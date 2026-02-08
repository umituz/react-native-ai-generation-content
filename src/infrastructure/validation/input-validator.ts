/**
 * Input Validation Utilities
 * Provides comprehensive input validation for security and data integrity
 */

import {
  MAX_PROMPT_LENGTH,
  MIN_PROMPT_LENGTH,
  MAX_USER_ID_LENGTH,
  MAX_CREATION_ID_LENGTH,
} from "../constants/validation.constants";

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
 * Sanitizes user input to prevent XSS and injection attacks
 */
export function sanitizeString(input: unknown): string {
  if (typeof input !== "string") {
    return "";
  }

  return input
    .trim()
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/data:/gi, "") // Remove data: protocol
    .replace(/vbscript:/gi, "") // Remove vbscript: protocol
    .replace(/on\w+\s*=/gi, "") // Remove event handlers
    .replace(/--/g, "") // Remove SQL comment sequences
    .replace(/;\s*drop\s+/gi, "") // Remove SQL injection attempts
    .replace(/['"\\]/g, "") // Remove quotes and backslashes
    .slice(0, 10000); // Limit length
}

/**
 * Validates a string input against provided rules
 */
export function validateString(
  input: unknown,
  options: StringValidationOptions = {}
): ValidationResult {
  const errors: string[] = [];

  // Check if input is a string
  if (typeof input !== "string") {
    return {
      isValid: false,
      errors: ["Input must be a string"],
    };
  }

  let value = options.trim !== false ? input.trim() : input;

  // Check min length
  if (options.minLength !== undefined && value.length < options.minLength) {
    errors.push(`Input must be at least ${options.minLength} characters`);
  }

  // Check max length
  if (options.maxLength !== undefined && value.length > options.maxLength) {
    errors.push(`Input must be at most ${options.maxLength} characters`);
  }

  // Check pattern
  if (options.pattern && !options.pattern.test(value)) {
    errors.push("Input format is invalid");
  }

  // Check allowed characters
  if (options.allowedCharacters && !options.allowedCharacters.test(value)) {
    errors.push("Input contains invalid characters");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validates a numeric input
 */
export function validateNumber(
  input: unknown,
  options: NumericValidationOptions = {}
): ValidationResult {
  const errors: string[] = [];

  // Check if input is a number
  if (typeof input !== "number" || isNaN(input)) {
    return {
      isValid: false,
      errors: ["Input must be a number"],
    };
  }

  // Check if integer
  if (options.integer && !Number.isInteger(input)) {
    errors.push("Input must be an integer");
  }

  // Check min value
  if (options.min !== undefined && input < options.min) {
    errors.push(`Input must be at least ${options.min}`);
  }

  // Check max value
  if (options.max !== undefined && input > options.max) {
    errors.push(`Input must be at most ${options.max}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validates URL format
 */
export function validateURL(input: unknown): ValidationResult {
  if (typeof input !== "string") {
    return {
      isValid: false,
      errors: ["URL must be a string"],
    };
  }

  try {
    const url = new URL(input);

    // Only allow http and https protocols
    if (!["http:", "https:"].includes(url.protocol)) {
      return {
        isValid: false,
        errors: ["Only HTTP and HTTPS protocols are allowed"],
      };
    }

    return { isValid: true, errors: [] };
  } catch {
    return {
      isValid: false,
      errors: ["Invalid URL format"],
    };
  }
}

/**
 * Validates email format
 */
export function validateEmail(input: unknown): ValidationResult {
  if (typeof input !== "string") {
    return {
      isValid: false,
      errors: ["Email must be a string"],
    };
  }

  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(input)) {
    return {
      isValid: false,
      errors: ["Invalid email format"],
    };
  }

  return { isValid: true, errors: [] };
}

/**
 * Validates base64 string
 */
export function validateBase64(input: unknown): ValidationResult {
  if (typeof input !== "string") {
    return {
      isValid: false,
      errors: ["Input must be a string"],
    };
  }

  // Check if it's a valid base64 string
  const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;

  if (!base64Regex.test(input)) {
    return {
      isValid: false,
      errors: ["Invalid base64 format"],
    };
  }

  // Check if length is valid (must be multiple of 4)
  if (input.length % 4 !== 0) {
    return {
      isValid: false,
      errors: ["Base64 string length must be a multiple of 4"],
    };
  }

  return { isValid: true, errors: [] };
}

/**
 * Validates object structure
 */
export function validateObject(
  input: unknown,
  requiredFields: readonly string[] = []
): ValidationResult {
  const errors: string[] = [];

  if (typeof input !== "object" || input === null) {
    return {
      isValid: false,
      errors: ["Input must be an object"],
    };
  }

  // Check required fields
  for (const field of requiredFields) {
    if (!(field in input)) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
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
    return {
      isValid: false,
      errors: ["Input must be an array"],
    };
  }

  // Check min length
  if (options.minLength !== undefined && input.length < options.minLength) {
    errors.push(`Array must have at least ${options.minLength} items`);
  }

  // Check max length
  if (options.maxLength !== undefined && input.length > options.maxLength) {
    errors.push(`Array must have at most ${options.maxLength} items`);
  }

  // Check item types
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

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Combines multiple validation results
 */
export function combineValidationResults(
  results: readonly ValidationResult[]
): ValidationResult {
  const allErrors = results.flatMap((r) => r.errors);

  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
  };
}

/**
 * Sanitizes and validates user input in one step
 */
export function sanitizeAndValidate(
  input: unknown,
  options: StringValidationOptions = {}
): { readonly sanitized: string; readonly validation: ValidationResult } {
  const sanitized = sanitizeString(input);
  const validation = validateString(sanitized, options);

  return { sanitized, validation };
}

/**
 * Validates prompt/input text for AI generation
 */
export function validateAIPrompt(input: unknown): ValidationResult {
  const options: StringValidationOptions = {
    minLength: MIN_PROMPT_LENGTH,
    maxLength: MAX_PROMPT_LENGTH,
    trim: true,
  };

  return validateString(input, options);
}

/**
 * Validates image data (base64 or URL)
 */
export function validateImageData(input: unknown): ValidationResult {
  if (typeof input !== "string") {
    return {
      isValid: false,
      errors: ["Image data must be a string"],
    };
  }

  // Check if it's a URL
  if (input.startsWith("http://") || input.startsWith("https://")) {
    return validateURL(input);
  }

  // Check if it's base64
  if (input.startsWith("data:image/")) {
    const base64Part = input.split(",")[1];
    if (!base64Part) {
      return {
        isValid: false,
        errors: ["Invalid data URI format"],
      };
    }
    return validateBase64(base64Part);
  }

  return {
    isValid: false,
    errors: ["Image data must be a URL or base64 data URI"],
  };
}

/**
 * Validates user ID
 */
export function validateUserId(input: unknown): ValidationResult {
  const options: StringValidationOptions = {
    minLength: 1,
    maxLength: MAX_USER_ID_LENGTH,
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
    maxLength: MAX_CREATION_ID_LENGTH,
  };

  return validateString(input, options);
}

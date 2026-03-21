/**
 * Base Validation Utilities
 * Core validation functions for strings, numbers, URLs, emails, and base64
 */

import type { ValidationResult } from "../../shared-kernel/infrastructure/validation";
import { validateString, validateNumber } from "../../shared-kernel/infrastructure/validation";

// Re-export types for convenience
export type { ValidationResult } from "../../shared-kernel/infrastructure/validation";
export type { StringValidationOptions, NumberValidationOptions } from "../../shared-kernel/infrastructure/validation";

// Re-export validation functions for convenience
export { validateString, validateNumber };

/**
 * Validates URL format
 */
export function validateURL(input: unknown): ValidationResult {
  if (typeof input !== "string") {
    return { isValid: false, errors: { type: "URL must be a string" } };
  }

  try {
    const url = new URL(input) as URL & { protocol: string };
    if (!["http:", "https:"].includes(url.protocol)) {
      return { isValid: false, errors: { protocol: "Only HTTP and HTTPS protocols are allowed" } };
    }
    return { isValid: true, errors: {} };
  } catch {
    return { isValid: false, errors: { format: "Invalid URL format" } };
  }
}

/**
 * Validates email format
 */
export function validateEmail(input: unknown): ValidationResult {
  if (typeof input !== "string") {
    return { isValid: false, errors: { type: "Email must be a string" } };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(input)) {
    return { isValid: false, errors: { format: "Invalid email format" } };
  }

  return { isValid: true, errors: {} };
}

/**
 * Validates base64 string
 */
export function validateBase64(input: unknown): ValidationResult {
  if (typeof input !== "string") {
    return { isValid: false, errors: { type: "Input must be a string" } };
  }

  if (input.length === 0) {
    return { isValid: false, errors: { length: "Base64 string cannot be empty" } };
  }

  const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
  if (!base64Regex.test(input)) {
    return { isValid: false, errors: { format: "Invalid base64 format" } };
  }

  if (input.length % 4 !== 0) {
    return { isValid: false, errors: { length: "Base64 string length must be a multiple of 4" } };
  }

  return { isValid: true, errors: {} };
}

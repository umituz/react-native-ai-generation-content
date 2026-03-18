/**
 * Base Validation Utilities - Types
 * Type definitions for base validation
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

/**
 * Shared Validation Utilities
 */

// Export all from common-validators
export * from "./common-validators";
export * from "./common-validators.types";

// Export functions from advanced-validator
export { combineValidationResults } from "../../../infrastructure/validation/advanced-validator";

// Export error handling utilities
export { handleError } from "./error-handler";
export { ErrorType } from "./error-handler.types";

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

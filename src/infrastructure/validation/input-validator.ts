/**
 * Input Validation Utilities
 * Main export module for all validation functions
 */

// Base validators
export {
  validateString,
  validateNumber,
  validateURL,
  validateEmail,
  validateBase64,
  type ValidationResult,
  type StringValidationOptions,
  type NumericValidationOptions,
} from "./base-validator";

// Sanitizers
export { sanitizeString } from "./sanitizer";

// Advanced validators
export {
  validateObject,
  validateArray,
  combineValidationResults,
  sanitizeAndValidate,
} from "./advanced-validator";

// AI validators
export { validateAIPrompt, validateImageData } from "./ai-validator";

// Entity validators
export {
  validateUserId,
  validateCreationId,
} from "./entity-validator";

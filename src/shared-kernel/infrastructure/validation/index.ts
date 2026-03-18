/**
 * Shared infrastructure validation utilities
 * Exports all validation and error handling utilities
 */

export type {
  ValidationResult,
  StringValidationOptions,
  NumberValidationOptions,
} from './common-validators';

export {
  validateString,
  validateNumber,
  validateUrl,
  validateRequiredFields,
  combineValidationResults,
} from './common-validators';

export { ErrorType, type AppError, type ErrorHandlerOptions } from './error-handler';
export {
  createError,
  toAppError,
  isAppError,
  getUserFriendlyMessage,
  handleError,
  withErrorHandling,
} from './error-handler';

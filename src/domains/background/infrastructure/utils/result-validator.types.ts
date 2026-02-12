/**
 * Result Validator Types
 * Domain: Value objects for result validation
 */

export interface ResultValidation {
  isValid: boolean;
  hasError: boolean;
  errorMessage?: string;
  hasOutput: boolean;
}

export interface ValidateResultOptions {
  outputFields?: string[];
  allowEmpty?: boolean;
}

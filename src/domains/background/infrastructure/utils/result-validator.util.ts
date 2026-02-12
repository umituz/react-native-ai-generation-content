/**
 * Result Validator Utility - Barrel Export
 * Validates AI generation job results
 *
 * Architecture:
 * - Domain: Result validation types, output field constants
 * - Infrastructure: Validation logic
 */

export type { ResultValidation, ValidateResultOptions } from "./result-validator.types";
export { DEFAULT_OUTPUT_FIELDS } from "./result-validator-constants";
export { validateResult } from "./result-validation-logic";

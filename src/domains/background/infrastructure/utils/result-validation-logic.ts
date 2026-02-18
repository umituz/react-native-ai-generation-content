/**
 * Result Validation Logic
 * Infrastructure: Validates job results
 */

import type { ResultValidation, ValidateResultOptions } from "./result-validator.types";
import { DEFAULT_OUTPUT_FIELDS } from "./result-validator-constants";


/**
 * Validate job result and detect errors
 * Checks for error fields even if job status was COMPLETED
 */
export function validateResult(
  result: unknown,
  options?: ValidateResultOptions
): ResultValidation {
  const { outputFields = DEFAULT_OUTPUT_FIELDS, allowEmpty = false } =
    options ?? {};

  if (result === null || result === undefined) {
    return {
      isValid: allowEmpty,
      hasError: !allowEmpty,
      errorMessage: allowEmpty ? undefined : "Result is empty",
      hasOutput: false,
    };
  }

  if (typeof result !== "object") {
    return {
      isValid: true,
      hasError: false,
      hasOutput: true,
    };
  }

  const resultObj = result as Record<string, unknown>;

  const errorValue = resultObj.error || resultObj.detail;
  const errorString = errorValue ? String(errorValue).toLowerCase() : "";

  const hasInternalServerError =
    errorString.includes("internal server error") ||
    errorString.includes("500") ||
    errorString === "internal server error";

  const isEmpty = Object.keys(resultObj).length === 0;

  const hasOutput = outputFields.some((field) => {
    const value = resultObj[field];
    if (!value) return false;

    if (typeof value === "object" && value !== null) {
      const nested = value as Record<string, unknown>;
      const nestedKeys = Object.keys(nested);
      return !!(
        nested.url ||
        nested.image_url ||
        nested.video_url ||
        nestedKeys.length > 0
      );
    }

    return true;
  });

  const hasError =
    hasInternalServerError || (isEmpty && !hasOutput && !allowEmpty);

  const validation: ResultValidation = {
    isValid: !hasError && (hasOutput || allowEmpty),
    hasError,
    errorMessage: hasError && errorValue ? String(errorValue) : undefined,
    hasOutput,
  };

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[ResultValidator] Validation result:", {
      isValid: validation.isValid,
      hasOutput: validation.hasOutput,
      hasError: validation.hasError,
    });
  }

  return validation;
}

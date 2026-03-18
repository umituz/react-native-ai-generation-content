/**
 * Creation Validation Utilities
 *
 * Centralized validation logic for creation persistence using shared kernel.
 * Keeps validation rules separate from hook logic.
 *
 * @module CreationValidators
 */

import {
  CREATION_VALIDATION,
  CREATION_STATUS,
  CREATION_FIELDS,
} from "../../domain/constants";
import type { ICreationsRepository } from "../../domain/repositories/ICreationsRepository";
import { validateUrl, validateString, combineValidationResults, type ValidationResult } from "../../../../shared-kernel/infrastructure/validation";

/**
 * Validates that at least one URL is present
 */
function validateHasUrl(
  imageUrl?: string,
  videoUrl?: string
): ValidationResult {
  if (!imageUrl && !videoUrl) {
    return {
      isValid: false,
      errors: { urls: "No output URL provided" },
    };
  }
  return { isValid: true, errors: {} };
}

/**
 * Validates URI protocol
 */
function validateUriProtocol(uri: string): ValidationResult {
  const hasValidProtocol = CREATION_VALIDATION.VALID_URI_PROTOCOLS.some(
    (protocol) => uri.startsWith(protocol)
  );

  if (!hasValidProtocol) {
    return {
      isValid: false,
      errors: {
        protocol: `Invalid URI protocol. Expected one of: ${CREATION_VALIDATION.VALID_URI_PROTOCOLS.join(", ")}`
      },
    };
  }

  return { isValid: true, errors: {} };
}

/**
 * Runs all validations using shared kernel utilities
 */
export function runAllValidations(
  imageUrl?: string,
  videoUrl?: string
): ValidationResult {
  // Check that at least one URL is present
  const hasUrlCheck = validateHasUrl(imageUrl, videoUrl);
  if (!hasUrlCheck.isValid) return hasUrlCheck;

  const uri = imageUrl || videoUrl || "";

  // Use shared URL validation
  const urlValidation = validateUrl(uri);
  if (!urlValidation.isValid) return urlValidation;

  // Use shared string validation for length
  const lengthValidation = validateString(uri, {
    maxLength: CREATION_VALIDATION.MAX_URI_LENGTH,
  });
  if (!lengthValidation.isValid) return lengthValidation;

  // Validate protocol
  const protocolCheck = validateUriProtocol(uri);
  if (!protocolCheck.isValid) return protocolCheck;

  // Combine all results
  return combineValidationResults(
    hasUrlCheck,
    urlValidation,
    lengthValidation,
    protocolCheck
  );
}

/**
 * Marks creation as failed
 */
export function markCreationAsFailed(
  repository: ICreationsRepository,
  userId: string,
  creationId: string,
  error: string
): void {
  repository.update(userId, creationId, {
    [CREATION_FIELDS.STATUS]: CREATION_STATUS.FAILED,
    [CREATION_FIELDS.METADATA]: { error, failedAt: new Date().toISOString() },
  });
}

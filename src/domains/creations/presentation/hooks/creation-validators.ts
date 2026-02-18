/**
 * Creation Validation Utilities
 *
 * Centralized validation logic for creation persistence.
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


interface ValidationResult {
  isValid: boolean;
  error?: string;
}

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
      error: "No output URL provided",
    };
  }
  return { isValid: true };
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
      error: `Invalid URI protocol. Expected one of: ${CREATION_VALIDATION.VALID_URI_PROTOCOLS.join(", ")}`,
    };
  }

  return { isValid: true };
}

/**
 * Validates URI length
 */
function validateUriLength(uri: string): ValidationResult {
  if (uri.length > CREATION_VALIDATION.MAX_URI_LENGTH) {
    return {
      isValid: false,
      error: `URI length (${uri.length}) exceeds maximum (${CREATION_VALIDATION.MAX_URI_LENGTH})`,
    };
  }

  return { isValid: true };
}

/**
 * Runs all validations and returns first error
 */
export function runAllValidations(
  imageUrl?: string,
  videoUrl?: string
): ValidationResult {
  const urlCheck = validateHasUrl(imageUrl, videoUrl);
  if (!urlCheck.isValid) return urlCheck;

  const uri = imageUrl || videoUrl || "";
  const protocolCheck = validateUriProtocol(uri);
  if (!protocolCheck.isValid) return protocolCheck;

  return validateUriLength(uri);
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

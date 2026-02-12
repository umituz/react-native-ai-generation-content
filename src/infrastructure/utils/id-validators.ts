/**
 * ID Validation Utilities
 */

import {
  MAX_USER_ID_LENGTH,
  MAX_CREATION_ID_LENGTH,
} from "../constants/validation.constants";
import type { ValidationResult } from "./validation-types";

/**
 * Validates user ID
 */
export function validateUserId(userId: string): ValidationResult {
  if (!userId || typeof userId !== "string") {
    return { isValid: false, error: "User ID is required" };
  }

  if (userId.length > MAX_USER_ID_LENGTH) {
    return { isValid: false, error: "User ID is too long" };
  }

  return { isValid: true };
}

/**
 * Validates creation ID
 */
export function validateCreationId(creationId: string): ValidationResult {
  if (!creationId || typeof creationId !== "string") {
    return { isValid: false, error: "Creation ID is required" };
  }

  if (creationId.length > MAX_CREATION_ID_LENGTH) {
    return { isValid: false, error: "Creation ID is too long" };
  }

  return { isValid: true };
}

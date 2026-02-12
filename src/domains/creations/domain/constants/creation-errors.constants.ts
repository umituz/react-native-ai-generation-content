/**
 * Creation Error Codes
 *
 * Domain exception codes for client-side error handling.
 * Each code represents a specific error scenario.
 *
 * @module CreationErrorsConstants
 */

/**
 * Error codes for domain exceptions
 */
export const CREATION_ERROR_CODES = {
  NOT_FOUND: "CREATION_NOT_FOUND" as const,
  VALIDATION_FAILED: "CREATION_VALIDATION_FAILED" as const,
  INVALID_STATE_TRANSITION: "CREATION_INVALID_STATE_TRANSITION" as const,
  PERSISTENCE_FAILED: "CREATION_PERSISTENCE_FAILED" as const,
  INVALID_URI: "CREATION_INVALID_URI" as const,
  INVALID_OUTPUT: "CREATION_INVALID_OUTPUT" as const,
} as const;

/** Union type of all error codes */
export type CreationErrorCode =
  typeof CREATION_ERROR_CODES[keyof typeof CREATION_ERROR_CODES];

// Freeze to prevent mutations
Object.freeze(CREATION_ERROR_CODES);

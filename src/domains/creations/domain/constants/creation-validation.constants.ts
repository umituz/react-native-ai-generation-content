/**
 * Creation Validation Rules
 *
 * Business invariants and constraints enforced at domain boundaries.
 * All validation rules centralized here for consistency.
 *
 * @module CreationValidationConstants
 */

/**
 * Validation rules and constraints
 */
export const CREATION_VALIDATION = {
  /** Maximum URI length (Firestore: 1MB, reasonable: 2KB) */
  MAX_URI_LENGTH: 2048,

  /** Maximum metadata size in bytes (JSON stringified) */
  MAX_METADATA_SIZE: 10240, // 10KB

  /** Rating constraints (1-5 stars) */
  MIN_RATING: 1,
  MAX_RATING: 5,

  /** Prompt length constraints */
  MIN_PROMPT_LENGTH: 1,
  MAX_PROMPT_LENGTH: 500,

  /** Valid URI protocols */
  VALID_URI_PROTOCOLS: ["http:", "https:", "data:"] as const,

  /** Valid image MIME types */
  VALID_IMAGE_MIMES: [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
  ] as const,

  /** Valid video MIME types */
  VALID_VIDEO_MIMES: [
    "video/mp4",
    "video/webm",
    "video/quicktime",
  ] as const,
} as const;

// Freeze to prevent mutations
Object.freeze(CREATION_VALIDATION);

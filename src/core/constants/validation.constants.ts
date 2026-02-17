/**
 * Validation Constants
 * Single Responsibility: Define validation limits and rules
 */

export const VALIDATION_LIMITS = {
  /**
   * Prompt validation limits
   */
  PROMPT: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 5000,
  },

  /**
   * Text-to-voice validation limits
   */
  TEXT_TO_VOICE: {
    MAX_LENGTH: 5000,
  },

  /**
   * Number of images validation
   */
  NUM_IMAGES: {
    MIN: 1,
    MAX: 4,
  },

  /**
   * Guidance scale validation
   */
  GUIDANCE_SCALE: {
    MIN: 1,
    MAX: 20,
  },

  /**
   * Seed validation
   */
  SEED: {
    MIN: 0,
    MAX: 2147483647, // 32-bit integer max
  },
} as const;

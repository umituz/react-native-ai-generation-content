/**
 * Creation Status Constants
 *
 * Defines the lifecycle states of a creation.
 * Follows state machine pattern for valid transitions.
 *
 * @module CreationStatusConstants
 */

/**
 * Creation lifecycle status values
 * Represents the aggregate root's state machine
 */
export const CREATION_STATUS = {
  /** Initial state: AI generation in progress */
  PROCESSING: "processing" as const,

  /** Success state: Generation completed with result */
  COMPLETED: "completed" as const,

  /** Error state: Generation failed */
  FAILED: "failed" as const,
} as const;

// Freeze to prevent mutations
Object.freeze(CREATION_STATUS);

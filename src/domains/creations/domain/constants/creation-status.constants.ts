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

/** Union type of all valid status values */
export type CreationStatusValue =
  typeof CREATION_STATUS[keyof typeof CREATION_STATUS];

/**
 * Type guard for creation status values
 * @param value - Value to check
 * @returns True if value is a valid creation status
 */
export function isCreationStatus(
  value: unknown
): value is CreationStatusValue {
  return (
    typeof value === "string" &&
    Object.values(CREATION_STATUS).includes(
      value as CreationStatusValue
    )
  );
}

// Freeze to prevent mutations
Object.freeze(CREATION_STATUS);

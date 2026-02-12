/**
 * Creation Type Discriminators
 *
 * Used for polymorphic behavior based on creation type.
 * Each type may have different metadata structure.
 *
 * @module CreationTypesConstants
 */

/**
 * Creation type discriminators
 */
export const CREATION_TYPES = {
  /** Baby face prediction generation */
  BABY_PREDICTION: "baby-prediction" as const,

  /** Text-to-video generation */
  TEXT_TO_VIDEO: "text-to-video" as const,

  /** Image generation */
  IMAGE_GENERATION: "image-generation" as const,
} as const;

/** Union type of all creation types */
export type CreationTypeValue =
  typeof CREATION_TYPES[keyof typeof CREATION_TYPES];

/**
 * Type guard for creation type values
 * @param value - Value to check
 * @returns True if value is a valid creation type
 */
export function isCreationType(
  value: unknown
): value is CreationTypeValue {
  return (
    typeof value === "string" &&
    Object.values(CREATION_TYPES).includes(
      value as CreationTypeValue
    )
  );
}

// Freeze to prevent mutations
Object.freeze(CREATION_TYPES);

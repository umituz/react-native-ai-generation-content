/**
 * Couple Input Utilities - Type Definitions
 */

/** Target for generation: which model on which provider */
export interface GenerationTargetLike {
  readonly model: string;
  readonly providerId: string;
}

// CoupleInputResult is now defined inline where needed

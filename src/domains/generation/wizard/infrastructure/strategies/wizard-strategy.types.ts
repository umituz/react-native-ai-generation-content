/**
 * Wizard Strategy Types
 * Shared types for all wizard strategies
 */

export interface WizardStrategy {
  /** Execute the generation - returns result with URLs */
  execute: (input: unknown) => Promise<{ imageUrl?: string; videoUrl?: string }>;
  /** Get credit cost for this generation */
  getCreditCost: () => number;
}

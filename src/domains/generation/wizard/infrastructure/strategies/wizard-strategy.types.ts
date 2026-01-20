/**
 * Wizard Strategy Types
 * Shared types for all wizard strategies
 */

export interface WizardStrategy {
  execute: (input: unknown) => Promise<{ imageUrl?: string; videoUrl?: string }>;
  getCreditCost: () => number;
  save?: (result: unknown, userId: string) => Promise<void>;
}

/**
 * Wizard Strategy Types
 * Shared types for all wizard strategies
 */

export interface WizardStrategy {
  execute: (
    input: unknown,
    onProgress?: (progress: number) => void,
  ) => Promise<{ imageUrl?: string; videoUrl?: string }>;
  getCreditCost: () => number;
  save?: (result: unknown, userId: string) => Promise<void>;
}

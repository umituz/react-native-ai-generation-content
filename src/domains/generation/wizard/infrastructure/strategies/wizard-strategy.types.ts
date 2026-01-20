/**
 * Wizard Strategy Types
 * Shared types for all wizard strategies
 */

export interface WizardStrategy {
  execute: (input: unknown) => Promise<{ imageUrl?: string; videoUrl?: string }>;
  getCreditCost: () => number;
  /** Save as processing when generation starts - returns creation ID */
  saveAsProcessing?: (userId: string, input: unknown) => Promise<string>;
  /** Update to completed when generation finishes */
  save?: (result: unknown, userId: string, creationId?: string) => Promise<void>;
}

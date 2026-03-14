/**
 * Wizard Image Generation Types
 * Type definitions for wizard image generation strategy
 */

import type { WizardScenarioData } from "../../presentation/hooks/useWizardGeneration";

export interface WizardImageInput {
  /** Photos are optional for text-to-image */
  readonly photos: readonly string[];
  readonly prompt: string;
  /** Optional style from wizard selection (text-to-image only) */
  readonly style?: string;
  /** Optional aspect ratio (passed to model) */
  readonly aspectRatio?: string;
}

export interface CreateImageStrategyOptions {
  readonly scenario: WizardScenarioData;
  readonly collectionName?: string;
  /** Credit cost for this generation - REQUIRED, determined by the app */
  readonly creditCost: number;
}

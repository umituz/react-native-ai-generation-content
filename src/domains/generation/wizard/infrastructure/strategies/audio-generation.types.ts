/**
 * Wizard Audio Generation Types
 * Type definitions for wizard audio generation strategy (TTS)
 */

import type { WizardScenarioData } from "../../presentation/hooks/useWizardGeneration";

export interface WizardAudioInput {
  /** Text content to convert to speech */
  readonly text: string;
  /** Voice preset name (model-specific) */
  readonly voice?: string;
  /** Language code (e.g., "en", "es") */
  readonly language?: string;
  /** Exaggeration factor for voice expressiveness (0.0 - 1.0) */
  readonly exaggeration?: number;
  /** CFG/pace control weight */
  readonly cfgWeight?: number;
}

export interface CreateAudioStrategyOptions {
  readonly scenario: WizardScenarioData;
  readonly collectionName?: string;
  /** Credit cost for this generation - REQUIRED, determined by the app */
  readonly creditCost: number;
}

/**
 * Wizard Image Generation Types
 * Type definitions for wizard image generation strategy
 */

import type { InteractionStyle } from "../../../../prompts/infrastructure/builders/interaction-style-builder";
import type { WizardScenarioData } from "../../presentation/hooks/useWizardGeneration";
import type { ScenarioPromptType } from "../../../../scenarios/domain/Scenario";

export interface WizardImageInput {
  /** Photos are optional for text-to-image */
  readonly photos: readonly string[];
  readonly prompt: string;
  /** Optional interaction style for multi-person images */
  readonly interactionStyle?: InteractionStyle;
  /** Optional style from wizard selection */
  readonly style?: string;
  /** Prompt type - identity preservation or genetic blend */
  readonly promptType?: ScenarioPromptType;
}

export interface CreateImageStrategyOptions {
  readonly scenario: WizardScenarioData;
  readonly collectionName?: string;
  /** Credit cost for this generation - REQUIRED, determined by the app */
  readonly creditCost: number;
}

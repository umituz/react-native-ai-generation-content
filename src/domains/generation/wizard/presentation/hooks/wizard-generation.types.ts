/**
 * Wizard Generation Types
 * Types and interfaces for useWizardGeneration hook
 */

import type { AlertMessages } from "../../../../../presentation/hooks/generation/types";
import type { ScenarioInputType } from "../../../../scenarios/domain/Scenario";

export type WizardOutputType = "image" | "video";

export interface WizardScenarioData {
  readonly id: string;
  readonly aiPrompt?: string;
  readonly outputType?: WizardOutputType;
  /** Input type - determines required photo count. Default: "single" */
  readonly inputType?: ScenarioInputType;
  readonly model?: string;
  readonly title?: string;
  readonly description?: string;
  [key: string]: unknown;
}

export interface UseWizardGenerationProps {
  readonly scenario: WizardScenarioData;
  readonly wizardData: Record<string, unknown>;
  readonly userId?: string;
  readonly isGeneratingStep: boolean;
  /** Required - alert messages for error states */
  readonly alertMessages: AlertMessages;
  readonly onSuccess?: (result: unknown) => void;
  readonly onError?: (error: string) => void;
  readonly onCreditsExhausted?: () => void;
  /** Enable background job tracking for CreationsGallery display */
  readonly trackAsBackgroundJob?: boolean;
}

export interface UseWizardGenerationReturn {
  readonly isGenerating: boolean;
}

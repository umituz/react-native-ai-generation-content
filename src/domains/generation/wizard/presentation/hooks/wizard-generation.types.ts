/**
 * Wizard Generation Types
 * Types and interfaces for useWizardGeneration hook
 */

import type { AlertMessages } from "../../../../../presentation/hooks/generation/types";
import type { ScenarioInputType, ScenarioPromptType } from "../../../../scenarios/domain/Scenario";
import type { VideoModelConfig } from "../../../../../domain/interfaces/video-model-config.types";

export type WizardOutputType = "image" | "video";

export interface WizardScenarioData {
  readonly id: string;
  readonly aiPrompt?: string;
  readonly outputType?: WizardOutputType;
  /** Input type - determines required photo count. Default: "single" */
  readonly inputType?: ScenarioInputType;
  /** Prompt type - identity preservation or genetic blend */
  readonly promptType?: ScenarioPromptType;
  readonly model?: string;
  readonly title?: string;
  readonly description?: string;
  /** Video feature type - set by main app to control generation mode */
  readonly featureType?: "text-to-video" | "image-to-video";
  [key: string]: unknown;
}

export interface UseWizardGenerationProps {
  readonly scenario: WizardScenarioData;
  /** Model configuration - encapsulates all model-specific behavior */
  readonly modelConfig?: VideoModelConfig;
  readonly wizardData: Record<string, unknown>;
  readonly userId?: string;
  readonly isGeneratingStep: boolean;
  /** Required - alert messages for error states */
  readonly alertMessages: AlertMessages;
  /** Credit cost for this generation - REQUIRED, determined by the app */
  readonly creditCost: number;
  /** Called after successful generation to deduct credits — provided by the app */
  readonly deductCredits?: (cost: number) => Promise<boolean>;
  readonly onSuccess?: (result: unknown) => void;
  readonly onError?: (error: string) => void;
  readonly onCreditsExhausted?: () => void;
  /** Enable background job tracking for CreationsGallery display */
  readonly trackAsBackgroundJob?: boolean;
}

export interface UseWizardGenerationReturn {
  readonly isGenerating: boolean;
}

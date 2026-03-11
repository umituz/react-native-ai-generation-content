/**
 * Wizard Generation Types
 * Types and interfaces for useWizardGeneration hook
 */

import type { AlertMessages } from "../../../../../presentation/hooks/generation/types";
import type { ScenarioInputType } from "../../../../scenarios/domain/Scenario";
import type { VideoModelConfig } from "../../../../../domain/interfaces/video-model-config.types";

export type WizardOutputType = "image" | "video" | "audio";

export interface WizardScenarioData {
  readonly id: string;
  readonly aiPrompt?: string;
  readonly outputType?: WizardOutputType;
  /** Input type - determines required photo count. Default: "single" */
  readonly inputType?: ScenarioInputType;
  readonly model?: string;
  /** AI provider to use (e.g. "fal", "pruna"). Falls back to active provider. */
  readonly providerId?: string;
  readonly title?: string;
  readonly description?: string;
  /** Video feature type - set by main app to control generation mode */
  readonly featureType?: "text-to-video" | "image-to-video";
  /** Pre-generated image URL — when set, video generation uses this as source image instead of extracting from wizard data */
  readonly preGeneratedImageUrl?: string;
  [key: string]: unknown;
}

export interface UseWizardGenerationProps {
  readonly scenario: WizardScenarioData;
  /** Model configuration - encapsulates all model-specific behavior */
  readonly modelConfig?: VideoModelConfig;
  readonly wizardData: Record<string, unknown>;
  readonly userId?: string;
  readonly isGeneratingStep: boolean;
  /** When true, generation waits even if on GENERATING step (e.g. prompt enhancement in progress) */
  readonly isPreparing?: boolean;
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

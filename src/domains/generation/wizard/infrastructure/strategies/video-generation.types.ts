/**
 * Wizard Video Generation Types
 * Type definitions for wizard video generation strategy
 */

import type { WizardScenarioData } from "../../presentation/hooks/useWizardGeneration";
import type { VideoModelConfig } from "../../../../../domain/interfaces/video-model-config.types";

export interface WizardVideoInput {
  /** Source image (optional for text-to-video) */
  readonly sourceImageBase64?: string;
  /** Target image (optional, uses source if not provided) */
  readonly targetImageBase64?: string;
  readonly prompt: string;
  /** Video duration in seconds */
  readonly duration?: number;
  /** Aspect ratio (e.g., "16:9", "9:16") */
  readonly aspectRatio?: string;
  /** Video resolution (e.g., "720p", "1080p") */
  readonly resolution?: string;
  /** Audio file as base64 or URL for background music / audio-driven video */
  readonly audioUrl?: string;
  /** Quality mode: "draft" (faster, cheaper) or "normal" (higher quality) */
  readonly qualityMode?: "draft" | "normal";
}

export interface CreateVideoStrategyOptions {
  readonly scenario: WizardScenarioData;
  /** Model configuration - encapsulates all model-specific behavior */
  readonly modelConfig?: VideoModelConfig;
  readonly collectionName?: string;
  /** Credit cost for this generation - REQUIRED, determined by the app */
  readonly creditCost: number;
}

export interface ExecutionResult {
  success: boolean;
  videoUrl?: string;
  requestId?: string;
  error?: string;
}

export interface SubmissionResult {
  success: boolean;
  requestId?: string;
  model?: string;
  error?: string;
}

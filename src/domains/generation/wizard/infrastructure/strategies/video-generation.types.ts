/**
 * Wizard Video Generation Types
 * Type definitions for wizard video generation strategy
 */

import type { WizardScenarioData } from "../../presentation/hooks/useWizardGeneration";

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
}

export interface WizardVideoResult {
  readonly videoUrl: string;
}

export interface CreateVideoStrategyOptions {
  readonly scenario: WizardScenarioData;
  readonly collectionName?: string;
}

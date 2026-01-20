/**
 * Wizard Video Generation Types
 * Type definitions for wizard video generation strategy
 */

import type { WizardScenarioData } from "../../presentation/hooks/useWizardGeneration";
import type { ScenarioInputType } from "../../../../scenarios/domain/Scenario";

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

export interface PhotoValidationResult {
  isValid: boolean;
  errorKey?: string;
}

export function validatePhotoCount(
  photoCount: number,
  inputType: ScenarioInputType | undefined,
): PhotoValidationResult {
  const effectiveInputType = inputType ?? "single";

  switch (effectiveInputType) {
    case "dual":
      if (photoCount < 2) {
        return { isValid: false, errorKey: "error.generation.dualPhotosRequired" };
      }
      break;
    case "single":
      if (photoCount < 1) {
        return { isValid: false, errorKey: "error.generation.photoRequired" };
      }
      break;
    case "text":
      break;
  }

  return { isValid: true };
}

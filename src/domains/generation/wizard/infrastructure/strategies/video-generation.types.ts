/**
 * Wizard Video Generation Types
 * Type definitions for wizard video generation strategy
 */

import type { WizardScenarioData } from "../../presentation/hooks/useWizardGeneration";
import type { ScenarioInputType } from "../../../../scenarios/domain/Scenario";
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
}

export interface CreateVideoStrategyOptions {
  readonly scenario: WizardScenarioData;
  /** Model configuration - encapsulates all model-specific behavior */
  readonly modelConfig?: VideoModelConfig;
  readonly collectionName?: string;
  /** Credit cost for this generation - REQUIRED, determined by the app */
  readonly creditCost: number;
}

interface PhotoValidationResult {
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

/**
 * Type guard for WizardVideoInput
 * Validates runtime input and provides type safety
 */
function isWizardVideoInput(input: unknown): input is WizardVideoInput {
  if (!input || typeof input !== "object") {
    return false;
  }

  const obj = input as Record<string, unknown>;

  // prompt is required
  if (typeof obj.prompt !== "string" || obj.prompt.length === 0) {
    return false;
  }

  // Optional fields validation
  if (obj.sourceImageBase64 !== undefined && typeof obj.sourceImageBase64 !== "string") {
    return false;
  }

  if (obj.targetImageBase64 !== undefined && typeof obj.targetImageBase64 !== "string") {
    return false;
  }

  if (obj.duration !== undefined && typeof obj.duration !== "number") {
    return false;
  }

  if (obj.aspectRatio !== undefined && typeof obj.aspectRatio !== "string") {
    return false;
  }

  if (obj.resolution !== undefined && typeof obj.resolution !== "string") {
    return false;
  }

  return true;
}

/**
 * Validates and casts input to WizardVideoInput
 * Throws descriptive error if validation fails
 */
export function validateWizardVideoInput(input: unknown): WizardVideoInput {
  if (!isWizardVideoInput(input)) {
    const errors: string[] = [];

    if (!input || typeof input !== "object") {
      throw new Error("Invalid input: expected object");
    }

    const obj = input as Record<string, unknown>;

    if (typeof obj.prompt !== "string" || obj.prompt.length === 0) {
      errors.push("prompt (string, required)");
    }

    if (obj.sourceImageBase64 !== undefined && typeof obj.sourceImageBase64 !== "string") {
      errors.push("sourceImageBase64 (string, optional)");
    }

    if (obj.targetImageBase64 !== undefined && typeof obj.targetImageBase64 !== "string") {
      errors.push("targetImageBase64 (string, optional)");
    }

    if (obj.duration !== undefined && typeof obj.duration !== "number") {
      errors.push("duration (number, optional)");
    }

    if (obj.aspectRatio !== undefined && typeof obj.aspectRatio !== "string") {
      errors.push("aspectRatio (string, optional)");
    }

    if (obj.resolution !== undefined && typeof obj.resolution !== "string") {
      errors.push("resolution (string, optional)");
    }

    throw new Error(`Invalid WizardVideoInput: ${errors.join(", ")}`);
  }

  return input;
}

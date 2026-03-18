/**
 * Wizard Video Generation Validation
 * Validation functions for video generation input
 */

import type { WizardVideoInput } from "./video-generation.types";
import type { ScenarioInputType } from "../../../../scenarios/domain/Scenario";

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
    default: {
      // Exhaustive check: log unexpected input types in development
      const _exhaustive: never = effectiveInputType;
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.warn(`[validatePhotoCount] Unknown inputType: ${_exhaustive}`);
      }
      break;
    }
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

  if (obj.audioUrl !== undefined && typeof obj.audioUrl !== "string") {
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

    if (obj.audioUrl !== undefined && typeof obj.audioUrl !== "string") {
      errors.push("audioUrl (string, optional)");
    }

    throw new Error(`Invalid WizardVideoInput: ${errors.join(", ")}`);
  }

  return input;
}

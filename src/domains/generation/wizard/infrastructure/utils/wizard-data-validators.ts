/**
 * Wizard Data Validators
 * Centralized validation utilities for wizard generation data
 * DRY: Used across AIGenerateScreen, TextToVideoWizardScreen, ImageToVideoWizardScreen
 *
 * Handles both raw values and selection format objects from wizard steps:
 * - Raw: 4, "480p"
 * - Selection format: { uri: "4s", selection: 4, previewUrl: "" }
 */

import { extractDuration, extractResolution } from "./credit-value-extractors";

export interface ValidationResult<T> {
  value?: T;
  error?: string;
}

/**
 * Validate and extract duration from wizard data
 *
 * @param data - Wizard generation data
 * @returns Validation result with value or error
 */
export function validateDuration(
  data: Record<string, unknown>,
): ValidationResult<number> {
  const duration = extractDuration(data.duration);

  if (!duration) {
    return {
      error: `Invalid duration: ${JSON.stringify(data.duration)}. Must be a positive number.`,
    };
  }

  return { value: duration };
}

/**
 * Validate and extract resolution from wizard data
 *
 * @param data - Wizard generation data
 * @returns Validation result with resolution or error
 */
export function validateResolution(
  data: Record<string, unknown>,
): ValidationResult<string> {
  const resolution = extractResolution(data.resolution);

  if (!resolution) {
    return {
      error: `Invalid resolution: ${JSON.stringify(data.resolution)}. Must be a valid resolution string.`,
    };
  }

  return { value: resolution };
}

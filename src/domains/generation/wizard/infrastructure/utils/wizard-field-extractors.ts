/**
 * Wizard Field Extractors
 * Specialized extractors for wizard-specific data fields
 */

import { extractTrimmedString, extractNumber } from "./primitive-extractors";

/**
 * Extracts prompt from wizard data with fallback chain
 * Checks multiple keys in order: prompt, motion_prompt, text, userPrompt
 */
export function extractPrompt(
  wizardData: Record<string, unknown>,
  fallback?: string,
): string | undefined {
  const promptKeys = ["prompt", "motion_prompt", "text", "userPrompt", "text_input"];

  for (const key of promptKeys) {
    if (key in wizardData) {
      const extracted = extractTrimmedString(wizardData[key]);
      if (extracted) {
        return extracted;
      }
    }
  }

  return fallback?.trim() || undefined;
}

/**
 * Extracts duration from wizard data
 * Handles both direct number and object with value field
 */
export function extractDuration(
  wizardData: Record<string, unknown>,
): number | undefined {
  const durationData = wizardData.duration;
  const extracted = extractNumber(durationData);
  if (extracted !== undefined && extracted > 0) {
    return extracted;
  }
  return undefined;
}

/**
 * Extracts aspect ratio from wizard data
 * Common values: "16:9", "9:16", "1:1", "4:3"
 */
export function extractAspectRatio(
  wizardData: Record<string, unknown>,
): string | undefined {
  const aspectRatioData = wizardData.aspect_ratio;
  return extractTrimmedString(aspectRatioData);
}

/**
 * Extracts resolution from wizard data
 * Common values: "720p", "1080p", "default"
 */
export function extractResolution(
  wizardData: Record<string, unknown>,
): string | undefined {
  const resolutionData = wizardData.resolution;
  return extractTrimmedString(resolutionData);
}

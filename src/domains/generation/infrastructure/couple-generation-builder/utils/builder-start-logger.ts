/**
 * Couple Image Generation Builder - Start Logger
 */

import type { BuilderStartParams } from "./types";

const DEV = typeof __DEV__ !== "undefined" && __DEV__;

/**
 * Log builder start with parameters
 */
export function logBuilderStart(
  prefix: string,
  params: BuilderStartParams
): void {
  if (!DEV) return;

  console.log(`${prefix} ========================================`);
  console.log(`${prefix} ===== BUILD COUPLE GENERATION START =====`);
  console.log(`${prefix} ========================================`);
  console.log(`${prefix} ===== INPUT PARAMS =====`);

  if (params.isCoupleMode !== undefined) {
    console.log(`${prefix} Is couple mode:`, params.isCoupleMode);
  }
  if (params.basePromptLength !== undefined) {
    console.log(`${prefix} Base prompt length:`, params.basePromptLength);
    console.log(`${prefix} Base prompt preview:`, params.basePromptLength.toString().substring(0, 200) + "...");
  }
  if (params.scenarioPromptLength !== undefined) {
    console.log(`${prefix} Scenario prompt length:`, params.scenarioPromptLength);
  }
  if (params.scenarioPromptPreview !== undefined) {
    console.log(`${prefix} Scenario prompt preview:`, params.scenarioPromptPreview);
  }
  if (params.aspectRatio !== undefined) {
    console.log(`${prefix} Aspect ratio:`, params.aspectRatio);
  }
  if (params.hasPartner2 !== undefined) {
    console.log(`${prefix} Has partner 2:`, params.hasPartner2);
  }
  if (params.hasCustomInstructions !== undefined) {
    console.log(`${prefix} Has custom instructions:`, params.hasCustomInstructions);
  }
  if (params.hasStrength !== undefined) {
    console.log(`${prefix} Has strength:`, params.hasStrength);
  }
  if (params.strength !== undefined) {
    console.log(`${prefix} Strength value:`, params.strength);
  }
  if (params.partner1Uri !== undefined) {
    console.log(`${prefix} Partner 1 URI:`, params.partner1Uri.substring(0, 80) + "...");
  }
  if (params.partner2Uri !== undefined) {
    console.log(`${prefix} Partner 2 URI:`, params.partner2Uri.substring(0, 80) + "...");
  }
}

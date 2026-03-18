/**
 * Couple Image Generation Builder - Step Logger
 */

import type { BuilderStepParams } from "./types";

const DEV = typeof __DEV__ !== "undefined" && __DEV__;

/**
 * Log builder step with details
 */
export function logBuilderStep(
  prefix: string,
  stepName: string,
  params: BuilderStepParams = {}
): void {
  if (!DEV) return;

  console.log(`${prefix} ===== ${stepName} =====`);

  if (params.photoUrisCount !== undefined) {
    console.log(`${prefix} Photo URIs count:`, params.photoUrisCount);
  }
  if (params.photo1 !== undefined) {
    console.log(`${prefix} Photo 1:`, params.photo1.substring(0, 60) + "...");
  }
  if (params.photo2 !== undefined) {
    console.log(`${prefix} Photo 2:`, params.photo2.substring(0, 60) + "...");
  }
  if (params.photoCount !== undefined) {
    console.log(`${prefix} Photo count:`, params.photoCount);
  }
  if (params.isCoupleMode !== undefined) {
    console.log(`${prefix} Is couple mode:`, params.isCoupleMode);
  }
  if (params.basePromptLength !== undefined) {
    console.log(`${prefix} Base prompt length:`, params.basePromptLength);
  }
  if (params.contextLength !== undefined) {
    console.log(`${prefix} Appearance context length:`, params.contextLength);
  }
  if (params.contextPreview !== undefined) {
    if (params.contextPreview.length > 0) {
      console.log(`${prefix} Appearance context preview:`, params.contextPreview + "...");
    } else {
      console.log(`${prefix} ℹ️ No appearance context returned (vision disabled)`);
    }
  }
  if (params.refinedPromptLength !== undefined) {
    console.log(`${prefix} Refined prompt length:`, params.refinedPromptLength);
  }
  if (params.refinedPromptPreview !== undefined) {
    console.log(`${prefix} Refined prompt preview:`, params.refinedPromptPreview + "...");
  }
  if (params.finalPromptLength !== undefined) {
    console.log(`${prefix} Final prompt length:`, params.finalPromptLength);
  }
  if (params.finalPromptPreview !== undefined) {
    console.log(`${prefix} Final prompt preview:`, params.finalPromptPreview + "...");
  }
  if (params.promptLength !== undefined) {
    console.log(`${prefix} Prompt length:`, params.promptLength);
  }
  if (params.promptPreview !== undefined) {
    console.log(`${prefix} Prompt preview:`, params.promptPreview + "...");
  }
  if (params.hasCustomInstructions !== undefined) {
    console.log(`${prefix} Has custom instructions:`, params.hasCustomInstructions);
  }
  if (params.customInstructions !== undefined) {
    console.log(`${prefix} Custom instructions:`, params.customInstructions);
  }
  if (params.partner1Uri !== undefined) {
    console.log(`${prefix} Partner 1 URI:`, params.partner1Uri.substring(0, 50) + "...");
  }
  if (params.partner2Uri !== undefined) {
    console.log(`${prefix} Partner 2 URI:`, params.partner2Uri ? params.partner2Uri.substring(0, 50) + "..." : null);
  }
  if (params.singleTarget !== undefined) {
    console.log(`${prefix} Single target:`, params.singleTarget);
  }
  if (params.coupleTarget !== undefined) {
    console.log(`${prefix} Couple target:`, params.coupleTarget);
  }
  if (params.targetModel !== undefined) {
    console.log(`${prefix} Target model:`, params.targetModel);
  }
  if (params.targetProvider !== undefined) {
    console.log(`${prefix} Target provider:`, params.targetProvider);
  }
  if (params.imageUrlsCount !== undefined) {
    console.log(`${prefix} Image URLs count:`, params.imageUrlsCount);
  }
  if (params.image1 !== undefined) {
    console.log(`${prefix} Image 1:`, params.image1.substring(0, 80) + "...");
  }
  if (params.image2 !== undefined) {
    console.log(`${prefix} Image 2:`, params.image2?.substring(0, 80) + "...");
  }
  if (params.aspectRatio !== undefined) {
    console.log(`${prefix} Aspect ratio:`, params.aspectRatio);
  }
  if (params.strength !== undefined) {
    console.log(`${prefix} Strength:`, params.strength);
  }
}

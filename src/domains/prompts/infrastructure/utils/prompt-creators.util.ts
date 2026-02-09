/**
 * Prompt Creation Utilities
 * Provides helper functions for creating specific types of prompts
 */

import type { ImagePromptResult, AnimeSelfiePromptResult } from "../services/ImagePromptBuilder";
import { ImagePromptBuilder } from "../services/ImagePromptBuilder";

/**
 * Create anime selfie prompt for Kontext model
 * Kontext uses instruction-based editing that preserves character identity automatically
 */
export function createAnimeSelfiePrompt(customStyle?: string): AnimeSelfiePromptResult {
  const stylePrefix = customStyle ? `${customStyle} anime style` : "anime style";

  const prompt = [
    `Transform this person into a ${stylePrefix} illustration.`,
    "IMPORTANT: Preserve the exact same gender - if male keep male, if female keep female.",
    "Keep the same face structure, hair color, eye color, skin tone, and facial expression.",
    "Make it look like a high-quality Japanese anime character portrait.",
    "Use vibrant anime colors, clean lineart, and cel-shaded rendering.",
    "Large expressive anime eyes with detailed iris, smooth anime skin with subtle blush.",
  ].join(" ");

  return {
    prompt,
    guidance_scale: 4.0,
  };
}

/**
 * Create a style transfer prompt with identity preservation
 */
export function createStyleTransferPrompt(style: string): ImagePromptResult {
  return ImagePromptBuilder.create()
    .withSegment(`${style} style`)
    .withIdentityPreservation()
    .withQuality()
    .withAnatomySafety()
    .build();
}

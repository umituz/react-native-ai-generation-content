/**
 * Image Prompt Builder Types
 */

export interface ImagePromptResult {
  prompt: string;
  negativePrompt: string;
}

export interface AnimeSelfiePromptResult {
  prompt: string;
  guidance_scale: number;
}

export interface ImagePromptBuilderOptions {
  separator?: string;
}

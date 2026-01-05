/**
 * Couple Future Types
 * Multi-reference image generation for couples using Nano Banana
 */

export type NanoBananaAspectRatio =
  | "auto"
  | "21:9"
  | "16:9"
  | "3:2"
  | "4:3"
  | "5:4"
  | "1:1"
  | "4:5"
  | "3:4"
  | "2:3"
  | "9:16";

export type NanoBananaOutputFormat = "jpeg" | "png" | "webp";

export interface CoupleFutureInput {
  partnerABase64: string;
  partnerBBase64: string;
  prompt: string;
}

export interface CoupleFutureConfig {
  timeoutMs?: number;
  aspectRatio?: NanoBananaAspectRatio;
  outputFormat?: NanoBananaOutputFormat;
  onProgress?: (progress: number) => void;
}

export interface CoupleFutureResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

export const COUPLE_FUTURE_DEFAULTS = {
  model: "fal-ai/nano-banana/edit",
  aspectRatio: "4:3" as NanoBananaAspectRatio,
  outputFormat: "jpeg" as NanoBananaOutputFormat,
  timeoutMs: 300000,
};

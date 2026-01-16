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
  aspectRatio: "4:3" as NanoBananaAspectRatio,
  outputFormat: "jpeg" as NanoBananaOutputFormat,
  timeoutMs: 300000,
};

export type CoupleFeatureId =
  | "romantic-mood"
  | "art-style"
  | "artist-style"
  | "wardrobe";

export interface CoupleFeatureSelection {
  romanticMoods?: string[];
  romanticIntensity?: number;
  artStyle?: string | null;
  artStyleIntensity?: number;
  artist?: string | null;
  artistIntensity?: number;
  wardrobeStyle?: string | null;
  wardrobeIntensity?: number;
}

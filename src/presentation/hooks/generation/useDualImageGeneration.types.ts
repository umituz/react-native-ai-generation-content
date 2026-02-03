/**
 * Types for useDualImageGeneration Hook
 */

import type { AlertMessages } from "./types";

export interface DualImageGenerationConfig {
  /** AI model to use */
  readonly model: string;
  /** Function that returns the prompt (can depend on external state) */
  readonly getPrompt: () => string;
  /** User ID for credit operations */
  readonly userId: string | undefined;
  /** Credit cost per generation */
  readonly creditCost: number;
  /** Alert messages */
  readonly alertMessages: AlertMessages;
  /** Image aspect ratio for picker */
  readonly imageAspect?: [number, number];
  /** Callbacks */
  readonly onCreditsExhausted?: () => void;
  readonly onSuccess?: (imageUrl: string) => void;
  readonly onError?: (error: string) => void;
}

export interface DualImageGenerationReturn {
  readonly sourceImageUri: string | null;
  readonly targetImageUri: string | null;
  readonly processedUrl: string | null;
  readonly isProcessing: boolean;
  readonly progress: number;
  selectSourceImage(): Promise<void>;
  selectTargetImage(): Promise<void>;
  process(): Promise<void>;
  save(): Promise<void>;
  reset(): void;
}

export interface GenerationInput {
  sourceBase64: string;
  targetBase64: string;
}

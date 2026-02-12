/**
 * Image Generation Types
 */

import type { ImageFeatureType } from "../../../domain/interfaces";
import type { Creation } from "../../../domains/creations/domain/entities/Creation";
import type { AlertMessages } from "./types";

export interface SingleImageInput {
  imageBase64: string;
  prompt?: string;
  options?: Record<string, unknown>;
}

export interface DualImageInput {
  sourceImageBase64: string;
  targetImageBase64: string;
  options?: Record<string, unknown>;
}

export type ImageGenerationInput = SingleImageInput | DualImageInput;

export interface ImageGenerationConfig<TInput extends ImageGenerationInput, TResult> {
  featureType: ImageFeatureType;
  userId: string | undefined;
  processResult: (imageUrl: string, input: TInput) => TResult;
  buildExecutorInput?: (input: TInput) => {
    imageBase64?: string;
    targetImageBase64?: string;
    prompt?: string;
    options?: Record<string, unknown>;
  };
  buildCreation?: (result: TResult, input: TInput) => Creation | null;
  creditCost: number;
  alertMessages: AlertMessages;
  onCreditsExhausted?: () => void;
  onSuccess?: (result: TResult) => void;
  onError?: (error: string) => void;
}

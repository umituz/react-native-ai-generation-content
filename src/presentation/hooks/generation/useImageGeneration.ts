/**
 * useImageGeneration Hook
 * Generic image generation hook for ANY image feature
 * Uses centralized orchestrator for credit/error handling
 */

import { useMemo, useCallback } from "react";
import { useGenerationOrchestrator } from "./orchestrator";
import type { GenerationStrategy, AlertMessages } from "./types";
import { executeImageFeature } from "../../../infrastructure/services";
import type { ImageFeatureType } from "../../../domain/interfaces";
import { createCreationsRepository } from "../../../domains/creations/infrastructure/adapters";
import type { Creation } from "../../../domains/creations/domain/entities/Creation";

/**
 * Generic input for single image features
 */
export interface SingleImageInput {
  imageBase64: string;
  prompt?: string;
  options?: Record<string, unknown>;
}

/**
 * Generic input for dual image features (face-swap, etc.)
 */
export interface DualImageInput {
  sourceImageBase64: string;
  targetImageBase64: string;
  options?: Record<string, unknown>;
}

export type ImageGenerationInput = SingleImageInput | DualImageInput;

export interface ImageGenerationConfig<TInput extends ImageGenerationInput, TResult> {
  /** Feature type (face-swap, upscale, remove-background, etc.) */
  featureType: ImageFeatureType;
  /** User ID for credit operations */
  userId: string | undefined;
  /** Transform image URL to result type */
  processResult: (imageUrl: string, input: TInput) => TResult;
  /** Build input for executor from generic input */
  buildExecutorInput?: (input: TInput) => {
    imageBase64?: string;
    targetImageBase64?: string;
    prompt?: string;
    options?: Record<string, unknown>;
  };
  /** Optional: Build creation for saving */
  buildCreation?: (result: TResult, input: TInput) => Creation | null;
  /** Credit cost (default: 1) */
  creditCost?: number;
  /** Alert messages for errors */
  alertMessages: AlertMessages;
  /** Callbacks */
  onCreditsExhausted?: () => void;
  onSuccess?: (result: TResult) => void;
  onError?: (error: string) => void;
}

/**
 * Default input builder for single image
 */
const defaultSingleImageBuilder = (input: SingleImageInput) => ({
  imageBase64: input.imageBase64,
  prompt: input.prompt,
  options: input.options,
});

/**
 * Default input builder for dual image
 */
const defaultDualImageBuilder = (input: DualImageInput) => ({
  imageBase64: input.sourceImageBase64,
  targetImageBase64: input.targetImageBase64,
  options: input.options,
});

/**
 * Check if input is dual image type
 */
const isDualImageInput = (input: ImageGenerationInput): input is DualImageInput => {
  return "sourceImageBase64" in input && "targetImageBase64" in input;
};

export const useImageGeneration = <
  TInput extends ImageGenerationInput,
  TResult,
>(config: ImageGenerationConfig<TInput, TResult>) => {
  const {
    featureType,
    userId,
    processResult,
    buildExecutorInput,
    buildCreation,
    creditCost = 1,
    alertMessages,
    onCreditsExhausted,
    onSuccess,
    onError,
  } = config;

  const repository = useMemo(
    () => createCreationsRepository("creations"),
    [],
  );

  const strategy: GenerationStrategy<TInput, TResult> = useMemo(
    () => ({
      execute: async (input, onProgress) => {
        // Build executor input
        const executorInput = buildExecutorInput
          ? buildExecutorInput(input)
          : isDualImageInput(input)
            ? defaultDualImageBuilder(input)
            : defaultSingleImageBuilder(input as SingleImageInput);

        const result = await executeImageFeature(
          featureType,
          executorInput,
          { onProgress },
        );

        if (!result.success || !result.imageUrl) {
          throw new Error(result.error || "Image generation failed");
        }

        return processResult(result.imageUrl, input);
      },
      getCreditCost: () => creditCost,
      save: buildCreation
        ? async (result, uid) => {
            const creation = buildCreation(result, {} as TInput);
            if (creation) {
              await repository.create(uid, creation);
            }
          }
        : undefined,
    }),
    [featureType, processResult, buildExecutorInput, buildCreation, repository, creditCost],
  );

  const handleError = useCallback(
    (error: { message: string }) => {
      onError?.(error.message);
    },
    [onError],
  );

  return useGenerationOrchestrator(strategy, {
    userId,
    alertMessages,
    onCreditsExhausted,
    onSuccess: onSuccess as (result: unknown) => void,
    onError: handleError,
  });
};

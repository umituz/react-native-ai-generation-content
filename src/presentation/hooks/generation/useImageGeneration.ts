/**
 * Image Generation Hook
 * Generic hook for image feature execution with orchestration
 */

import { useMemo, useCallback, useRef } from "react";
import { useGenerationOrchestrator } from "./orchestrator";
import type { GenerationStrategy } from "./types";
import { executeImageFeature } from "../../../infrastructure/services";
import { createCreationsRepository } from "../../../domains/creations/infrastructure/adapters";
import type {
  ImageGenerationConfig,
  ImageGenerationInput,
  SingleImageInput,
  DualImageInput,
} from "./use-image-generation.types";

// Export types
export type { ImageGenerationConfig, ImageGenerationInput, SingleImageInput, DualImageInput } from "./use-image-generation.types";

const isDualImageInput = (input: ImageGenerationInput): input is DualImageInput =>
  "sourceImageBase64" in input && "targetImageBase64" in input;

const buildDefaultInput = (input: ImageGenerationInput) => {
  if (isDualImageInput(input)) {
    return {
      imageBase64: input.sourceImageBase64,
      targetImageBase64: input.targetImageBase64,
      options: input.options,
    };
  }
  return {
    imageBase64: (input as SingleImageInput).imageBase64,
    prompt: (input as SingleImageInput).prompt,
    options: input.options,
  };
};

export const useImageGeneration = <TInput extends ImageGenerationInput, TResult>(
  config: ImageGenerationConfig<TInput, TResult>,
) => {
  const {
    featureType,
    userId,
    processResult,
    buildExecutorInput,
    buildCreation,
    creditCost,
    alertMessages,
    onCreditsExhausted,
    onSuccess,
    onError,
  } = config;

  const repository = useMemo(() => createCreationsRepository("creations"), []);
  const lastInputRef = useRef<TInput | null>(null);

  const strategy: GenerationStrategy<TInput, TResult> = useMemo(
    () => ({
      execute: async (input) => {
        lastInputRef.current = input;

        const executorInput = buildExecutorInput
          ? buildExecutorInput(input)
          : buildDefaultInput(input);

        const result = await executeImageFeature(featureType, executorInput);

        if (!result.success || !result.imageUrl) {
          throw new Error(result.error || "Image generation failed");
        }

        return processResult(result.imageUrl, input);
      },
      getCreditCost: () => creditCost,
      save: buildCreation
        ? async (result, uid) => {
            const creation = buildCreation(result, lastInputRef.current ?? ({} as TInput));
            if (creation) {
              await repository.create(uid, creation);
            }
          }
        : undefined,
    }),
    [featureType, processResult, buildExecutorInput, buildCreation, repository, creditCost],
  );

  const handleError = useCallback((error: { message: string }) => onError?.(error.message), [onError]);

  return useGenerationOrchestrator(strategy, {
    userId,
    alertMessages,
    onCreditsExhausted,
    onSuccess: onSuccess as (result: unknown) => void,
    onError: handleError,
  });
};

/**
 * useVideoGeneration Hook
 * Generic video generation hook for dual-image video features
 * Uses centralized orchestrator for credit/error handling
 */

import { useMemo, useCallback, useRef } from "react";
import { useGenerationOrchestrator } from "./orchestrator";
import type { GenerationStrategy, AlertMessages } from "./types";
import { executeVideoFeature } from "../../../infrastructure/services";
import type { VideoFeatureType } from "../../../domain/interfaces";
import { createCreationsRepository } from "../../../domains/creations/infrastructure/adapters";
import type { Creation } from "../../../domains/creations/domain/entities/Creation";

/**
 * Input for dual image video features
 */
export interface DualImageVideoInput {
  sourceImageBase64: string;
  targetImageBase64: string;
  prompt?: string;
}

export interface VideoGenerationConfig<TResult> {
  /** Feature type for video generation */
  featureType: VideoFeatureType;
  /** User ID for credit operations */
  userId: string | undefined;
  /** Transform video URL to result type */
  processResult: (videoUrl: string, input: DualImageVideoInput) => TResult;
  /** Optional: Build creation for saving */
  buildCreation?: (result: TResult, input: DualImageVideoInput) => Creation | null;
  /** Credit cost (default: 1) */
  creditCost?: number;
  /** Alert messages for errors */
  alertMessages: AlertMessages;
  /** Callbacks */
  onCreditsExhausted?: () => void;
  onSuccess?: (result: TResult) => void;
  onError?: (error: string) => void;
}

export const useVideoGeneration = <TResult>(
  config: VideoGenerationConfig<TResult>,
) => {
  const {
    featureType,
    userId,
    processResult,
    buildCreation,
    creditCost = 1,
    alertMessages,
    onSuccess,
    onError,
  } = config;

  const repository = useMemo(
    () => createCreationsRepository("creations"),
    [],
  );

  const lastInputRef = useRef<DualImageVideoInput | null>(null);

  const strategy: GenerationStrategy<DualImageVideoInput, TResult> = useMemo(
    () => ({
      execute: async (input) => {
        lastInputRef.current = input;

        const result = await executeVideoFeature(
          featureType,
          {
            sourceImageBase64: input.sourceImageBase64,
            targetImageBase64: input.targetImageBase64,
            prompt: input.prompt,
          },
        );

        if (!result.success || !result.videoUrl) {
          throw new Error(result.error || "Video generation failed");
        }

        return processResult(result.videoUrl, input);
      },
      save: buildCreation
        ? async (result, uid) => {
            const creation = buildCreation(result, lastInputRef.current ?? {} as DualImageVideoInput);
            if (creation) {
              await repository.create(uid, creation);
            }
          }
        : undefined,
    }),
    [featureType, processResult, buildCreation, repository, creditCost],
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
    onSuccess: onSuccess as (result: unknown) => void,
    onError: handleError,
  });
};

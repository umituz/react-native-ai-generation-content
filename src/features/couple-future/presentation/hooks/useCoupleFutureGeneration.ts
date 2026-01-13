/**
 * useCoupleFutureGeneration Hook
 * Couple future generation using centralized orchestrator
 */

import { useMemo, useCallback, useRef } from "react";
import {
  useGenerationOrchestrator,
  type GenerationStrategy,
  type AlertMessages,
} from "../../../../presentation/hooks/generation";
import { executeCoupleFuture } from "../../infrastructure/executor";
import type { CoupleFutureInput } from "../../domain/types";
import { createCreationsRepository } from "../../../../domains/creations/infrastructure/adapters";
import type { Creation } from "../../../../domains/creations/domain/entities/Creation";

export interface CoupleFutureConfig<TResult> {
  userId: string | undefined;
  processResult: (imageUrl: string, input: CoupleFutureInput) => TResult;
  buildCreation?: (result: TResult, input: CoupleFutureInput) => Creation | null;
  onCreditsExhausted?: () => void;
  onSuccess?: (result: TResult) => void;
  onError?: (error: string) => void;
  alertMessages: AlertMessages;
}

export const useCoupleFutureGeneration = <TResult>(
  config: CoupleFutureConfig<TResult>,
) => {
  const {
    userId,
    processResult,
    buildCreation,
    onCreditsExhausted,
    onSuccess,
    onError,
    alertMessages,
  } = config;

  const repository = useMemo(
    () => createCreationsRepository("creations"),
    [],
  );

  // Store input for use in save callback
  const lastInputRef = useRef<CoupleFutureInput | null>(null);

  const strategy: GenerationStrategy<CoupleFutureInput, TResult> = useMemo(
    () => ({
      execute: async (input, onProgress) => {
        // Store input for save callback
        lastInputRef.current = input;

        const result = await executeCoupleFuture(
          {
            partnerABase64: input.partnerABase64,
            partnerBBase64: input.partnerBBase64,
            prompt: input.prompt,
          },
          { onProgress },
        );

        if (!result.success || !result.imageUrl) {
          throw new Error(result.error || "Generation failed");
        }

        return processResult(result.imageUrl, input);
      },
      getCreditCost: () => 1,
      save: buildCreation
        ? async (result, uid) => {
            const input = lastInputRef.current;
            if (input) {
              const creation = buildCreation(result, input);
              if (creation) {
                await repository.create(uid, creation);
              }
            }
          }
        : undefined,
    }),
    [processResult, buildCreation, repository],
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

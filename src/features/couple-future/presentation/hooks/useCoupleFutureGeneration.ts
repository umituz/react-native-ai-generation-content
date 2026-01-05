import { useCallback } from "react";
import { usePhotoGeneration } from "../../../../presentation/hooks/usePhotoGeneration";
import { executeCoupleFuture } from "../../infrastructure/executor";
import type { CoupleFutureInput } from "../../domain/types";
import type { PhotoGenerationConfig, PhotoGenerationError } from "../../../../presentation/hooks/photo-generation.types";
import { createCreationsRepository } from "../../../../domains/creations/infrastructure/adapters";

export interface UseCoupleFutureGenerationConfig<TInput extends CoupleFutureInput, TResult> {
  userId: string | undefined;
  processResult: (imageUrl: string, input: TInput) => Promise<TResult> | TResult;
  buildCreation?: (result: TResult, input: TInput) => any; // Type 'Creation' if known, otherwise any
  deductCredits?: () => Promise<void>;
  onSuccess?: (result: TResult) => void;
  onError?: (error: string) => void;
  alertMessages: {
    networkError: string;
    policyViolation: string;
    saveFailed: string;
    creditFailed: string;
    unknown: string;
  };
}

export const useCoupleFutureGeneration = <TInput extends CoupleFutureInput, TResult>(
  config: UseCoupleFutureGenerationConfig<TInput, TResult>
) => {
  const {
    userId,
    processResult,
    buildCreation,
    deductCredits,
    onSuccess,
    onError,
    alertMessages,
  } = config;

  const repository = useCallback(() => createCreationsRepository("creations"), []);

  const generationConfig: PhotoGenerationConfig<TInput, TResult, void> = {
    generate: async (input: TInput, onProgress?: (progress: number) => void) => {
      const result = await executeCoupleFuture(
        {
          partnerABase64: input.partnerABase64,
          partnerBBase64: input.partnerBBase64,
          prompt: input.prompt,
        },
        { onProgress }
      );

      if (!result.success || !result.imageUrl) {
        throw new Error(result.error || "Generation failed");
      }

      return processResult(result.imageUrl, input);
    },

    save: async (result: TResult, input: TInput) => {
      if (!userId || !buildCreation) {
        return;
      }
      const creation = buildCreation(result, input);
      if (creation) {
        await repository().create(userId, creation);
      }
    },

    deductCredits,
    onSuccess,
    onError: (error: PhotoGenerationError) => {
      onError?.(error.message);
    },
    alertMessages,
  };

  return usePhotoGeneration(generationConfig);
};

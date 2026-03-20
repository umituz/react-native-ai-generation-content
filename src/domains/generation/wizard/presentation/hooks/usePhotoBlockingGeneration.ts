/**
 * usePhotoBlockingGeneration Hook
 * Handles photo generation via blocking execution
 * - Uses orchestrator for synchronous generation
 * - Waits for result before returning
 * - Best for quick image operations (10-30 seconds)
 */

import { useRef, useCallback } from "react";
import { useGenerationOrchestrator } from "../../../../../presentation/hooks/generation";
import type { CreationPersistence } from "../../infrastructure/utils/creation-persistence.util";
import type { WizardStrategy } from "../../infrastructure/strategies/wizard-strategy.types";
import type { WizardScenarioData } from "./wizard-generation.types";
import type { AlertMessages } from "../../../../../presentation/hooks/generation/types";
import { createSuccessHandler, createErrorHandler } from "./usePhotoBlockingGeneration.handlers";
import { saveCreationToProcessing } from "./usePhotoBlockingGeneration.saver";


interface UsePhotoBlockingGenerationProps {
  readonly userId?: string;
  readonly scenario: WizardScenarioData;
  readonly persistence: CreationPersistence;
  readonly strategy: WizardStrategy;
  readonly creditCost?: number;
  readonly deductCredits?: (cost: number) => Promise<boolean>;
  readonly alertMessages: AlertMessages;
  readonly onSuccess?: (result: unknown) => void;
  readonly onError?: (error: string) => void;
  readonly onCreditsExhausted?: () => void;
}

interface UsePhotoBlockingGenerationReturn {
  readonly isGenerating: boolean;
  readonly startGeneration: (input: unknown, prompt: string) => Promise<void>;
}

export function usePhotoBlockingGeneration(
  props: UsePhotoBlockingGenerationProps,
): UsePhotoBlockingGenerationReturn {
  const {
    userId,
    scenario,
    persistence,
    creditCost,
    deductCredits,
    strategy,
    alertMessages,
    onSuccess,
    onError,
    onCreditsExhausted,
  } = props;

  const creationIdRef = useRef<string | null>(null);

  const handleSuccess = useCallback(
    createSuccessHandler({
      creationIdRef,
      userId,
      persistence,
      deductCredits,
      creditCost,
      onSuccess,
      onCreditsExhausted,
    }),
    [userId, persistence, deductCredits, creditCost, onSuccess, onCreditsExhausted],
  );

  const handleError = useCallback(
    createErrorHandler({
      creationIdRef,
      userId,
      persistence,
      onError,
    }),
    [userId, persistence, onError],
  );

  const { generate, isGenerating } = useGenerationOrchestrator(strategy, {
    userId: userId || null,
    alertMessages,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const startGeneration = useCallback(
    async (input: unknown, prompt: string) => {
      // Save to Firestore first
      await saveCreationToProcessing(
        { userId, scenario, persistence, creditCost, creationIdRef },
        input,
        prompt,
      );

      // Start blocking generation
      await generate(input);
    },
    [userId, scenario, persistence, creditCost, generate],
  );

  return { isGenerating, startGeneration };
}

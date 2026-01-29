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

declare const __DEV__: boolean;

export interface UsePhotoBlockingGenerationProps {
  readonly userId?: string;
  readonly scenario: WizardScenarioData;
  readonly persistence: CreationPersistence;
  readonly strategy: WizardStrategy;
  readonly alertMessages: AlertMessages;
  readonly onSuccess?: (result: unknown) => void;
  readonly onError?: (error: string) => void;
  readonly onCreditsExhausted?: () => void;
}

export interface UsePhotoBlockingGenerationReturn {
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
    strategy,
    alertMessages,
    onSuccess,
    onError,
    onCreditsExhausted,
  } = props;

  const creationIdRef = useRef<string | null>(null);

  const handleSuccess = useCallback(
    async (result: unknown) => {
      const typedResult = result as { imageUrl?: string; videoUrl?: string };
      const creationId = creationIdRef.current;

      if (creationId && userId) {
        try {
          await persistence.updateToCompleted(userId, creationId, {
            uri: typedResult.imageUrl || typedResult.videoUrl || "",
            imageUrl: typedResult.imageUrl,
            videoUrl: typedResult.videoUrl,
          });
        } catch (err) {
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.error("[PhotoBlockingGeneration] updateToCompleted error:", err);
          }
        }
      }

      creationIdRef.current = null;
      onSuccess?.(result);
    },
    [userId, persistence, onSuccess],
  );

  const handleError = useCallback(
    async (err: { message: string }) => {
      const creationId = creationIdRef.current;

      if (creationId && userId) {
        try {
          await persistence.updateToFailed(userId, creationId, err.message);
        } catch (updateErr) {
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.error("[PhotoBlockingGeneration] updateToFailed error:", updateErr);
          }
        }
      }

      creationIdRef.current = null;
      onError?.(err.message);
    },
    [userId, persistence, onError],
  );

  const { generate, isGenerating } = useGenerationOrchestrator(strategy, {
    userId,
    alertMessages,
    onCreditsExhausted,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const startGeneration = useCallback(
    async (input: unknown, prompt: string) => {
      // Save to Firestore first
      if (userId && prompt) {
        try {
          const creationId = await persistence.saveAsProcessing(userId, {
            scenarioId: scenario.id,
            scenarioTitle: scenario.title || scenario.id,
            prompt,
          });
          creationIdRef.current = creationId;

          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.log("[PhotoBlockingGeneration] Saved as processing:", creationId);
          }
        } catch (err) {
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.error("[PhotoBlockingGeneration] saveAsProcessing error:", err);
          }
        }
      }

      // Start blocking generation
      generate(input);
    },
    [userId, scenario, persistence, generate],
  );

  return { isGenerating, startGeneration };
}

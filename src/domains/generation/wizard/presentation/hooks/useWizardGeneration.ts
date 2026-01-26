/**
 * useWizardGeneration Hook
 * Wizard generation with Firestore persistence
 * - Saves status="processing" at start
 * - Updates to status="completed" on success
 * - Updates to status="failed" on error
 */

import { useEffect, useRef, useMemo, useCallback } from "react";
import { useGenerationOrchestrator } from "../../../../../presentation/hooks/generation";
import { createWizardStrategy, buildWizardInput } from "../../infrastructure/strategies";
import { createCreationPersistence } from "../../infrastructure/utils/creation-persistence.util";
import type {
  UseWizardGenerationProps,
  UseWizardGenerationReturn,
} from "./wizard-generation.types";

declare const __DEV__: boolean;

export type {
  WizardOutputType,
  WizardScenarioData,
  UseWizardGenerationProps,
  UseWizardGenerationReturn,
} from "./wizard-generation.types";

export const useWizardGeneration = (
  props: UseWizardGenerationProps,
): UseWizardGenerationReturn => {
  const {
    scenario,
    wizardData,
    userId,
    isGeneratingStep,
    alertMessages,
    creditCost,
    onSuccess,
    onError,
    onCreditsExhausted,
  } = props;

  const hasStarted = useRef(false);
  const creationIdRef = useRef<string | null>(null);
  const inputRef = useRef<{ prompt: string } | null>(null);

  // Persistence utility - separate from strategy
  const persistence = useMemo(() => createCreationPersistence(), []);

  // Strategy - only handles execution, creditCost is passed from app
  const strategy = useMemo(
    () => createWizardStrategy({ scenario, creditCost }),
    [scenario, creditCost],
  );

  const handleSuccess = useCallback(
    async (result: unknown) => {
      const typedResult = result as { imageUrl?: string; videoUrl?: string };
      const creationId = creationIdRef.current;

      // Update to completed in Firestore
      if (creationId && userId) {
        try {
          await persistence.updateToCompleted(userId, creationId, {
            uri: typedResult.imageUrl || typedResult.videoUrl || "",
            imageUrl: typedResult.imageUrl,
            videoUrl: typedResult.videoUrl,
          });
        } catch (err) {
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.error("[useWizardGeneration] updateToCompleted error:", err);
          }
        }
      }

      creationIdRef.current = null;
      inputRef.current = null;
      onSuccess?.(result);
    },
    [userId, persistence, onSuccess],
  );

  const handleError = useCallback(
    async (err: { message: string }) => {
      const creationId = creationIdRef.current;

      // Update to failed in Firestore
      if (creationId && userId) {
        try {
          await persistence.updateToFailed(userId, creationId, err.message);
        } catch (updateErr) {
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.error("[useWizardGeneration] updateToFailed error:", updateErr);
          }
        }
      }

      creationIdRef.current = null;
      inputRef.current = null;
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

  useEffect(() => {
    if (isGeneratingStep && !hasStarted.current && !isGenerating) {
      hasStarted.current = true;

      buildWizardInput(wizardData, scenario)
        .then(async (input) => {
          if (!input) {
            hasStarted.current = false;
            onError?.("Failed to build generation input");
            return;
          }

          inputRef.current = input as { prompt: string };

          // Save to Firestore with status="processing"
          const typedInput = input as { prompt?: string };
          if (userId && typedInput.prompt) {
            try {
              const creationId = await persistence.saveAsProcessing(userId, {
                scenarioId: scenario.id,
                scenarioTitle: scenario.title || scenario.id,
                prompt: typedInput.prompt,
              });
              creationIdRef.current = creationId;

              if (typeof __DEV__ !== "undefined" && __DEV__) {
                console.log("[useWizardGeneration] Saved as processing:", creationId);
              }
            } catch (err) {
              if (typeof __DEV__ !== "undefined" && __DEV__) {
                console.error("[useWizardGeneration] saveAsProcessing error:", err);
              }
            }
          }

          generate(input);
        })
        .catch((error) => {
          hasStarted.current = false;
          onError?.(error.message);
        });
    }

    if (!isGeneratingStep && hasStarted.current) {
      hasStarted.current = false;
    }
  }, [isGeneratingStep, scenario, wizardData, isGenerating, generate, onError, userId, persistence]);

  return { isGenerating };
};

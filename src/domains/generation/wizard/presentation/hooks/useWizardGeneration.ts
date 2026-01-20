/**
 * useWizardGeneration Hook
 * Wizard generation using orchestrator + strategy factory pattern
 * Saves to Firestore with status="processing" at start for gallery display
 */

import { useEffect, useRef, useMemo, useCallback } from "react";
import { useGenerationOrchestrator } from "../../../../../presentation/hooks/generation";
import { createWizardStrategy, buildWizardInput } from "../../infrastructure/strategies";
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
    onSuccess,
    onError,
    onCreditsExhausted,
  } = props;

  const hasStarted = useRef(false);
  const currentCreationIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[useWizardGeneration] Initialized", {
        scenarioId: scenario.id,
        outputType: scenario.outputType,
      });
    }
  }, [scenario.id, scenario.outputType]);

  const strategy = useMemo(() => {
    return createWizardStrategy({
      scenario,
      collectionName: "creations",
    });
  }, [scenario]);

  const handleSuccess = useCallback(
    (result: unknown) => {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[useWizardGeneration] Success", {
          creationId: currentCreationIdRef.current,
        });
      }
      currentCreationIdRef.current = null;
      onSuccess?.(result);
    },
    [onSuccess],
  );

  const handleError = useCallback(
    (err: { message: string }) => {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[useWizardGeneration] Error:", err.message);
      }
      // Note: Failed status update is handled by orchestrator via strategy
      currentCreationIdRef.current = null;
      onError?.(err.message);
    },
    [onError],
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
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[useWizardGeneration] Starting generation", {
          scenarioId: scenario.id,
          wizardDataKeys: Object.keys(wizardData),
        });
      }

      hasStarted.current = true;

      buildWizardInput(wizardData, scenario)
        .then(async (input) => {
          if (!input) {
            hasStarted.current = false;
            onError?.("Failed to build generation input");
            return;
          }

          // Save to Firestore with status="processing" BEFORE starting generation
          if (strategy.saveAsProcessing && userId) {
            try {
              const creationId = await strategy.saveAsProcessing(userId, input);
              currentCreationIdRef.current = creationId;

              if (typeof __DEV__ !== "undefined" && __DEV__) {
                console.log("[useWizardGeneration] Saved as processing:", creationId);
              }
            } catch (err) {
              if (typeof __DEV__ !== "undefined" && __DEV__) {
                console.error("[useWizardGeneration] saveAsProcessing error:", err);
              }
              // Continue with generation even if save fails
            }
          }

          generate(input);
        })
        .catch((error) => {
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.error("[useWizardGeneration] Input build error:", error);
          }
          hasStarted.current = false;
          onError?.(error.message);
        });
    }

    if (!isGeneratingStep && hasStarted.current) {
      hasStarted.current = false;
    }
  }, [
    isGeneratingStep,
    scenario,
    wizardData,
    isGenerating,
    generate,
    onError,
    strategy,
    userId,
  ]);

  return { isGenerating };
};

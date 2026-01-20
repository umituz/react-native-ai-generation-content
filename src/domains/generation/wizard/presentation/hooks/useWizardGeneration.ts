/**
 * useWizardGeneration Hook
 * Wizard generation using orchestrator + strategy factory pattern
 * Includes background job tracking for CreationsGallery display
 */

import { useEffect, useRef, useMemo, useCallback } from "react";
import { useGenerationOrchestrator } from "../../../../../presentation/hooks/generation";
import { usePendingJobs } from "../../../../../presentation/hooks/use-pending-jobs";
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
    trackAsBackgroundJob = true,
  } = props;

  const hasStarted = useRef(false);
  const currentJobIdRef = useRef<string | null>(null);

  const { addJob, updateJob, removeJob } = usePendingJobs();

  useEffect(() => {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[useWizardGeneration] Initialized", {
        scenarioId: scenario.id,
        outputType: scenario.outputType,
        trackAsBackgroundJob,
      });
    }
  }, [scenario.id, scenario.outputType, trackAsBackgroundJob]);

  const strategy = useMemo(() => {
    return createWizardStrategy({
      scenario,
      collectionName: "creations",
    });
  }, [scenario]);

  const handleSuccess = useCallback(
    (result: unknown) => {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[useWizardGeneration] Success");
      }

      if (trackAsBackgroundJob && currentJobIdRef.current) {
        removeJob(currentJobIdRef.current);
        currentJobIdRef.current = null;
      }

      onSuccess?.(result);
    },
    [trackAsBackgroundJob, removeJob, onSuccess],
  );

  const handleError = useCallback(
    (err: { message: string }) => {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[useWizardGeneration] Error:", err.message);
      }

      if (trackAsBackgroundJob && currentJobIdRef.current) {
        updateJob({
          id: currentJobIdRef.current,
          updates: { status: "failed", error: err.message, progress: 0 },
        });
      }

      onError?.(err.message);
    },
    [trackAsBackgroundJob, updateJob, onError],
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
        .then((input) => {
          if (!input) {
            hasStarted.current = false;
            onError?.("Failed to build generation input");
            return;
          }

          if (trackAsBackgroundJob && scenario.outputType) {
            const jobId = `wizard-${scenario.id}-${Date.now()}`;
            currentJobIdRef.current = jobId;

            addJob({
              id: jobId,
              input: {
                scenarioId: scenario.id,
                scenarioTitle: scenario.title,
                outputType: scenario.outputType,
              },
              type: scenario.outputType,
              status: "processing",
              progress: 10,
            });

            if (typeof __DEV__ !== "undefined" && __DEV__) {
              console.log("[useWizardGeneration] Created background job:", jobId);
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
    trackAsBackgroundJob,
    addJob,
  ]);

  return { isGenerating };
};

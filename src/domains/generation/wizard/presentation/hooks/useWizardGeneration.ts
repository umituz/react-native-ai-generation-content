/**
 * useWizardGeneration Hook
 * Wizard generation using orchestrator + strategy factory pattern
 * Includes background job tracking for CreationsGallery display
 */

import { useEffect, useRef, useMemo, useCallback } from "react";
import { useGenerationOrchestrator } from "../../../../../presentation/hooks/generation";
import type { AlertMessages } from "../../../../../presentation/hooks/generation/types";
import { usePendingJobs } from "../../../../../presentation/hooks/use-pending-jobs";
import { createWizardStrategy, buildWizardInput } from "../../infrastructure/strategies";

declare const __DEV__: boolean;

export type WizardOutputType = "image" | "video";

export interface WizardScenarioData {
  readonly id: string;
  /** AI prompt - optional if prompt comes from wizard data (text_input step) */
  readonly aiPrompt?: string;
  readonly outputType?: WizardOutputType;
  readonly model?: string;
  readonly title?: string;
  readonly description?: string;
  [key: string]: unknown;
}

export interface UseWizardGenerationProps {
  readonly scenario: WizardScenarioData;
  readonly wizardData: Record<string, unknown>;
  readonly userId?: string;
  readonly isGeneratingStep: boolean;
  /** Required - alert messages for error states */
  readonly alertMessages: AlertMessages;
  readonly onSuccess?: (result: unknown) => void;
  readonly onError?: (error: string) => void;
  readonly onCreditsExhausted?: () => void;
  /** Enable background job tracking for CreationsGallery display */
  readonly trackAsBackgroundJob?: boolean;
}

export interface UseWizardGenerationReturn {
  readonly isGenerating: boolean;
}

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

  // Background job tracking
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

  // Handle generation success - remove job from queue
  const handleSuccess = useCallback(
    (result: unknown) => {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[useWizardGeneration] Success");
      }

      // Remove job from pending queue (creation is saved)
      if (trackAsBackgroundJob && currentJobIdRef.current) {
        removeJob(currentJobIdRef.current);
        currentJobIdRef.current = null;
      }

      onSuccess?.(result);
    },
    [trackAsBackgroundJob, removeJob, onSuccess],
  );

  // Handle generation error - update job status
  const handleError = useCallback(
    (err: { message: string }) => {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[useWizardGeneration] Error:", err.message);
      }

      // Update job to failed status
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

  const { generate, isGenerating } = useGenerationOrchestrator(
    strategy,
    {
      userId,
      alertMessages,
      onCreditsExhausted,
      onSuccess: handleSuccess,
      onError: handleError,
    },
  );

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

          // Create background job for tracking
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

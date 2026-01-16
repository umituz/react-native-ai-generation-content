/**
 * useWizardGeneration Hook
 * Wizard generation using orchestrator + strategy factory pattern
 */

import { useEffect, useRef, useMemo } from "react";
import { useGenerationOrchestrator } from "../../../../../presentation/hooks/generation";
import type { AlertMessages } from "../../../../../presentation/hooks/generation/types";
import { createWizardStrategy, buildWizardInput } from "../../infrastructure/strategies";

declare const __DEV__: boolean;

// ============================================================================
// Types
// ============================================================================

export type WizardOutputType = "image" | "video";

export interface WizardScenarioData {
  readonly id: string;
  readonly aiPrompt: string;
  readonly outputType?: WizardOutputType;
  readonly model?: string; // AI model from app config
  readonly title?: string;
  readonly description?: string;
  [key: string]: unknown;
}

export interface UseWizardGenerationProps {
  readonly scenario: WizardScenarioData;
  readonly wizardData: Record<string, unknown>;
  readonly userId?: string;
  readonly isGeneratingStep: boolean;
  readonly alertMessages?: AlertMessages;
  readonly onSuccess?: (result: unknown) => void;
  readonly onError?: (error: string) => void;
  readonly onProgressChange?: (progress: number) => void;
  readonly onCreditsExhausted?: () => void;
}

export interface UseWizardGenerationReturn {
  readonly isGenerating: boolean;
  readonly progress: number;
}

// ============================================================================
// Hook
// ============================================================================

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
    onProgressChange,
    onCreditsExhausted,
  } = props;

  const hasStarted = useRef(false);

  // Log output type on mount
  useEffect(() => {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[useWizardGeneration] Initialized", {
        scenarioId: scenario.id,
        outputType: scenario.outputType || "video",
        hasOutputType: !!scenario.outputType,
      });
    }
  }, [scenario.id, scenario.outputType]);

  // Create strategy using factory
  const strategy = useMemo(() => {
    return createWizardStrategy({
      scenario,
      wizardData,
      collectionName: "creations",
    });
  }, [scenario, wizardData]);

  // Use orchestrator with strategy
  const { generate, isGenerating, progress } = useGenerationOrchestrator(
    strategy,
    {
      userId,
      alertMessages: alertMessages || {
        networkError: "No internet connection",
        policyViolation: "Content policy violation",
        saveFailed: "Failed to save",
        creditFailed: "Failed to deduct credits",
        unknown: "An error occurred",
      },
      onCreditsExhausted,
      onSuccess: (result) => {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[useWizardGeneration] Success");
        }
        onSuccess?.(result);
      },
      onError: (err) => {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[useWizardGeneration] Error:", err.message);
        }
        onError?.(err.message);
      },
    },
  );

  // Sync progress to parent
  useEffect(() => {
    if (onProgressChange) {
      onProgressChange(progress);
    }
  }, [progress, onProgressChange]);

  // Auto-start generation when entering generating step
  useEffect(() => {
    if (isGeneratingStep && !hasStarted.current && !isGenerating) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[useWizardGeneration] Starting generation", {
          scenarioId: scenario.id,
          wizardDataKeys: Object.keys(wizardData),
        });
      }

      // Build input and start generation
      buildWizardInput(wizardData, scenario)
        .then((input) => {
          if (!input) {
            const error = "Failed to build generation input";
            if (typeof __DEV__ !== "undefined" && __DEV__) {
              console.error("[useWizardGeneration]", error);
            }
            onError?.(error);
            return;
          }

          generate(input);
          hasStarted.current = true;
        })
        .catch((error) => {
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.error("[useWizardGeneration] Input build error:", error);
          }
          onError?.(error.message || "Failed to prepare generation");
        });
    }

    // Reset hasStarted when leaving generating step
    if (!isGeneratingStep && hasStarted.current) {
      hasStarted.current = false;
    }
  }, [isGeneratingStep, scenario, wizardData, isGenerating, generate, onError]);

  return {
    isGenerating,
    progress,
  };
};

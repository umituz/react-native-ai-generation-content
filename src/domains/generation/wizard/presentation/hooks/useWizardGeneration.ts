/**
 * useWizardGeneration Hook
 * Orchestrates wizard-based generation by delegating to appropriate mode:
 * - Video: Queue-based generation with background support
 * - Photo: Blocking execution for quick results
 */

import { useEffect, useRef, useMemo } from "react";
import { createWizardStrategy, buildWizardInput } from "../../infrastructure/strategies";
import { createCreationPersistence } from "../../infrastructure/utils/creation-persistence.util";
import { useVideoQueueGeneration } from "./useVideoQueueGeneration";
import { usePhotoBlockingGeneration } from "./usePhotoBlockingGeneration";
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
  const hasError = useRef(false);

  const persistence = useMemo(() => createCreationPersistence(), []);
  const strategy = useMemo(
    () => createWizardStrategy({ scenario, creditCost }),
    [scenario, creditCost],
  );

  const isVideoMode = scenario.outputType === "video" && !!strategy.submitToQueue;

  // Video generation hook (queue-based)
  const videoGeneration = useVideoQueueGeneration({
    userId,
    scenario,
    persistence,
    strategy,
    onSuccess,
    onError,
  });

  // Photo generation hook (blocking)
  const photoGeneration = usePhotoBlockingGeneration({
    userId,
    scenario,
    persistence,
    strategy,
    alertMessages,
    onSuccess,
    onError,
    onCreditsExhausted,
  });

  // Main effect: trigger generation when step becomes active
  useEffect(() => {
    const isAlreadyGenerating = videoGeneration.isGenerating || photoGeneration.isGenerating;

    if (isGeneratingStep && !hasStarted.current && !isAlreadyGenerating && !hasError.current) {
      hasStarted.current = true;

      buildWizardInput(wizardData, scenario)
        .then(async (input) => {
          if (!input) {
            hasStarted.current = false;
            hasError.current = true;
            onError?.("Failed to build generation input");
            return;
          }

          const typedInput = input as { prompt?: string };

          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.log("[WizardGeneration] Mode:", isVideoMode ? "VIDEO_QUEUE" : "PHOTO_BLOCKING");
          }

          if (isVideoMode) {
            await videoGeneration.startGeneration(input, typedInput.prompt || "");
          } else {
            await photoGeneration.startGeneration(input, typedInput.prompt || "");
          }
        })
        .catch((error) => {
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.error("[WizardGeneration] Build input error:", error.message);
          }
          hasStarted.current = false;
          hasError.current = true;
          onError?.(error.message);
        });
    }

    if (!isGeneratingStep) {
      hasStarted.current = false;
      hasError.current = false;
    }
  }, [
    isGeneratingStep,
    scenario,
    wizardData,
    isVideoMode,
    videoGeneration,
    photoGeneration,
    onError,
  ]);

  return {
    isGenerating: videoGeneration.isGenerating || photoGeneration.isGenerating,
  };
};

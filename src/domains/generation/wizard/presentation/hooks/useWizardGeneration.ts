/**
 * Wizard Generation Hook
 * Orchestrates wizard-based generation (Video: queue, Photo: blocking)
 */

import { useEffect, useReducer, useMemo, useRef } from "react";
import { createWizardStrategy } from "../../infrastructure/strategies";
import { createCreationPersistence } from "../../infrastructure/utils/creation-persistence.util";
import { useVideoQueueGeneration } from "./useVideoQueueGeneration";
import { usePhotoBlockingGeneration } from "./usePhotoBlockingGeneration";
import { generationReducer, INITIAL_STATE } from "./generationStateMachine";
import { executeWizardGeneration } from "./generationExecutor";
import type { UseWizardGenerationProps, UseWizardGenerationReturn } from "./wizard-generation.types";

export type {
  WizardOutputType,
  WizardScenarioData,
  UseWizardGenerationProps,
  UseWizardGenerationReturn,
} from "./wizard-generation.types";

export const useWizardGeneration = (props: UseWizardGenerationProps): UseWizardGenerationReturn => {
  const {
    scenario,
    modelConfig,
    wizardData,
    userId,
    isGeneratingStep,
    isPreparing = false,
    alertMessages,
    creditCost,
    deductCredits,
    onSuccess,
    onError,
    onCreditsExhausted,
  } = props;

  const [state, dispatch] = useReducer(generationReducer, INITIAL_STATE);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const persistence = useMemo(() => createCreationPersistence(), []);
  const strategy = useMemo(() => createWizardStrategy({ scenario, modelConfig, creditCost }), [scenario, modelConfig, creditCost]);
  const isVideoMode = scenario.outputType === "video" && !!strategy.submitToQueue;

  const videoGeneration = useVideoQueueGeneration({
    userId,
    scenario,
    persistence,
    strategy,
    creditCost,
    deductCredits,
    onSuccess,
    onError,
  });

  const photoGeneration = usePhotoBlockingGeneration({
    userId,
    scenario,
    persistence,
    strategy,
    creditCost,
    deductCredits,
    alertMessages,
    onSuccess,
    onError,
    onCreditsExhausted,
  });

  // Use refs for functions to avoid effect re-runs
  const videoStartGenerationRef = useRef(videoGeneration.startGeneration);
  const photoStartGenerationRef = useRef(photoGeneration.startGeneration);

  useEffect(() => {
    videoStartGenerationRef.current = videoGeneration.startGeneration;
    photoStartGenerationRef.current = photoGeneration.startGeneration;
  }, [videoGeneration.startGeneration, photoGeneration.startGeneration]);

  useEffect(() => {
    const isAlreadyGenerating = videoGeneration.isGenerating || photoGeneration.isGenerating;

    if (isGeneratingStep && state.status === "IDLE" && !isAlreadyGenerating && !isPreparing) {
      dispatch({ type: "START_PREPARATION" });

      // Execute generation and handle errors properly
      void executeWizardGeneration({
        wizardData,
        scenario,
        isVideoMode,
        isMountedRef,
        dispatch,
        onError,
        videoGenerationFn: videoStartGenerationRef.current,
        photoGenerationFn: photoStartGenerationRef.current,
      }).catch((error) => {
        // Catch any unhandled errors from executeWizardGeneration
        if (isMountedRef.current) {
          const errorMsg = error instanceof Error ? error.message : String(error);
          dispatch({ type: "ERROR", error: errorMsg });
          onError?.(errorMsg);
        }
      });
    }

    if (!isGeneratingStep && state.status !== "IDLE") {
      dispatch({ type: "RESET" });
    }
  }, [
    isGeneratingStep,
    isPreparing,
    state.status,
    scenario,
    wizardData,
    isVideoMode,
    videoGeneration.isGenerating,
    photoGeneration.isGenerating,
    onError,
  ]);

  return {
    isGenerating: videoGeneration.isGenerating || photoGeneration.isGenerating,
  };
};

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
    wizardData,
    userId,
    isGeneratingStep,
    alertMessages,
    creditCost,
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
  const strategy = useMemo(() => createWizardStrategy({ scenario, creditCost }), [scenario, creditCost]);
  const isVideoMode = scenario.outputType === "video" && !!strategy.submitToQueue;

  const videoGeneration = useVideoQueueGeneration({
    userId,
    scenario,
    persistence,
    strategy,
    onSuccess,
    onError,
  });

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

  useEffect(() => {
    const isAlreadyGenerating = videoGeneration.isGenerating || photoGeneration.isGenerating;

    if (isGeneratingStep && state.status === "IDLE" && !isAlreadyGenerating) {
      dispatch({ type: "START_PREPARATION" });

      executeWizardGeneration({
        wizardData,
        scenario,
        isVideoMode,
        isMountedRef,
        dispatch,
        onError,
        videoGenerationFn: videoGeneration.startGeneration,
        photoGenerationFn: photoGeneration.startGeneration,
      });
    }

    if (!isGeneratingStep && state.status !== "IDLE") {
      dispatch({ type: "RESET" });
    }
  }, [
    isGeneratingStep,
    state.status,
    scenario,
    wizardData,
    isVideoMode,
    videoGeneration.isGenerating,
    videoGeneration.startGeneration,
    photoGeneration.isGenerating,
    photoGeneration.startGeneration,
    onError,
  ]);

  return {
    isGenerating: videoGeneration.isGenerating || photoGeneration.isGenerating,
  };
};

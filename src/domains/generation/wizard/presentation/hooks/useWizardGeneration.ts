/**
 * useWizardGeneration Hook
 * Orchestrates wizard-based generation by delegating to appropriate mode:
 * - Video: Queue-based generation with background support
 * - Photo: Blocking execution for quick results
 *
 * Architecture: State machine pattern with useReducer
 * States: IDLE → PREPARING → GENERATING → COMPLETED/ERROR → IDLE
 */

import { useEffect, useReducer, useMemo } from "react";
import { createWizardStrategy, buildWizardInput } from "../../infrastructure/strategies";
import { createCreationPersistence } from "../../infrastructure/utils/creation-persistence.util";
import { useVideoQueueGeneration } from "./useVideoQueueGeneration";
import { usePhotoBlockingGeneration } from "./usePhotoBlockingGeneration";
import type {
  UseWizardGenerationProps,
  UseWizardGenerationReturn,
} from "./wizard-generation.types";

declare const __DEV__: boolean;

/**
 * Generation orchestration states
 */
type GenerationStatus =
  | "IDLE"        // Not started
  | "PREPARING"   // Building input
  | "GENERATING"  // Generation in progress
  | "ERROR"       // Failed (prevents retry)
  | "COMPLETED";  // Success

/**
 * State machine state
 */
interface GenerationState {
  status: GenerationStatus;
  error?: string;
}

/**
 * State machine actions
 */
type GenerationAction =
  | { type: "START_PREPARATION" }
  | { type: "START_GENERATION" }
  | { type: "COMPLETE" }
  | { type: "ERROR"; error: string }
  | { type: "RESET" };

/**
 * State machine reducer
 */
const generationReducer = (
  state: GenerationState,
  action: GenerationAction,
): GenerationState => {
  switch (action.type) {
    case "START_PREPARATION":
      return { status: "PREPARING" };
    case "START_GENERATION":
      return { status: "GENERATING" };
    case "COMPLETE":
      return { status: "COMPLETED" };
    case "ERROR":
      return { status: "ERROR", error: action.error };
    case "RESET":
      return { status: "IDLE" };
    default:
      return state;
  }
};

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

  // State machine: replaces multiple useRef flags
  const [state, dispatch] = useReducer(generationReducer, { status: "IDLE" });

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

    // Start generation: Simple single condition using state machine
    if (isGeneratingStep && state.status === "IDLE" && !isAlreadyGenerating) {
      dispatch({ type: "START_PREPARATION" });

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[WizardGeneration] State: PREPARING");
      }

      buildWizardInput(wizardData, scenario)
        .then(async (input) => {
          if (!input) {
            dispatch({ type: "ERROR", error: "Failed to build generation input" });
            onError?.("Failed to build generation input");
            return;
          }

          dispatch({ type: "START_GENERATION" });

          const typedInput = input as { prompt?: string };

          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.log("[WizardGeneration] State: GENERATING");
            console.log("[WizardGeneration] Mode:", isVideoMode ? "VIDEO_QUEUE" : "PHOTO_BLOCKING");
          }

          if (isVideoMode) {
            await videoGeneration.startGeneration(input, typedInput.prompt || "");
          } else {
            await photoGeneration.startGeneration(input, typedInput.prompt || "");
          }

          dispatch({ type: "COMPLETE" });
        })
        .catch((error) => {
          const errorMsg = error?.message || "error.generation.unknown";
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.error("[WizardGeneration] Build input error:", errorMsg, error);
          }
          dispatch({ type: "ERROR", error: errorMsg });
          onError?.(errorMsg);
        });
    }

    // Reset state when leaving generating step
    if (!isGeneratingStep && state.status !== "IDLE") {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[WizardGeneration] State: RESET");
      }
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

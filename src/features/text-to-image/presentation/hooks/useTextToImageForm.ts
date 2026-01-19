/**
 * Text-to-Image Form Hook
 * Composes form state and generation for complete form management
 */

import { useMemo } from "react";
import { useFormState, type UseFormStateOptions } from "./useFormState";
import { useGeneration, type TextToImageGenerationState } from "./useGeneration";
import type {
  TextToImageFormState,
  TextToImageFormActions,
  TextToImageCallbacks,
} from "../../domain/types";

export interface UseTextToImageFormOptions extends UseFormStateOptions {
  callbacks: TextToImageCallbacks;
}

export interface UseTextToImageFormReturn {
  state: TextToImageFormState;
  actions: TextToImageFormActions;
  generationState: TextToImageGenerationState;
  totalCost: number;
  handleGenerate: () => Promise<void>;
  isReady: boolean;
}

export function useTextToImageForm(
  options: UseTextToImageFormOptions
): UseTextToImageFormReturn {
  const { callbacks, defaults } = options;

  const { state, actions } = useFormState({ defaults });

  const { generationState, totalCost, handleGenerate } = useGeneration({
    formState: state,
    callbacks,
    onPromptCleared: actions.reset,
  });

  const isReady = useMemo(
    () => state.prompt.trim().length > 0 && !generationState.isGenerating,
    [state.prompt, generationState.isGenerating]
  );

  const wrappedHandleGenerate = async () => {
    await handleGenerate();
  };

  return {
    state,
    actions,
    generationState,
    totalCost,
    handleGenerate: wrappedHandleGenerate,
    isReady,
  };
}

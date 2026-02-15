/**
 * Text-to-Image Form State Hook
 * Manages form state for text-to-image generation
 * Now powered by generic form state factory
 */

import { createFormStateHook } from "../../../../shared/hooks/factories";
import type {
  TextToImageFormState,
  TextToImageFormActions,
  TextToImageFormDefaults,
} from "../../domain/types/form.types";

export interface UseFormStateOptions {
  defaults: TextToImageFormDefaults;
}

export interface UseFormStateReturn {
  state: TextToImageFormState;
  actions: TextToImageFormActions;
}

function validateDefaults(state: TextToImageFormState): void {
  if (!state.aspectRatio) {
    throw new Error("useFormState: defaults.aspectRatio is required");
  }
  if (!state.size) {
    throw new Error("useFormState: defaults.size is required");
  }
  if (!state.numImages) {
    throw new Error("useFormState: defaults.numImages is required");
  }
  if (state.guidanceScale === undefined) {
    throw new Error("useFormState: defaults.guidanceScale is required");
  }
  if (!state.outputFormat) {
    throw new Error("useFormState: defaults.outputFormat is required");
  }
  if (!state.selectedStyle) {
    throw new Error("useFormState: defaults.selectedStyle is required");
  }
}

// Create the form state hook using the factory
const useTextToImageFormStateInternal = createFormStateHook<
  TextToImageFormState,
  TextToImageFormDefaults,
  TextToImageFormActions
>({
  createInitialState: (defaults) => ({
    prompt: "",
    aspectRatio: defaults.aspectRatio!,
    size: defaults.size!,
    numImages: defaults.numImages!,
    negativePrompt: "",
    guidanceScale: defaults.guidanceScale!,
    selectedModel: null,
    outputFormat: defaults.outputFormat!,
    selectedStyle: defaults.selectedStyle!,
  }),
  validate: validateDefaults,
});

/**
 * Text-to-Image form state hook
 * Manages all form fields for text-to-image generation
 */
export function useFormState(options: UseFormStateOptions): UseFormStateReturn {
  return useTextToImageFormStateInternal(options);
}

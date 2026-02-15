/**
 * Generation Hook for Image-to-Video
 * Manages generation state and execution with abort support
 * Now powered by generic generation hook factory
 */

import { useMemo } from "react";
import { createGenerationHook } from "../../../../shared/hooks/factories";
import type {
  ImageToVideoFormState,
  ImageToVideoGenerationState,
  ImageToVideoCallbacks,
} from "../../domain/types";

export interface UseGenerationOptions {
  formState: ImageToVideoFormState;
  callbacks: ImageToVideoCallbacks;
}

export interface UseGenerationReturn {
  generationState: ImageToVideoGenerationState;
  handleGenerate: () => Promise<void>;
  setProgress: (progress: number) => void;
  setError: (error: string | null) => void;
  isReady: boolean;
}

// Create the generation hook using the factory
const useImageToVideoGenerationInternal = createGenerationHook<
  ImageToVideoFormState,
  void
>({
  execute: async (_request) => {
    // This will be called via callbacks
    // The actual execution happens in the callbacks layer
  },
  validate: (request) => {
    if (request.selectedImages.length === 0) {
      return "No images selected";
    }
    return null;
  },
  transformError: (error) => {
    return error instanceof Error ? error.message : String(error);
  },
});

/**
 * Image-to-Video generation hook
 * Manages generation state with validation and error handling
 */
export function useGeneration(options: UseGenerationOptions): UseGenerationReturn {
  const { formState, callbacks } = options;

  const {
    generationState,
    handleGenerate: baseHandleGenerate,
    setProgress,
    setError,
  } = useImageToVideoGenerationInternal({
    onError: callbacks.onError,
  });

  const handleGenerate = async () => {
    await baseHandleGenerate(formState);
    // Execute the actual generation via callbacks
    try {
      await callbacks.onGenerate(formState);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setError(errorMessage);
      callbacks.onError?.(errorMessage);
    }
  };

  const isReady = useMemo(
    () => formState.selectedImages.length > 0 && !generationState.isGenerating,
    [formState.selectedImages.length, generationState.isGenerating]
  );

  return {
    generationState,
    handleGenerate,
    setProgress,
    setError,
    isReady,
  };
}

/**
 * Generation Hook for Image-to-Video
 * Manages generation state and execution
 */

import { useState, useCallback, useMemo } from "react";
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

const INITIAL_GENERATION_STATE: ImageToVideoGenerationState = {
  isGenerating: false,
  progress: 0,
  error: null,
};

export function useGeneration(options: UseGenerationOptions): UseGenerationReturn {
  const { formState, callbacks } = options;

  const [generationState, setGenerationState] = useState<ImageToVideoGenerationState>(
    INITIAL_GENERATION_STATE
  );

  const setProgress = useCallback((progress: number) => {
    setGenerationState((prev) => ({ ...prev, progress }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setGenerationState((prev) => ({ ...prev, error, isGenerating: false }));
  }, []);

  const handleGenerate = useCallback(async () => {
    if (formState.selectedImages.length === 0) {
      callbacks.onError?.("No images selected");
      return;
    }

    setGenerationState({
      isGenerating: true,
      progress: 0,
      error: null,
    });

    try {
      await callbacks.onGenerate(formState);
      setGenerationState((prev) => ({ ...prev, isGenerating: false, progress: 100 }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setGenerationState({
        isGenerating: false,
        progress: 0,
        error: errorMessage,
      });
      callbacks.onError?.(errorMessage);
    }
  }, [formState, callbacks]);

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

/**
 * Generation Hook for Image-to-Video
 * Manages generation state and execution with abort support
 */

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
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

  const abortControllerRef = useRef<AbortController | null>(null);
  const isMountedRef = useRef(true);

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      abortControllerRef.current?.abort();
    };
  }, []);

  // Stabilize callbacks to prevent unnecessary re-renders
  const onErrorRef = useRef(callbacks.onError);
  const onGenerateRef = useRef(callbacks.onGenerate);

  useEffect(() => {
    onErrorRef.current = callbacks.onError;
    onGenerateRef.current = callbacks.onGenerate;
  }, [callbacks.onError, callbacks.onGenerate]);

  const setProgress = useCallback((progress: number) => {
    if (!isMountedRef.current) return;
    setGenerationState((prev) => ({ ...prev, progress }));
  }, []);

  const setError = useCallback((error: string | null) => {
    if (!isMountedRef.current) return;
    setGenerationState((prev) => ({ ...prev, error, isGenerating: false }));
  }, []);

  const handleGenerate = useCallback(async () => {
    if (formState.selectedImages.length === 0) {
      onErrorRef.current?.("No images selected");
      return;
    }

    // Create new AbortController for this generation
    abortControllerRef.current = new AbortController();

    setGenerationState({
      isGenerating: true,
      progress: 0,
      error: null,
    });

    try {
      await onGenerateRef.current(formState);

      if (!isMountedRef.current || abortControllerRef.current.signal.aborted) return;

      setGenerationState((prev) => ({ ...prev, isGenerating: false, progress: 100 }));
    } catch (error) {
      if (!isMountedRef.current || abortControllerRef.current.signal.aborted) return;

      const errorMessage = error instanceof Error ? error.message : String(error);
      setGenerationState({
        isGenerating: false,
        progress: 0,
        error: errorMessage,
      });
      onErrorRef.current?.(errorMessage);
    } finally {
      abortControllerRef.current = null;
    }
  }, [formState]);

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

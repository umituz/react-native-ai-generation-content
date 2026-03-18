/**
 * Generic Generation Hook Factory - Utility Functions
 */

import type { GenerationState } from "./generation-hook-types";

/**
 * Initial generation state
 */
export const INITIAL_STATE: GenerationState = {
  isGenerating: false,
  progress: 0,
  error: null,
};

/**
 * Create abort handler
 */
export function createAbortHandler(
  abortControllerRef: React.MutableRefObject<AbortController | null>,
  setGenerationState: React.Dispatch<React.SetStateAction<GenerationState>>
): () => void {
  return () => {
    abortControllerRef.current?.abort();
    setGenerationState((prev) => ({
      ...prev,
      isGenerating: false,
      error: "Generation aborted",
    }));
  };
}

/**
 * Create progress setter
 */
export function createProgressSetter(
  onProgressRef: React.MutableRefObject<((progress: number) => void) | undefined>,
  setGenerationState: React.Dispatch<React.SetStateAction<GenerationState>>,
  isMountedRef: React.MutableRefObject<boolean>
): (progress: number) => void {
  return (progress: number) => {
    if (!isMountedRef.current) return;
    setGenerationState((prev) => ({ ...prev, progress }));
    onProgressRef.current?.(progress);
  };
}

/**
 * Create error setter
 */
export function createErrorSetter(
  onErrorRef: React.MutableRefObject<((error: string) => void) | undefined>,
  setGenerationState: React.Dispatch<React.SetStateAction<GenerationState>>,
  isMountedRef: React.MutableRefObject<boolean>
): (error: string | null) => void {
  return (error: string | null) => {
    if (!isMountedRef.current) return;
    setGenerationState((prev) => ({ ...prev, error, isGenerating: false }));
    if (error) {
      onErrorRef.current?.(error);
    }
  };
}

/**
 * Create cleanup effect
 */
export function createCleanupEffect(
  isMountedRef: React.MutableRefObject<boolean>,
  abortControllerRef: React.MutableRefObject<AbortController | null>
): () => void {
  return () => {
    isMountedRef.current = false;
    abortControllerRef.current?.abort();
  };
}

/**
 * Create callback updater effect
 */
export function createCallbackUpdater<T>(
  onSuccessRef: React.MutableRefObject<((result: T) => void) | undefined>,
  onErrorRef: React.MutableRefObject<((error: string) => void) | undefined>,
  onProgressRef: React.MutableRefObject<((progress: number) => void) | undefined>,
  callbacks: {
    onSuccess?: (result: T) => void;
    onError?: (error: string) => void;
    onProgress?: (progress: number) => void;
  }
): void {
  onSuccessRef.current = callbacks.onSuccess;
  onErrorRef.current = callbacks.onError;
  onProgressRef.current = callbacks.onProgress;
}

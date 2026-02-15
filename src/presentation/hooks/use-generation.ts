/**
 * useGeneration Hook
 * React hook for AI generation with progress tracking
 */

import { useState, useCallback, useRef, useEffect } from "react";
import type {
  GenerationRequest,
  GenerationResult,
  GenerationProgress,
  GenerationCapability,
} from "../../domain/entities";
import { generationOrchestrator } from "../../infrastructure/services";

export interface UseGenerationOptions {
  model: string;
  capability?: GenerationCapability;
  onSuccess?: <T>(result: GenerationResult<T>) => void;
  onError?: (error: string) => void;
  onProgress?: (progress: GenerationProgress) => void;
}

export interface UseGenerationReturn<T = unknown> {
  generate: (input: Record<string, unknown>, userId?: string) => Promise<void>;
  result: GenerationResult<T> | null;
  progress: GenerationProgress | null;
  isGenerating: boolean;
  error: string | null;
  reset: () => void;
}

export function useGeneration<T = unknown>(
  options: UseGenerationOptions,
): UseGenerationReturn<T> {
  const [result, setResult] = useState<GenerationResult<T> | null>(null);
  const [progress, setProgress] = useState<GenerationProgress | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const abortRef = useRef(false);

  // Abort on unmount to prevent state updates after unmount
  useEffect(() => {
    return () => {
      abortRef.current = true;
      abortControllerRef.current?.abort();
    };
  }, []);

  // Stabilize callbacks to prevent unnecessary re-renders
  const onSuccessRef = useRef(options.onSuccess);
  const onErrorRef = useRef(options.onError);
  const onProgressRef = useRef(options.onProgress);

  useEffect(() => {
    onSuccessRef.current = options.onSuccess;
    onErrorRef.current = options.onError;
    onProgressRef.current = options.onProgress;
  }, [options.onSuccess, options.onError, options.onProgress]);

  const handleProgress = useCallback((prog: GenerationProgress) => {
    if (abortRef.current) return;
    setProgress(prog);
    onProgressRef.current?.(prog);
  }, []);

  const generate = useCallback(
    async (input: Record<string, unknown>, userId?: string) => {
      // Create new AbortController for this generation
      abortControllerRef.current = new AbortController();
      abortRef.current = false;

      setIsGenerating(true);
      setError(null);
      setResult(null);
      setProgress({ stage: "preparing", progress: 0 });

      try {
        const request: GenerationRequest = {
          model: options.model,
          input,
          userId,
          capability: options.capability,
          onProgress: handleProgress,
          signal: abortControllerRef.current.signal,
        };

        const genResult = await generationOrchestrator.generate<T>(request);

        if (abortRef.current || abortControllerRef.current?.signal.aborted) return;

        setResult(genResult);

        if (genResult.success) {
          onSuccessRef.current?.(genResult);
        } else if (genResult.error) {
          setError(genResult.error);
          onErrorRef.current?.(genResult.error);
        }
      } catch (err) {
        if (abortRef.current || abortControllerRef.current?.signal.aborted) return;

        const errorMessage =
          err instanceof Error ? err.message : "error.unknown";
        setError(errorMessage);
        onErrorRef.current?.(errorMessage);
      } finally {
        if (!abortRef.current && !abortControllerRef.current?.signal.aborted) {
          setIsGenerating(false);
        }
        abortControllerRef.current = null;
      }
    },
    [options.model, options.capability, handleProgress],
  );

  const reset = useCallback(() => {
    abortRef.current = true;
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setResult(null);
    setProgress(null);
    setIsGenerating(false);
    setError(null);
  }, []);

  return {
    generate,
    result,
    progress,
    isGenerating,
    error,
    reset,
  };
}

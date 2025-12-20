/**
 * useGeneration Hook
 * React hook for AI generation with progress tracking
 */

import { useState, useCallback, useRef } from "react";
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

  const abortRef = useRef(false);

  const handleProgress = useCallback(
    (prog: GenerationProgress) => {
      if (abortRef.current) return;
      setProgress(prog);
      options.onProgress?.(prog);
    },
    [options],
  );

  const generate = useCallback(
    async (input: Record<string, unknown>, userId?: string) => {
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
        };

        const genResult = await generationOrchestrator.generate<T>(request);

        if (abortRef.current) return;

        setResult(genResult);

        if (genResult.success) {
          options.onSuccess?.(genResult);
        } else if (genResult.error) {
          setError(genResult.error);
          options.onError?.(genResult.error);
        }
      } catch (err) {
        if (abortRef.current) return;

        const errorMessage =
          err instanceof Error ? err.message : "error.unknown";
        setError(errorMessage);
        options.onError?.(errorMessage);
      } finally {
        if (!abortRef.current) {
          setIsGenerating(false);
        }
      }
    },
    [options, handleProgress],
  );

  const reset = useCallback(() => {
    abortRef.current = true;
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

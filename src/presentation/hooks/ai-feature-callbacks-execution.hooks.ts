/**
 * AI Feature Callbacks - Execution Hooks
 * Generation execution callback hooks
 */

import { useCallback } from "react";
import type { AIFeatureGenerationResult } from "./ai-feature-callbacks.types";

interface UseExecutionCallbackParams<TRequest, TResult> {
  executor: (request: TRequest) => Promise<{
    success: boolean;
    data?: TResult;
    error?: string;
    imageUrl?: string;
    imageUrls?: string[];
  }>;
  creditCostPerUnit: number;
  onSuccess?: (result: TResult) => void;
  onError?: (error: string) => void;
}

interface ExecutionCallbacks<TRequest> {
  executeGeneration: (request: TRequest) => Promise<AIFeatureGenerationResult>;
}

/**
 * Hook for generation execution callback
 */
export function useExecutionCallback<TRequest = unknown, TResult = unknown>(
  params: UseExecutionCallbackParams<TRequest, TResult>,
): ExecutionCallbacks<TRequest> {
  const { executor, creditCostPerUnit, onSuccess, onError } = params;

  const executeGeneration = useCallback(
    async (request: TRequest): Promise<AIFeatureGenerationResult> => {
      try {
        const result = await executor(request);

        if (result.success && result.data) {
          onSuccess?.(result.data);
        } else if (!result.success && result.error) {
          onError?.(result.error);
        }

        if (result.success) {
          return { success: true, imageUrls: result.imageUrls ?? [] };
        }
        return { success: false, error: result.error ?? "Unknown error" };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        onError?.(message);
        return { success: false, error: message };
      }
    },
    [executor, creditCostPerUnit, onSuccess, onError],
  );

  return {
    executeGeneration,
  };
}

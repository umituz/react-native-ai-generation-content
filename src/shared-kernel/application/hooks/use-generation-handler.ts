/**
 * Shared hook for handling generation operations
 * Eliminates duplicate generation logic across domains
 */

import { useCallback } from 'react';
import type {
  BaseGenerationCallbacks,
  BaseGenerationResult,
  GenerationProgress,
} from '../../base-types';

/**
 * Configuration for generation handler
 */
export interface GenerationHandlerConfig<TInput, TOutput> {
  /** Function to execute the generation */
  executeGeneration: (input: TInput) => Promise<BaseGenerationResult<TOutput>>;
  /** Optional validation function */
  validateInput?: (input: TInput) => boolean | Promise<boolean>;
  /** Callbacks for generation lifecycle */
  callbacks?: BaseGenerationCallbacks<TOutput>;
}

/**
 * Hook for handling generation operations with consistent patterns
 * Reduces generation logic duplication across domains
 */
export function useGenerationHandler<TInput, TOutput = string>(
  config: GenerationHandlerConfig<TInput, TOutput>
) {
  const { executeGeneration, validateInput, callbacks } = config;

  const handleGeneration = useCallback(
    async (input: TInput): Promise<BaseGenerationResult<TOutput>> => {
      try {
        // Call onCreditCheck if provided
        if (callbacks?.onCreditCheck) {
          const hasCredits = await callbacks.onCreditCheck();
          if (!hasCredits) {
            callbacks.onShowPaywall?.();
            return {
              success: false,
              error: 'Insufficient credits',
              requestId: '',
            };
          }
        }

        // Validate input if validator provided
        if (validateInput) {
          const isValid = await validateInput(input);
          if (!isValid) {
            const error = new Error('Invalid input');
            callbacks?.onError?.(error);
            return {
              success: false,
              error: error.message,
              requestId: '',
            };
          }
        }

        // Call onStart callback
        callbacks?.onStart?.();

        // Execute generation
        const result = await executeGeneration(input);

        // Handle result
        if (result.success) {
          callbacks?.onSuccess?.(result);
          callbacks?.onCreditsConsumed?.(1); // Default credit cost
        } else {
          const error = new Error(result.error || 'Generation failed');
          callbacks?.onError?.(error);
        }

        // Call onComplete
        callbacks?.onComplete?.();

        return result;
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        callbacks?.onError?.(err);
        callbacks?.onComplete?.();

        return {
          success: false,
          error: err.message,
          requestId: '',
        };
      }
    },
    [executeGeneration, validateInput, callbacks]
  );

  const handleProgress = useCallback(
    (progress: number, status?: string) => {
      const progressInfo: GenerationProgress = { progress, status };
      callbacks?.onProgress?.(progressInfo);
    },
    [callbacks]
  );

  return {
    handleGeneration,
    handleProgress,
  };
}

/**
 * Shared hook for managing feature state
 * Eliminates duplicate state management across domains
 */

import { useState, useCallback, useReducer } from 'react';
import type {
  BaseFeatureState,
  FeatureStateAction,
} from '../../base-types';

/**
 * Hook for managing feature state with consistent patterns
 * Reduces state management duplication across domains
 */
export function useFeatureState<TOutput = string>() {
  const [state, dispatch] = useReducer(
    (currentState: BaseFeatureState<TOutput>, action: FeatureStateAction<TOutput>) => {
      switch (action.type) {
        case 'START':
          return {
            ...currentState,
            isProcessing: true,
            progress: 0,
            error: null,
            startedAt: Date.now(),
            jobId: action.jobId,
          } as BaseFeatureState<TOutput> & { startedAt: number; jobId?: string };

        case 'PROGRESS':
          return {
            ...currentState,
            progress: action.progress,
            progressInfo: {
              progress: action.progress,
              status: action.status,
            },
          };

        case 'SUCCESS':
          return {
            ...currentState,
            isProcessing: false,
            progress: 1,
            output: action.output,
            completedAt: Date.now(),
          } as BaseFeatureState<TOutput> & { completedAt: number };

        case 'ERROR':
          return {
            ...currentState,
            isProcessing: false,
            error: action.error,
          };

        case 'RESET':
          return {
            isProcessing: false,
            progress: 0,
            error: null,
            output: null,
          };

        default:
          return currentState;
      }
    },
    useState<BaseFeatureState<TOutput>>(() => ({
      isProcessing: false,
      progress: 0,
      error: null,
      output: null,
    }))[0]
  );

  const startProcessing = useCallback((jobId?: string) => {
    dispatch({ type: 'START', jobId });
  }, []);

  const updateProgress = useCallback((progress: number, status?: string) => {
    dispatch({ type: 'PROGRESS', progress, status });
  }, []);

  const setSuccess = useCallback((output: TOutput, metadata?: Record<string, unknown>) => {
    dispatch({ type: 'SUCCESS', output, metadata });
  }, []);

  const setError = useCallback((error: string) => {
    dispatch({ type: 'ERROR', error });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  return {
    state,
    actions: {
      startProcessing,
      updateProgress,
      setSuccess,
      setError,
      reset,
    },
  };
}

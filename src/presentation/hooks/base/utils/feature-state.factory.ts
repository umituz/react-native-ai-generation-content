/**
 * Feature State Factory
 * Factory functions for creating feature state handlers
 * Reduces code duplication across feature hooks
 */

import { useCallback } from "react";

export interface FeatureStateActions {
  reset: () => void;
  clearError: () => void;
}

export interface CreateStateHandlersParams<TState> {
  setState: React.Dispatch<React.SetStateAction<TState>>;
  initialState: TState;
}

/**
 * Creates reset and clearError handlers for feature state
 */
export function createFeatureStateHandlers<TState extends { error: string | null }>({
  setState,
  initialState,
}: CreateStateHandlersParams<TState>): FeatureStateActions {
  const reset = useCallback(() => {
    setState(initialState);
  }, [setState, initialState]);

  const clearError = useCallback(() => {
    setState((prev) => ({
      ...prev,
      error: null,
    }));
  }, [setState]);

  return { reset, clearError };
}

/**
 * Creates error handler with logging
 */
export interface ErrorHandlerParams {
  setError: (error: string | null) => void;
  onError?: (error: string) => void;
  errorKey: string;
}

export function createErrorHandler({
  setError,
  onError,
  errorKey,
}: ErrorHandlerParams) {
  return useCallback((error: unknown) => {
    const message = error instanceof Error ? error.message : errorKey;
    setError(message);
    onError?.(message);
  }, [setError, onError, errorKey]);
}

/**
 * Creates process handler with common logic
 */
export interface ProcessHandlerParams<TData, TResult> {
  canProcess: () => boolean;
  setError: (error: string | null) => void;
  setProcessing: (processing: boolean) => void;
  onError?: (error: string) => void;
  processFn: () => Promise<TResult>;
  onSuccess?: (result: TResult) => void;
  onProgress?: (progress: number) => void;
}

export async function executeProcess<TData, TResult>({
  canProcess,
  setError,
  setProcessing,
  onError,
  processFn,
  onSuccess,
  onProgress,
}: ProcessHandlerParams<TData, TResult>): Promise<TResult | null> {
  if (!canProcess()) {
    return null;
  }

  setProcessing(true);
  setError(null);
  onProgress?.(0);

  try {
    const result = await processFn();
    onProgress?.(100);
    onSuccess?.(result);
    return result;
  } catch (err) {
    const message = err instanceof Error ? err.message : "error.processing";
    setError(message);
    onError?.(message);
    return null;
  } finally {
    setProcessing(false);
  }
}

/**
 * Creates save handler
 */
export interface SaveHandlerParams {
  processedUrl: string | null;
  onSave?: (url: string) => Promise<void>;
  setError: (error: string | null) => void;
  onError?: (error: string) => void;
}

export async function executeSave({
  processedUrl,
  onSave,
  setError,
  onError,
}: SaveHandlerParams): Promise<void> {
  if (!processedUrl || !onSave) {
    return;
  }

  try {
    await onSave(processedUrl);
  } catch (err) {
    const message = err instanceof Error ? err.message : "error.save";
    setError(message);
    onError?.(message);
  }
}

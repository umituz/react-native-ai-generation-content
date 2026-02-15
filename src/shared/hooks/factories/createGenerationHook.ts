/**
 * Generic Generation Hook Factory
 * Creates type-safe generation hooks with error handling, progress tracking, and abort support
 */

import { useState, useCallback, useRef, useEffect } from "react";

/**
 * Generation state
 */
export interface GenerationState {
  isGenerating: boolean;
  progress: number;
  error: string | null;
}

/**
 * Generation callbacks
 */
export interface GenerationCallbacks<TResult> {
  /** Called when generation succeeds */
  onSuccess?: (result: TResult) => void;
  /** Called when generation fails */
  onError?: (error: string) => void;
  /** Called on progress update */
  onProgress?: (progress: number) => void;
}

/**
 * Generation hook configuration
 */
export interface GenerationHookConfig<TRequest, TResult> {
  /** Execute the generation request */
  execute: (request: TRequest, signal?: AbortSignal) => Promise<TResult>;
  /** Optional validation before execution */
  validate?: (request: TRequest) => string | null;
  /** Optional transform for errors */
  transformError?: (error: unknown) => string;
}

/**
 * Generation hook return type
 */
export interface GenerationHookReturn<TRequest, TResult> {
  generationState: GenerationState;
  handleGenerate: (request: TRequest) => Promise<TResult | null>;
  setProgress: (progress: number) => void;
  setError: (error: string | null) => void;
  abort: () => void;
}

const INITIAL_STATE: GenerationState = {
  isGenerating: false,
  progress: 0,
  error: null,
};

/**
 * Creates a type-safe generation hook
 * @param config - Generation hook configuration
 * @param callbacks - Generation callbacks
 * @returns Generation hook
 *
 * @example
 * ```ts
 * const useMyGeneration = createGenerationHook({
 *   execute: async (request) => {
 *     return await api.generate(request);
 *   },
 *   validate: (request) => {
 *     if (!request.prompt) return "Prompt is required";
 *     return null;
 *   },
 * });
 *
 * // Usage
 * const { generationState, handleGenerate } = useMyGeneration({
 *   onSuccess: (result) => console.log("Success!", result),
 *   onError: (error) => console.error("Error:", error),
 * });
 * ```
 */
export function createGenerationHook<TRequest, TResult>(
  config: GenerationHookConfig<TRequest, TResult>
) {
  return function useGeneration(
    callbacks: GenerationCallbacks<TResult> = {}
  ): GenerationHookReturn<TRequest, TResult> {
    const [generationState, setGenerationState] = useState<GenerationState>(INITIAL_STATE);

    const abortControllerRef = useRef<AbortController | null>(null);
    const isMountedRef = useRef(true);

    // Stabilize callbacks
    const onSuccessRef = useRef(callbacks.onSuccess);
    const onErrorRef = useRef(callbacks.onError);
    const onProgressRef = useRef(callbacks.onProgress);

    useEffect(() => {
      onSuccessRef.current = callbacks.onSuccess;
      onErrorRef.current = callbacks.onError;
      onProgressRef.current = callbacks.onProgress;
    }, [callbacks.onSuccess, callbacks.onError, callbacks.onProgress]);

    // Cleanup on unmount
    useEffect(() => {
      isMountedRef.current = true;
      return () => {
        isMountedRef.current = false;
        abortControllerRef.current?.abort();
      };
    }, []);

    const setProgress = useCallback((progress: number) => {
      if (!isMountedRef.current) return;
      setGenerationState((prev) => ({ ...prev, progress }));
      onProgressRef.current?.(progress);
    }, []);

    const setError = useCallback((error: string | null) => {
      if (!isMountedRef.current) return;
      setGenerationState((prev) => ({ ...prev, error, isGenerating: false }));
      if (error) {
        onErrorRef.current?.(error);
      }
    }, []);

    const abort = useCallback(() => {
      abortControllerRef.current?.abort();
      if (isMountedRef.current) {
        setGenerationState((prev) => ({
          ...prev,
          isGenerating: false,
          error: "Generation aborted",
        }));
      }
    }, []);

    const handleGenerate = useCallback(
      async (request: TRequest): Promise<TResult | null> => {
        // Validate request
        if (config.validate) {
          const validationError = config.validate(request);
          if (validationError) {
            setError(validationError);
            return null;
          }
        }

        // Create new AbortController
        abortControllerRef.current = new AbortController();

        setGenerationState({
          isGenerating: true,
          progress: 0,
          error: null,
        });

        try {
          const result = await config.execute(
            request,
            abortControllerRef.current.signal
          );

          if (!isMountedRef.current || abortControllerRef.current.signal.aborted) {
            return null;
          }

          setGenerationState((prev) => ({
            ...prev,
            isGenerating: false,
            progress: 100
          }));

          onSuccessRef.current?.(result);
          return result;
        } catch (error) {
          if (!isMountedRef.current || abortControllerRef.current.signal.aborted) {
            return null;
          }

          const errorMessage = config.transformError
            ? config.transformError(error)
            : error instanceof Error
            ? error.message
            : String(error);

          setError(errorMessage);
          return null;
        } finally {
          abortControllerRef.current = null;
        }
      },
      [config, setError]
    );

    return {
      generationState,
      handleGenerate,
      setProgress,
      setError,
      abort,
    };
  };
}

/**
 * Creates a generation hook with progress updates
 * Useful when the generation API supports progress callbacks
 */
export function createGenerationHookWithProgress<TRequest, TResult>(
  config: GenerationHookConfig<TRequest, TResult> & {
    /** Get progress stream or polling function */
    subscribeToProgress?: (
      request: TRequest,
      onProgress: (progress: number) => void
    ) => () => void;
  }
) {
  const baseHook = createGenerationHook(config);

  return function useGenerationWithProgress(
    callbacks: GenerationCallbacks<TResult> = {}
  ): GenerationHookReturn<TRequest, TResult> {
    const hookResult = baseHook(callbacks);
    const unsubscribeRef = useRef<(() => void) | null>(null);

    const handleGenerateWithProgress = useCallback(
      async (request: TRequest): Promise<TResult | null> => {
        // Subscribe to progress if available
        if (config.subscribeToProgress) {
          unsubscribeRef.current = config.subscribeToProgress(
            request,
            hookResult.setProgress
          );
        }

        try {
          return await hookResult.handleGenerate(request);
        } finally {
          unsubscribeRef.current?.();
          unsubscribeRef.current = null;
        }
      },
      [hookResult, config.subscribeToProgress]
    );

    return {
      ...hookResult,
      handleGenerate: handleGenerateWithProgress,
    };
  };
}

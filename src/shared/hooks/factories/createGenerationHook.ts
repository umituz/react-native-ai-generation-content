/**
 * Generic Generation Hook Factory - Main Implementation
 * Creates type-safe generation hooks with error handling, progress tracking, and abort support
 */

import { useState, useRef, useCallback, useEffect } from "react";
import type {
  GenerationState,
  GenerationCallbacks,
  GenerationHookConfig,
  GenerationHookReturn,
} from "./generation-hook-types";
import {
  INITIAL_STATE,
  createAbortHandler,
  createProgressSetter,
  createErrorSetter,
  createCleanupEffect,
  createCallbackUpdater,
} from "./generation-hook-utils";

/**
 * Creates a generation hook with standard configuration
 */
export function createGenerationHook<TRequest, TResult>(
  defaultConfig: GenerationHookConfig<TRequest, TResult>) {
  return function useGenerationHook(
    request: TRequest | null,
    callbacks?: GenerationCallbacks<TResult>,
    configOverrides?: Partial<GenerationHookConfig<TRequest, TResult>>
  ): GenerationHookReturn<TRequest, TResult> {
    const config = { ...defaultConfig, ...configOverrides };
    const [generationState, setGenerationState] = useState<GenerationState>(INITIAL_STATE);

    const abortControllerRef = useRef<AbortController | null>(null);
    const isMountedRef = useRef(true);

    const onSuccessRef = useRef(callbacks?.onSuccess);
    const onErrorRef = useRef(callbacks?.onError);
    const onProgressRef = useRef(callbacks?.onProgress);

    // Update callbacks when they change
    useEffect(() => {
      createCallbackUpdater(onSuccessRef, onErrorRef, onProgressRef, callbacks || {});
    }, [callbacks]);

    // Cleanup on unmount
    useEffect(() => {
      return createCleanupEffect(isMountedRef, abortControllerRef);
    }, []);

    const setProgress = createProgressSetter(
      onProgressRef,
      setGenerationState,
      isMountedRef
    );

    const setError = createErrorSetter(
      onErrorRef,
      setGenerationState,
      isMountedRef
    );

    const abort = createAbortHandler(abortControllerRef, setGenerationState);

    const handleGenerate = useCallback(
      async (req: TRequest): Promise<TResult | null> => {
        // Validate if validator provided
        if (config.validate) {
          const validationError = config.validate(req);
          if (validationError) {
            setError(validationError);
            return null;
          }
        }

        setGenerationState((prev) => ({
          ...prev,
          isGenerating: true,
          error: null,
          progress: 0,
        }));

        try {
          const abortController = new AbortController();
          abortControllerRef.current = abortController;

          const result = await config.execute(req, abortController.signal);

          if (isMountedRef.current) {
            setGenerationState((prev) => ({
              ...prev,
              isGenerating: false,
              progress: 100,
            }));
            onSuccessRef.current?.(result);
          }

          return result;
        } catch (err) {
          if (!abortControllerRef.current?.signal.aborted && isMountedRef.current) {
            const errorMessage = config.transformError
              ? config.transformError(err)
              : err instanceof Error
              ? err.message
              : "Generation failed";
            setError(errorMessage);
          }
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
 * Creates a generation hook with built-in progress tracking
 */
export function createGenerationHookWithProgress<TRequest, TResult>(
  defaultConfig: GenerationHookConfig<TRequest, TResult>
) {
  return function useGenerationWithProgress(
    request: TRequest | null,
    callbacks?: GenerationCallbacks<TResult>,
    configOverrides?: Partial<GenerationHookConfig<TRequest, TResult>>
  ): GenerationHookReturn<TRequest, TResult> {
    // Reuse the standard hook
    const useStandardHook = createGenerationHook(defaultConfig);
    return useStandardHook(request, callbacks, configOverrides);
  };
}

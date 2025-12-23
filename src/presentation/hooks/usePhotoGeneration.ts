/**
 * usePhotoGeneration Hook
 * Generic hook for photo-based AI generation workflows
 */

import { useState, useCallback, useRef } from "react";
import { useOfflineStore } from "@umituz/react-native-offline";
import type {
  PhotoGenerationConfig,
  PhotoGenerationState,
  PhotoGenerationError,
  PhotoGenerationStatus,
} from "./photo-generation.types";

export interface UsePhotoGenerationReturn<TInput, TResult> extends PhotoGenerationState<TResult> {
  generate: (input: TInput) => Promise<void>;
  reset: () => void;
  status: PhotoGenerationStatus;
}

export const usePhotoGeneration = <TInput, TResult, TSaveInput = any>(
  config: PhotoGenerationConfig<TInput, TResult, TSaveInput>,
): UsePhotoGenerationReturn<TInput, TResult> => {
  const {
    generate: generateFn,
    save: saveFn,
    checkCredits,
    deductCredits,
    onSuccess,
    onError,
    onSaveComplete,
  } = config;

  const [state, setState] = useState<PhotoGenerationState<TResult>>({
    isGenerating: false,
    result: null,
    error: null,
    progress: 0,
  });

  const [status, setStatus] = useState<PhotoGenerationStatus>("idle");
  const isGeneratingRef = useRef(false);
  const offlineStore = useOfflineStore();

  const createError = useCallback(
    (
      type: PhotoGenerationError["type"],
      message: string,
      originalError?: Error,
    ): PhotoGenerationError => ({
      type,
      message,
      originalError,
    }),
    [],
  );

  const generate = useCallback(
    async (input: TInput) => {
      if (isGeneratingRef.current) {
        if (__DEV__) console.warn("[usePhotoGeneration] Generation already in progress");
        return;
      }

      isGeneratingRef.current = true;
      setState({ isGenerating: true, result: null, error: null, progress: 0 });
      setStatus("validating");

      try {
        // Check network connectivity
        if (!offlineStore.isOnline) {
          throw createError("network_error", "No internet connection");
        }

        // Check credits
        if (checkCredits) {
          const hasCredits = await checkCredits();
          if (!hasCredits) {
            throw createError("credit_failed", "Insufficient credits");
          }
        }

        setStatus("generating");
        setState((prev) => ({ ...prev, progress: 20 }));

        // Generate without timeout - let AI provider handle its own timeout
        const result = await generateFn(input);

        setState((prev) => ({ ...prev, progress: 60 }));

        // Save result
        if (saveFn) {
          setStatus("saving");
          try {
            const saveResult = await saveFn(result, input);
            onSaveComplete?.(saveResult);
          } catch (saveError) {
            throw createError(
              "save_failed",
              "Failed to save result",
              saveError as Error,
            );
          }
        }

        setState((prev) => ({ ...prev, progress: 80 }));

        // Deduct credits after successful generation
        if (deductCredits) {
          try {
            await deductCredits();
          } catch (deductError) {
            if (__DEV__)
              console.error("[usePhotoGeneration] Credit deduction failed", deductError);
          }
        }

        setState({
          isGenerating: false,
          result,
          error: null,
          progress: 100,
        });
        setStatus("success");
        onSuccess?.(result);
      } catch (error: any) {
        const generationError =
          error.type
            ? error
            : error.name === "ContentPolicyViolationError"
              ? createError("policy_violation", "Content policy violation", error)
              : createError("unknown", error.message || "Generation failed", error);

        setState({
          isGenerating: false,
          result: null,
          error: generationError,
          progress: 0,
        });
        setStatus("error");
        onError?.(generationError);
      } finally {
        isGeneratingRef.current = false;
      }
    },
    [
      generateFn,
      saveFn,
      checkCredits,
      deductCredits,
      onSuccess,
      onError,
      onSaveComplete,
      createError,
      offlineStore,
    ],
  );

  const reset = useCallback(() => {
    setState({ isGenerating: false, result: null, error: null, progress: 0 });
    setStatus("idle");
    isGeneratingRef.current = false;
  }, []);

  return {
    ...state,
    generate,
    reset,
    status,
  };
};

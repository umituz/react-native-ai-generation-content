/**
 * usePhotoGeneration Hook
 * Generic hook for photo-based AI generation workflows
 */

import { useState, useCallback, useRef } from "react";
import type {
  PhotoGenerationConfig,
  PhotoGenerationState,
  PhotoGenerationError,
  PhotoGenerationStatus,
} from "./photo-generation.types";

const DEFAULT_TIMEOUT = 60000;

export interface UsePhotoGenerationReturn<TResult> extends PhotoGenerationState<TResult> {
  generate: <TInput>(input: TInput) => Promise<void>;
  reset: () => void;
  status: PhotoGenerationStatus;
}

export const usePhotoGeneration = <TInput, TResult, TSaveInput = any>(
  config: PhotoGenerationConfig<TInput, TResult, TSaveInput>,
): UsePhotoGenerationReturn<TResult> => {
  const {
    generate: generateFn,
    save: saveFn,
    checkCredits,
    deductCredits,
    timeout = DEFAULT_TIMEOUT,
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
        if (checkCredits) {
          const hasCredits = await checkCredits();
          if (!hasCredits) {
            throw createError("credit_failed", "Insufficient credits");
          }
        }

        setStatus("generating");
        setState((prev) => ({ ...prev, progress: 20 }));

        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Generation timeout")), timeout),
        );

        const result = await Promise.race([generateFn(input), timeoutPromise]);

        setState((prev) => ({ ...prev, progress: 60 }));

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
            : error.message === "Generation timeout"
              ? createError("timeout", "Generation timed out", error)
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
      timeout,
      onSuccess,
      onError,
      onSaveComplete,
      createError,
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

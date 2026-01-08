/**
 * usePhotoGeneration Hook
 * Generic hook for photo-based AI generation workflows
 */

import { useState, useCallback, useRef } from "react";
import { useOfflineStore, useAlert } from "@umituz/react-native-design-system";
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

export const usePhotoGeneration = <TInput, TResult, TSaveInput = unknown>(
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
    alertMessages,
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
  const { showError } = useAlert();

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
        // Pass progress callback to allow provider to report real progress
        const result = await generateFn(input, (newProgress) => {
          setState((prev) => ({ ...prev, progress: newProgress }));
        });

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
              saveError instanceof Error ? saveError : new Error(String(saveError)),
            );
          }
        }

        setState((prev) => ({ ...prev, progress: 80 }));

        // Deduct credits after successful generation
        if (deductCredits) {
          try {
            await deductCredits();
          } catch {
            // Silently fail credit deduction as generation succeeded
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
      } catch (err: unknown) {
        let generationError: PhotoGenerationError;

        if (err && typeof err === "object" && "type" in err && "message" in err) {
          generationError = err as PhotoGenerationError;
        } else if (err instanceof Error) {
          if (err.name === "ContentPolicyViolationError") {
            generationError = createError("policy_violation", "Content policy violation", err);
          } else {
            generationError = createError("unknown", err.message || "Generation failed", err);
          }
        } else {
          generationError = createError("unknown", "Generation failed");
        }

        setState({
          isGenerating: false,
          result: null,
          error: generationError,
          progress: 0,
        });
        setStatus("error");

        const errorMessage =
          generationError.type === "network_error" ? alertMessages.networkError :
            generationError.type === "policy_violation" ? alertMessages.policyViolation :
              generationError.type === "save_failed" ? alertMessages.saveFailed :
                generationError.type === "credit_failed" ? alertMessages.creditFailed :
                  alertMessages.unknown;

        void showError("Error", errorMessage);
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
      alertMessages,
      showError
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

/**
 * Generation Orchestrator
 * Handles AI generation execution with network check, moderation, credit deduction, and error handling
 */

import { useState, useCallback, useRef, useEffect } from "react";
import { useOfflineStore, useAlert } from "@umituz/react-native-design-system";
import { useDeductCredit } from "@umituz/react-native-subscription";
import { createGenerationError, getAlertMessage, parseError } from "./errors";
import { handleModeration } from "./moderation-handler";
import type {
  GenerationStrategy,
  GenerationConfig,
  GenerationState,
  GenerationError,
  UseGenerationOrchestratorReturn,
} from "./types";

declare const __DEV__: boolean;

const INITIAL_STATE = { status: "idle" as const, isGenerating: false, result: null, error: null };

export const useGenerationOrchestrator = <TInput, TResult>(
  strategy: GenerationStrategy<TInput, TResult>,
  config: GenerationConfig,
): UseGenerationOrchestratorReturn<TInput, TResult> => {
  const { userId, alertMessages, onCreditsExhausted, onSuccess, onError, moderation, lifecycle } = config;

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[Orchestrator] Hook initialized:", { userId });
  }

  const [state, setState] = useState<GenerationState<TResult>>(INITIAL_STATE);
  const isGeneratingRef = useRef(false);
  const isMountedRef = useRef(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  const offlineStore = useOfflineStore();
  const { showError, showSuccess } = useAlert();
  const { deductCredit, checkCredits } = useDeductCredit({ userId, onCreditsExhausted });

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      abortControllerRef.current?.abort();
    };
  }, []);

  const handleLifecycleComplete = useCallback(
    (status: "success" | "error", result?: TResult, error?: GenerationError) => {
      if (!lifecycle?.onComplete) return;
      const delay = lifecycle.completeDelay ?? 500;
      const timeoutId = setTimeout(() => {
        if (isMountedRef.current) lifecycle.onComplete?.(status, result, error);
      }, delay);
      // Store timeout ID for cleanup (if component unmounts during delay)
      return () => clearTimeout(timeoutId);
    },
    [lifecycle],
  );

  const executeGeneration = useCallback(
    async (input: TInput) => {
      const creditDeducted = await deductCredit(strategy.getCreditCost());
      if (!creditDeducted) throw createGenerationError("credits", alertMessages.creditFailed);

      setState((prev) => ({ ...prev, status: "generating" }));
      if (typeof __DEV__ !== "undefined" && __DEV__) console.log("[Orchestrator] Starting generation");

      const result = await strategy.execute(input);

      if (strategy.save && userId) {
        if (isMountedRef.current) setState((prev) => ({ ...prev, status: "saving" }));
        try {
          await strategy.save(result, userId);
        } catch (saveErr) {
          throw createGenerationError("save", alertMessages.saveFailed, saveErr instanceof Error ? saveErr : undefined);
        }
      }

      if (isMountedRef.current) setState({ status: "success", isGenerating: false, result, error: null });
      if (typeof __DEV__ !== "undefined" && __DEV__) console.log("[Orchestrator] Generation SUCCESS");

      if (alertMessages.success) showSuccess("Success", alertMessages.success);
      onSuccess?.(result);
      handleLifecycleComplete("success", result);
      return result;
    },
    [strategy, userId, alertMessages, deductCredit, showSuccess, onSuccess, handleLifecycleComplete],
  );

  const generate = useCallback(
    async (input: TInput) => {
      if (typeof __DEV__ !== "undefined" && __DEV__) console.log("[Orchestrator] generate() called");
      if (isGeneratingRef.current) return;

      // Create new AbortController for this generation
      abortControllerRef.current = new AbortController();
      isGeneratingRef.current = true;
      setState({ ...INITIAL_STATE, status: "checking", isGenerating: true });

      try {
        // Check online status inside the try block to avoid dependency on offlineStore.isOnline
        if (!offlineStore.isOnline) {
          throw createGenerationError("network", alertMessages.networkError);
        }

        // Check if aborted
        if (abortControllerRef.current.signal.aborted) {
          throw new Error("Generation aborted");
        }

        // Pre-validate credits before generation to catch concurrent consumption
        const creditCost = strategy.getCreditCost();
        const hasEnoughCredits = await checkCredits(creditCost);
        if (!hasEnoughCredits) {
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.log("[Orchestrator] Pre-validation: insufficient credits");
          }
          onCreditsExhausted?.();
          throw createGenerationError("credits", alertMessages.creditFailed);
        }

        // Check if aborted before moderation
        if (abortControllerRef.current.signal.aborted) {
          throw new Error("Generation aborted");
        }

        return await handleModeration({
          input,
          moderation,
          alertMessages,
          isMountedRef,
          isGeneratingRef,
          setState: (s) => setState(s as GenerationState<TResult>),
          resetState: () => setState(INITIAL_STATE),
          executeGeneration,
          showError,
          onError,
          handleLifecycleComplete,
        });
      } catch (err) {
        // Don't show error if aborted
        if (abortControllerRef.current?.signal.aborted) {
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.log("[Orchestrator] Generation aborted");
          }
          return;
        }

        const error = parseError(err);
        if (typeof __DEV__ !== "undefined" && __DEV__) console.log("[Orchestrator] Error:", error);
        if (isMountedRef.current) setState({ status: "error", isGenerating: false, result: null, error });
        showError("Error", getAlertMessage(error, alertMessages));
        onError?.(error);
        handleLifecycleComplete("error", undefined, error);
        throw error;
      } finally {
        isGeneratingRef.current = false;
        abortControllerRef.current = null;
      }
    },
    [offlineStore.isOnline, moderation, alertMessages, strategy, checkCredits, onCreditsExhausted, executeGeneration, showError, onError, handleLifecycleComplete],
  );

  const reset = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setState(INITIAL_STATE);
    isGeneratingRef.current = false;
  }, []);

  return { generate, reset, status: state.status, isGenerating: state.isGenerating, result: state.result, error: state.error };
};

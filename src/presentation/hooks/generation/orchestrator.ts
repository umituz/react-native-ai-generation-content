/**
 * Generation Orchestrator
 * Handles AI generation execution with:
 * - Network check
 * - Content moderation (optional)
 * - Progress tracking
 * - Credit deduction (after success)
 * - Error handling
 *
 * NOTE: Credit CHECK is handled by useFeatureGate before generation starts.
 * This orchestrator only DEDUCTS credits after successful generation.
 */

import { useState, useCallback, useRef, useEffect } from "react";
import { useOfflineStore, useAlert } from "@umituz/react-native-design-system";
import { useDeductCredit } from "@umituz/react-native-subscription";
import { createGenerationError, getAlertMessage, parseError } from "./errors";
import type {
  GenerationStrategy,
  GenerationConfig,
  GenerationState,
  GenerationError,
  UseGenerationOrchestratorReturn,
} from "./types";

declare const __DEV__: boolean;

const INITIAL_STATE = {
  status: "idle" as const,
  isGenerating: false,
  progress: 0,
  result: null,
  error: null,
};

export const useGenerationOrchestrator = <TInput, TResult>(
  strategy: GenerationStrategy<TInput, TResult>,
  config: GenerationConfig,
): UseGenerationOrchestratorReturn<TInput, TResult> => {
  const {
    userId,
    alertMessages,
    onCreditsExhausted,
    onSuccess,
    onError,
    moderation,
    lifecycle,
  } = config;

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[Orchestrator] Hook initialized:", { userId });
  }

  const [state, setState] = useState<GenerationState<TResult>>(INITIAL_STATE);
  const isGeneratingRef = useRef(false);
  const isMountedRef = useRef(true);

  const offlineStore = useOfflineStore();
  const { showError, showSuccess } = useAlert();
  const { deductCredit } = useDeductCredit({ userId, onCreditsExhausted });

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleLifecycleComplete = useCallback(
    (status: "success" | "error", result?: TResult, error?: GenerationError) => {
      if (!lifecycle?.onComplete) return;
      const delay = lifecycle.completeDelay ?? 500;
      setTimeout(() => {
        if (isMountedRef.current) {
          lifecycle.onComplete?.(status, result, error);
        }
      }, delay);
    },
    [lifecycle],
  );

  const executeGeneration = useCallback(
    async (input: TInput) => {
      setState((prev) => ({ ...prev, status: "generating", progress: 10 }));

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[Orchestrator] Starting generation");
      }

      const result = await strategy.execute(input, (progress) => {
        if (isMountedRef.current) setState((prev) => ({ ...prev, progress }));
      });

      if (isMountedRef.current) setState((prev) => ({ ...prev, progress: 70 }));

      if (strategy.save && userId) {
        if (isMountedRef.current) setState((prev) => ({ ...prev, status: "saving" }));
        try {
          await strategy.save(result, userId);
        } catch (saveErr) {
          throw createGenerationError(
            "save",
            alertMessages.saveFailed,
            saveErr instanceof Error ? saveErr : undefined,
          );
        }
      }

      if (isMountedRef.current) setState((prev) => ({ ...prev, progress: 90 }));

      const creditCost = strategy.getCreditCost();
      const creditDeducted = await deductCredit(creditCost);
      if (!creditDeducted) {
        throw createGenerationError("credits", alertMessages.creditFailed);
      }

      if (isMountedRef.current) {
        setState({ status: "success", isGenerating: false, progress: 100, result, error: null });
      }

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[Orchestrator] Generation SUCCESS");
      }

      if (alertMessages.success) {
        showSuccess("Success", alertMessages.success);
      }
      onSuccess?.(result);
      handleLifecycleComplete("success", result);

      return result;
    },
    [strategy, userId, alertMessages, deductCredit, showSuccess, onSuccess, handleLifecycleComplete],
  );

  const generate = useCallback(
    async (input: TInput) => {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[Orchestrator] generate() called");
      }

      if (isGeneratingRef.current) return;

      isGeneratingRef.current = true;
      setState({ ...INITIAL_STATE, status: "checking", isGenerating: true });

      try {
        if (!offlineStore.isOnline) {
          throw createGenerationError("network", alertMessages.networkError);
        }

        if (moderation) {
          setState((prev) => ({ ...prev, status: "moderating" }));
          const moderationResult = await moderation.checkContent(input);

          if (!moderationResult.allowed && moderationResult.warnings.length > 0) {
            if (moderation.onShowWarning) {
              moderation.onShowWarning(
                moderationResult.warnings,
                () => {
                  isGeneratingRef.current = false;
                  if (isMountedRef.current) setState(INITIAL_STATE);
                },
                async () => {
                  try {
                    await executeGeneration(input);
                  } catch (err) {
                    const error = parseError(err);
                    if (isMountedRef.current) {
                      setState({ status: "error", isGenerating: false, progress: 0, result: null, error });
                    }
                    showError("Error", getAlertMessage(error, alertMessages));
                    onError?.(error);
                    handleLifecycleComplete("error", undefined, error);
                  } finally {
                    isGeneratingRef.current = false;
                  }
                },
              );
              return;
            }
            throw createGenerationError("policy", alertMessages.policyViolation);
          }
        }

        return await executeGeneration(input);
      } catch (err) {
        const error = parseError(err);
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[Orchestrator] Error:", error);
        }
        if (isMountedRef.current) {
          setState({ status: "error", isGenerating: false, progress: 0, result: null, error });
        }
        showError("Error", getAlertMessage(error, alertMessages));
        onError?.(error);
        handleLifecycleComplete("error", undefined, error);
        throw error;
      } finally {
        isGeneratingRef.current = false;
      }
    },
    [
      moderation,
      alertMessages,
      offlineStore.isOnline,
      executeGeneration,
      showError,
      onError,
      handleLifecycleComplete,
    ],
  );

  const reset = useCallback(() => {
    setState(INITIAL_STATE);
    isGeneratingRef.current = false;
  }, []);

  return {
    generate,
    reset,
    status: state.status,
    isGenerating: state.isGenerating,
    progress: state.progress,
    result: state.result,
    error: state.error,
  };
};

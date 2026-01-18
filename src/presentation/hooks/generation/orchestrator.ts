/**
 * Generation Orchestrator
 * Feature-agnostic hook for AI generation with:
 * - Network check (via design system's useOfflineStore)
 * - Content moderation (optional)
 * - Credit management (via subscription package)
 * - Error handling & alerts
 * - Progress tracking
 * - Lifecycle management
 *
 * NOTE: Auth is handled by useFeatureGate before generation starts
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

const DEFAULT_COMPLETE_DELAY = 500;
const DEFAULT_RESET_DELAY = 1000;

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
    credits,
    lifecycle,
  } = config;

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[Orchestrator] 🎬 Hook initialized:", {
      userId,
      hasModeration: !!moderation,
      hasCreditsCallbacks: !!credits,
      hasLifecycle: !!lifecycle,
    });
  }

  const [state, setState] = useState<GenerationState<TResult>>(INITIAL_STATE);
  const isGeneratingRef = useRef(false);
  const pendingInputRef = useRef<TInput | null>(null);
  const completeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedRef = useRef(true);

  const offlineStore = useOfflineStore();
  const { showError, showSuccess } = useAlert();
  const creditHook = useDeductCredit({ userId, onCreditsExhausted });

  const defaultCredits = {
    checkCredits: creditHook.checkCredits,
    deductCredit: async (amount: number): Promise<boolean> => {
      return creditHook.deductCredit(amount);
    },
  };

  const checkCredits = credits?.checkCredits ?? defaultCredits.checkCredits;
  const deductCredit = credits?.deductCredits ?? defaultCredits.deductCredit;
  const handleCreditsExhausted = credits?.onCreditsExhausted ?? onCreditsExhausted;

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (completeTimeoutRef.current) clearTimeout(completeTimeoutRef.current);
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[Orchestrator] 🧹 Cleanup");
      }
    };
  }, []);

  const handleLifecycleComplete = useCallback(
    (status: "success" | "error", result?: TResult, error?: GenerationError) => {
      if (!lifecycle?.onComplete) return;

      const delay = lifecycle.completeDelay ?? DEFAULT_COMPLETE_DELAY;

      if (completeTimeoutRef.current) clearTimeout(completeTimeoutRef.current);

      completeTimeoutRef.current = setTimeout(() => {
        if (!isMountedRef.current) return;

        lifecycle.onComplete?.(status, result, error);

        if (lifecycle.autoReset) {
          const resetDelay = lifecycle.resetDelay ?? DEFAULT_RESET_DELAY;
          if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);

          resetTimeoutRef.current = setTimeout(() => {
            if (isMountedRef.current) {
              setState(INITIAL_STATE);
              isGeneratingRef.current = false;
            }
          }, resetDelay);
        }
      }, delay);
    },
    [lifecycle],
  );

  const executeGeneration = useCallback(
    async (input: TInput) => {
      const creditCost = strategy.getCreditCost();

      setState((prev) => ({ ...prev, status: "generating", progress: 10 }));
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[Orchestrator] 🎨 Starting generation");
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
            "Failed to save",
            saveErr instanceof Error ? saveErr : undefined,
          );
        }
      }

      if (isMountedRef.current) setState((prev) => ({ ...prev, progress: 90 }));

      const creditDeducted = await deductCredit(creditCost);
      if (!creditDeducted) {
        throw createGenerationError("credits", "Failed to deduct credits");
      }

      if (isMountedRef.current) {
        setState({ status: "success", isGenerating: false, progress: 100, result, error: null });
      }

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[Orchestrator] 🎉 Generation SUCCESS");
      }

      if (alertMessages.success) void showSuccess("Success", alertMessages.success);
      onSuccess?.(result);
      handleLifecycleComplete("success", result);

      return result;
    },
    [strategy, userId, alertMessages, deductCredit, showSuccess, onSuccess, handleLifecycleComplete],
  );

  const generate = useCallback(
    async (input: TInput) => {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[Orchestrator] 🚀 generate() called");
      }

      if (isGeneratingRef.current) return;

      isGeneratingRef.current = true;
      pendingInputRef.current = input;
      setState({ ...INITIAL_STATE, status: "checking", isGenerating: true });

      try {
        if (!offlineStore.isOnline) {
          throw createGenerationError("network", "No internet connection");
        }

        const creditCost = strategy.getCreditCost();
        const hasCredits = await checkCredits(creditCost);
        if (!hasCredits) {
          isGeneratingRef.current = false;
          setState(INITIAL_STATE);
          handleCreditsExhausted?.();
          return;
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
                    void showError("Error", getAlertMessage(error, alertMessages));
                    onError?.(error);
                    handleLifecycleComplete("error", undefined, error);
                  } finally {
                    isGeneratingRef.current = false;
                  }
                },
              );
              return;
            }
            throw createGenerationError("policy", "Content policy violation");
          }
        }

        return await executeGeneration(input);
      } catch (err) {
        const error = parseError(err);
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[Orchestrator] ❌ Error:", error);
        }
        if (isMountedRef.current) {
          setState({ status: "error", isGenerating: false, progress: 0, result: null, error });
        }
        void showError("Error", getAlertMessage(error, alertMessages));
        onError?.(error);
        handleLifecycleComplete("error", undefined, error);
        throw error;
      } finally {
        isGeneratingRef.current = false;
      }
    },
    [
      moderation,
      strategy,
      alertMessages,
      offlineStore.isOnline,
      checkCredits,
      handleCreditsExhausted,
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

/**
 * Generation Orchestrator
 * Feature-agnostic hook for AI generation with centralized:
 * - Auth checking (optional)
 * - Content moderation (optional)
 * - Credit management
 * - Error handling
 * - Alert display
 * - Progress tracking
 * - Lifecycle management (navigation, cleanup)
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
    auth,
    moderation,
    credits,
    lifecycle,
  } = config;

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[Orchestrator] 🎬 Hook initialized:", {
      userId,
      hasAuth: !!auth,
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
  const defaultCredits = useDeductCredit({ userId, onCreditsExhausted }) as any;

  // Use provided credit callbacks or default to useDeductCredit hook
  const checkCredits = credits?.checkCredits ?? defaultCredits.checkCredits;
  const deductCredit = credits?.deductCredits ?? defaultCredits.deductCredit;
  const handleCreditsExhausted = credits?.onCreditsExhausted ?? onCreditsExhausted;

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (completeTimeoutRef.current) {
        clearTimeout(completeTimeoutRef.current);
        completeTimeoutRef.current = null;
      }
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
        resetTimeoutRef.current = null;
      }
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[Orchestrator] 🧹 Cleanup: cleared all timeouts");
      }
    };
  }, []);

  // Handle lifecycle completion
  const handleLifecycleComplete = useCallback(
    (status: "success" | "error", result?: TResult, error?: GenerationError) => {
      if (!lifecycle?.onComplete) return;

      const delay = lifecycle.completeDelay ?? DEFAULT_COMPLETE_DELAY;

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[Orchestrator] ⏱️ Scheduling lifecycle.onComplete:", { status, delay });
      }

      // Clear any existing timeout
      if (completeTimeoutRef.current) {
        clearTimeout(completeTimeoutRef.current);
      }

      completeTimeoutRef.current = setTimeout(() => {
        if (!isMountedRef.current) {
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.log("[Orchestrator] ⚠️ Component unmounted, skipping onComplete");
          }
          return;
        }

        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[Orchestrator] 📍 Calling lifecycle.onComplete:", status);
        }

        lifecycle.onComplete?.(status, result, error);

        // Auto-reset if configured
        if (lifecycle.autoReset) {
          const resetDelay = lifecycle.resetDelay ?? DEFAULT_RESET_DELAY;
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.log("[Orchestrator] 🔄 Scheduling auto-reset in:", resetDelay);
          }

          if (resetTimeoutRef.current) {
            clearTimeout(resetTimeoutRef.current);
          }

          resetTimeoutRef.current = setTimeout(() => {
            if (isMountedRef.current) {
              if (typeof __DEV__ !== "undefined" && __DEV__) {
                console.log("[Orchestrator] 🔄 Auto-reset triggered");
              }
              setState(INITIAL_STATE);
              isGeneratingRef.current = false;
            }
          }, resetDelay);
        }
      }, delay);
    },
    [lifecycle],
  );

  // Core execution logic (after all checks pass)
  const executeGeneration = useCallback(
    async (input: TInput) => {
      const creditCost = strategy.getCreditCost();

      setState((prev) => ({ ...prev, status: "generating", progress: 10 }));
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[Orchestrator] 🎨 Starting strategy.execute()");
      }

      const result = await strategy.execute(input, (progress) => {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[Orchestrator] 📊 Progress update:", progress);
        }
        if (isMountedRef.current) {
          setState((prev) => ({ ...prev, progress }));
        }
      });

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[Orchestrator] ✅ strategy.execute() completed");
      }

      if (isMountedRef.current) {
        setState((prev) => ({ ...prev, progress: 70 }));
      }

      // Save result
      if (strategy.save && userId) {
        if (isMountedRef.current) {
          setState((prev) => ({ ...prev, status: "saving" }));
        }
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[Orchestrator] 💾 Saving result...");
        }
        try {
          await strategy.save(result, userId);
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.log("[Orchestrator] ✅ Save completed");
          }
        } catch (saveErr) {
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.log("[Orchestrator] ❌ Save failed:", saveErr);
          }
          throw createGenerationError("save", "Failed to save", saveErr instanceof Error ? saveErr : undefined);
        }
      }

      if (isMountedRef.current) {
        setState((prev) => ({ ...prev, progress: 90 }));
      }

      // Deduct credit
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[Orchestrator] 💳 Deducting credit:", creditCost);
      }
      await deductCredit(creditCost);

      // Success
      if (isMountedRef.current) {
        setState({ status: "success", isGenerating: false, progress: 100, result, error: null });
      }

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[Orchestrator] 🎉 Generation SUCCESS");
      }

      if (alertMessages.success) {
        void showSuccess("Success", alertMessages.success);
      }

      // Call onSuccess callback
      onSuccess?.(result);

      // Handle lifecycle completion
      handleLifecycleComplete("success", result);

      return result;
    },
    [strategy, userId, alertMessages, deductCredit, showSuccess, onSuccess, handleLifecycleComplete],
  );

  const generate = useCallback(
    async (input: TInput) => {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[Orchestrator] 🚀 generate() called");
        console.log("[Orchestrator] Input:", JSON.stringify(input, null, 2).slice(0, 500));
      }

      if (isGeneratingRef.current) {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[Orchestrator] ⚠️ Already generating, skipping");
        }
        return;
      }

      isGeneratingRef.current = true;
      pendingInputRef.current = input;
      setState({ ...INITIAL_STATE, status: "checking", isGenerating: true });

      try {
        // 1. Auth check (optional)
        if (auth) {
          setState((prev) => ({ ...prev, status: "authenticating" }));
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.log("[Orchestrator] 🔐 Checking authentication...");
          }

          if (!auth.isAuthenticated()) {
            if (typeof __DEV__ !== "undefined" && __DEV__) {
              console.log("[Orchestrator] ❌ Not authenticated");
            }
            isGeneratingRef.current = false;
            setState(INITIAL_STATE);
            auth.onAuthRequired?.();
            return;
          }
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.log("[Orchestrator] ✅ Authentication passed");
          }
        }

        // 2. Network check
        if (!offlineStore.isOnline) {
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.log("[Orchestrator] ❌ Network check failed - offline");
          }
          throw createGenerationError("network", "No internet connection");
        }
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[Orchestrator] ✅ Network check passed");
        }

        // 3. Credit check
        const creditCost = strategy.getCreditCost();
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[Orchestrator] 💳 Credit cost:", creditCost);
        }

        const hasCredits = await checkCredits(creditCost);
        if (!hasCredits) {
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.log("[Orchestrator] ❌ No credits, opening paywall");
          }
          isGeneratingRef.current = false;
          setState(INITIAL_STATE);
          handleCreditsExhausted?.();
          return;
        }
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[Orchestrator] ✅ Credit check passed");
        }

        // 4. Content moderation (optional)
        if (moderation) {
          setState((prev) => ({ ...prev, status: "moderating" }));
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.log("[Orchestrator] 🛡️ Checking content moderation...");
          }

          const moderationResult = await moderation.checkContent(input);
          if (!moderationResult.allowed && moderationResult.warnings.length > 0) {
            if (typeof __DEV__ !== "undefined" && __DEV__) {
              console.log("[Orchestrator] ⚠️ Moderation warnings:", moderationResult.warnings);
            }

            if (moderation.onShowWarning) {
              // Show warning and let user decide
              moderation.onShowWarning(
                moderationResult.warnings,
                () => {
                  // User cancelled
                  if (typeof __DEV__ !== "undefined" && __DEV__) {
                    console.log("[Orchestrator] User cancelled after moderation warning");
                  }
                  isGeneratingRef.current = false;
                  if (isMountedRef.current) {
                    setState(INITIAL_STATE);
                  }
                },
                async () => {
                  // User continued - execute generation
                  if (typeof __DEV__ !== "undefined" && __DEV__) {
                    console.log("[Orchestrator] User continued after moderation warning");
                  }
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
              return; // Exit here - callback will handle the rest
            }
            // No warning handler - block the request
            throw createGenerationError("policy", "Content policy violation");
          }
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.log("[Orchestrator] ✅ Moderation passed");
          }
        }

        // 5. Execute generation
        return await executeGeneration(input);
      } catch (err) {
        const error = parseError(err);
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[Orchestrator] ❌ Generation ERROR:", error);
        }
        if (isMountedRef.current) {
          setState({ status: "error", isGenerating: false, progress: 0, result: null, error });
        }
        void showError("Error", getAlertMessage(error, alertMessages));
        onError?.(error);

        // Handle lifecycle completion for errors
        handleLifecycleComplete("error", undefined, error);
        throw error; // Re-throw so caller knows it failed
      } finally {
        isGeneratingRef.current = false;
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[Orchestrator] 🏁 generate() finished");
        }
      }
    },
    [
      auth,
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
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[Orchestrator] 🔄 reset() called");
    }
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

/**
 * Generation Orchestrator
 * Handles AI generation execution with network check, moderation, credit deduction, and error handling
 */

import { useState, useCallback, useRef, useEffect } from "react";
import { useAlert } from "@umituz/react-native-design-system/molecules";
import { useOfflineStore } from "@umituz/react-native-design-system/offline";
import { createGenerationError, getAlertMessage, parseError } from "./errors";
import { handleModeration } from "./moderation-handler";
import type {
  GenerationStrategy,
  GenerationConfig,
  GenerationState,
  GenerationError,
  UseGenerationOrchestratorReturn,
} from "./types";


const INITIAL_STATE = { status: "idle" as const, isGenerating: false, result: null, error: null };

export const useGenerationOrchestrator = <TInput, TResult>(
  strategy: GenerationStrategy<TInput, TResult>,
  config: GenerationConfig,
): UseGenerationOrchestratorReturn<TInput, TResult> => {
  const { userId, alertMessages, onSuccess, onError, moderation, lifecycle } = config;

  const [state, setState] = useState<GenerationState<TResult>>(INITIAL_STATE);
  const isGeneratingRef = useRef(false);
  const isMountedRef = useRef(true);
  const abortControllerRef = useRef<AbortController | null>(null);
  const cleanupTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Stable refs for callbacks — prevents useCallback deps from thrashing when
  // callers pass inline functions (which create new references every render).
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);
  // Update refs in render body (not useEffect) so they're always in sync — no 1-frame delay
  onSuccessRef.current = onSuccess;
  onErrorRef.current = onError;

  const offlineStore = useOfflineStore();
  const { showError, showSuccess } = useAlert();

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      abortControllerRef.current?.abort();
      // Clear any pending lifecycle complete timeout
      if (cleanupTimeoutRef.current) {
        clearTimeout(cleanupTimeoutRef.current);
        cleanupTimeoutRef.current = null;
      }
    };
  }, []);

  const handleLifecycleComplete = useCallback(
    (status: "success" | "error", result?: TResult, error?: GenerationError) => {
      if (!lifecycle?.onComplete) return;

      // Clear any existing timeout first
      if (cleanupTimeoutRef.current) {
        clearTimeout(cleanupTimeoutRef.current);
        cleanupTimeoutRef.current = null;
      }

      const delay = lifecycle.completeDelay ?? 500;
      cleanupTimeoutRef.current = setTimeout(() => {
        if (isMountedRef.current) {
          lifecycle.onComplete?.(status, result, error);
        }
        cleanupTimeoutRef.current = null;
      }, delay);
    },
    [lifecycle],
  );

  const executeGeneration = useCallback(
    async (input: TInput) => {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[Orchestrator] ----------------------------------------");
        console.log("[Orchestrator] executeGeneration() called");
      }

      setState((prev) => ({ ...prev, status: "generating" }));
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[Orchestrator] State: generating - calling strategy.execute()");
      }

      const result = await strategy.execute(input);
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[Orchestrator] strategy.execute() completed");
      }

      if (strategy.save && userId) {
        if (isMountedRef.current) setState((prev) => ({ ...prev, status: "saving" }));
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[Orchestrator] Saving result to Firestore");
        }
        try {
          await strategy.save(result, userId);
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.log("[Orchestrator] Result saved successfully");
          }
        } catch (saveErr) {
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.log("[Orchestrator] ERROR: Save failed:", saveErr);
          }
          throw createGenerationError("save", alertMessages.saveFailed, saveErr instanceof Error ? saveErr : undefined);
        }
      }

      if (isMountedRef.current) setState({ status: "success", isGenerating: false, result, error: null });
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[Orchestrator] ✅ Generation SUCCESS");
        console.log("[Orchestrator] ========================================");
      }

      if (alertMessages.success) showSuccess("Success", alertMessages.success);
      await onSuccessRef.current?.(result);
      handleLifecycleComplete("success", result);
      return result;
    },
    [strategy, userId, alertMessages, showSuccess, handleLifecycleComplete],
  );

  const generate = useCallback(
    async (input: TInput) => {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[Orchestrator] ========================================");
        console.log("[Orchestrator] generate() called with input:", JSON.stringify(input).substring(0, 200));
        console.log("[Orchestrator] isGenerating:", isGeneratingRef.current);
        console.log("[Orchestrator] userId:", userId);
      }

      if (isGeneratingRef.current) {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[Orchestrator] BLOCKED: Already generating");
        }
        return;
      }

      // Create new AbortController for this generation
      abortControllerRef.current = new AbortController();
      isGeneratingRef.current = true;
      let moderationPending = false;
      setState({ ...INITIAL_STATE, status: "checking", isGenerating: true });

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[Orchestrator] State set to 'checking', isGenerating: true");
      }

      try {
        // Check online status inside the try block to avoid dependency on offlineStore.isOnline
        if (!offlineStore.isOnline) {
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.log("[Orchestrator] ERROR: User is offline");
          }
          throw createGenerationError("network", alertMessages.networkError);
        }

        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[Orchestrator] Online check passed");
        }

        // Check if aborted before moderation
        if (abortControllerRef.current.signal.aborted) {
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.log("[Orchestrator] ERROR: Generation aborted (2)");
          }
          throw new Error("Generation aborted");
        }

        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[Orchestrator] Starting moderation check");
        }

        const result = await handleModeration({
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

        // If handleModeration returned undefined, the warning dialog was shown.
        // The dialog's proceed/cancel callbacks now own isGeneratingRef — don't reset in finally.
        if (result === undefined && moderation) {
          moderationPending = true;
        }

        return result;
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
        await onErrorRef.current?.(error);
        handleLifecycleComplete("error", undefined, error);
        throw error;
      } finally {
        // Only reset if moderation dialog did not take ownership
        if (!moderationPending) {
          isGeneratingRef.current = false;
        }
        abortControllerRef.current = null;
      }
    },
    [offlineStore, moderation, alertMessages, strategy, executeGeneration, showError, handleLifecycleComplete],
  );

  const reset = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setState(INITIAL_STATE);
    isGeneratingRef.current = false;
  }, []);

  return { generate, reset, status: state.status, isGenerating: state.isGenerating, result: state.result, error: state.error };
};

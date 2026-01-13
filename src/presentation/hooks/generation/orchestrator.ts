/**
 * Generation Orchestrator
 * Feature-agnostic hook for AI generation with centralized:
 * - Credit management
 * - Error handling
 * - Alert display
 * - Progress tracking
 */

import { useState, useCallback, useRef } from "react";
import { useOfflineStore, useAlert } from "@umituz/react-native-design-system";
import { useDeductCredit } from "@umituz/react-native-subscription";
import { createGenerationError, getAlertMessage, parseError } from "./errors";
import type {
  GenerationStrategy,
  GenerationConfig,
  GenerationState,
  UseGenerationOrchestratorReturn,
} from "./types";

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
  const { userId, alertMessages, onCreditsExhausted, onSuccess, onError } =
    config;

  const [state, setState] = useState<GenerationState<TResult>>(INITIAL_STATE);
  const isGeneratingRef = useRef(false);
  const offlineStore = useOfflineStore();
  const { showError, showSuccess } = useAlert();
  const { checkCredits, deductCredit } = useDeductCredit({
    userId,
    onCreditsExhausted,
  });

  const generate = useCallback(
    async (input: TInput) => {
      if (isGeneratingRef.current) return;

      isGeneratingRef.current = true;
      setState({ ...INITIAL_STATE, status: "checking", isGenerating: true });

      try {
        if (!offlineStore.isOnline) {
          throw createGenerationError("network", "No internet connection");
        }

        const creditCost = strategy.getCreditCost();
        const hasCredits = await checkCredits(creditCost);
        if (!hasCredits) {
          throw createGenerationError("credits", "Insufficient credits");
        }

        setState((prev) => ({ ...prev, status: "generating", progress: 10 }));

        const result = await strategy.execute(input, (progress) => {
          setState((prev) => ({ ...prev, progress }));
        });

        setState((prev) => ({ ...prev, progress: 70 }));

        if (strategy.save && userId) {
          setState((prev) => ({ ...prev, status: "saving" }));
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

        setState((prev) => ({ ...prev, progress: 90 }));

        await deductCredit(creditCost);

        setState({
          status: "success",
          isGenerating: false,
          progress: 100,
          result,
          error: null,
        });

        if (alertMessages.success) {
          void showSuccess("Success", alertMessages.success);
        }

        onSuccess?.(result);
      } catch (err) {
        const error = parseError(err);

        setState({
          status: "error",
          isGenerating: false,
          progress: 0,
          result: null,
          error,
        });

        void showError("Error", getAlertMessage(error, alertMessages));
        onError?.(error);
      } finally {
        isGeneratingRef.current = false;
      }
    },
    [
      strategy,
      userId,
      alertMessages,
      offlineStore.isOnline,
      checkCredits,
      deductCredit,
      showError,
      showSuccess,
      onSuccess,
      onError,
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

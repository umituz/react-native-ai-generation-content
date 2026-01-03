/**
 * Generic Generation Callbacks Builder
 * Unified hook for ALL generation types (image, video, audio, text)
 */

import { useCallback, useMemo, useRef } from "react";
import { useQueryClient } from "@umituz/react-native-tanstack";
import type {
  GenerationExecutionResult,
  GenerationCallbacks,
  UseGenerationCallbacksBuilderOptions,
} from "./generation-callbacks.types";

declare const __DEV__: boolean;

export function useGenerationCallbacksBuilder<TRequest, TResult>(
  options: UseGenerationCallbacksBuilderOptions<TRequest, TResult>,
): { callbacks: GenerationCallbacks<TRequest, TResult> } {
  const { config, onSuccess, onError } = options;
  const queryClient = useQueryClient();
  const isExecutingRef = useRef(false);

  const canAfford = useCallback(
    (cost?: number): boolean => {
      const actualCost = cost ?? config.creditCost;
      return config.creditBalance >= actualCost;
    },
    [config.creditBalance, config.creditCost],
  );

  const isAuthenticated = useCallback(
    (): boolean => config.isAuthenticated,
    [config.isAuthenticated],
  );

  const calculateCost = useCallback(
    (multiplier = 1): number => config.creditCost * multiplier,
    [config.creditCost],
  );

  const onAuthRequired = useCallback(() => {
    if (config.showAuthModal) {
      config.showAuthModal();
    } else {
      config.openPaywall();
    }
  }, [config]);

  const onCreditsRequired = useCallback(() => {
    config.openPaywall();
  }, [config]);

  const execute = useCallback(
    async (request: TRequest): Promise<GenerationExecutionResult<TResult>> => {
      if (isExecutingRef.current) {
        return { success: false, error: "Generation already in progress" };
      }

      if (!config.isAuthenticated || !config.userId) {
        onAuthRequired();
        return { success: false, error: "Authentication required" };
      }

      if (!canAfford()) {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          // eslint-disable-next-line no-console
          console.log("[Generation] Insufficient credits", {
            balance: config.creditBalance,
            cost: config.creditCost,
          });
        }
        onCreditsRequired();
        return { success: false, error: "Insufficient credits" };
      }

      isExecutingRef.current = true;

      try {
        const result = await config.executor(request);

        if (!result.success || !result.data) {
          return { success: false, error: result.error || "Generation failed" };
        }

        await config.deductCredit(config.creditType);

        if (config.saveCreation) {
          try {
            await config.saveCreation(result.data);
          } catch {
            // Silent fail for save
          }
        }

        const keys = config.invalidateQueryKeys ?? ["creations"];
        keys.forEach((key) => queryClient.invalidateQueries({ queryKey: [key] }));

        onSuccess?.(result.data);
        config.onNavigateAfterSuccess?.();

        return { success: true, data: result.data };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        onError?.(message);
        return { success: false, error: message };
      } finally {
        isExecutingRef.current = false;
      }
    },
    [config, canAfford, onAuthRequired, onCreditsRequired, queryClient, onSuccess, onError],
  );

  const callbacks = useMemo<GenerationCallbacks<TRequest, TResult>>(
    () => ({
      canAfford,
      isAuthenticated,
      calculateCost,
      execute,
      onAuthRequired,
      onCreditsRequired,
    }),
    [canAfford, isAuthenticated, calculateCost, execute, onAuthRequired, onCreditsRequired],
  );

  return { callbacks };
}

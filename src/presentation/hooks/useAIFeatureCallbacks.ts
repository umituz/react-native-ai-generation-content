/**
 * AI Feature Callbacks Adapter Hook
 * Universal adapter for all AI generation features
 * Works with: TextToImage, TextToVideo, ImageToVideo, etc.
 *
 * Architecture:
 * - Types: AIFeatureCallbacksConfig, AIFeatureCallbacks, AIFeatureGenerationResult
 * - Auth Hooks: Authentication-related callbacks
 * - Cost Hooks: Credit and cost management callbacks
 * - Execution Hooks: Generation execution callback
 * - Main Hook: Composition of all callbacks
 */

import { useMemo } from "react";
import type {
  AIFeatureCallbacksConfig,
  AIFeatureCallbacks,
} from "./ai-feature-callbacks.types";
import { useAuthCallbacks } from "./ai-feature-callbacks-auth.hooks";
import { useCostCallbacks } from "./ai-feature-callbacks-cost.hooks";
import { useExecutionCallback } from "./ai-feature-callbacks-execution.hooks";

// Re-export types
export type {
  AIFeatureCallbacksConfig,
  AIFeatureCallbacks,
  AIFeatureGenerationResult,
} from "./ai-feature-callbacks.types";

/**
 * Universal AI feature callbacks hook
 * Composes auth, cost, and execution callbacks into a unified interface
 */
export function useAIFeatureCallbacks<TRequest = unknown, TResult = unknown>(
  config: AIFeatureCallbacksConfig<TRequest, TResult>,
): AIFeatureCallbacks<TRequest, TResult> {
  const {
    userId,
    isAuthenticated: isAuth,
    creditBalance,
    creditCostPerUnit,
    executor,
    showAuthModal,
    openPaywall,
    deductCredits,
    onSuccess,
    onError,
  } = config;

  // Auth callbacks
  const authCallbacks = useAuthCallbacks({
    isAuth,
    userId,
    showAuthModal,
  });

  // Cost callbacks
  const costCallbacks = useCostCallbacks({
    creditBalance,
    creditCostPerUnit,
    openPaywall,
  });

  // Execution callback
  const executionCallbacks = useExecutionCallback({
    executor,
    deductCredits,
    creditCostPerUnit,
    onSuccess,
    onError,
  });

  return useMemo(
    () => ({
      userId,
      ...authCallbacks,
      ...costCallbacks,
      ...executionCallbacks,
      onSuccess,
      onError,
    }),
    [userId, authCallbacks, costCallbacks, executionCallbacks, onSuccess, onError],
  );
}

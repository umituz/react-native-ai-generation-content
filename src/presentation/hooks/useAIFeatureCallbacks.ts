/**
 * AI Feature Callbacks Adapter Hook
 * Universal adapter for all AI generation features
 * Works with: TextToImage, TextToVideo, ImageToVideo, etc.
 */

import { useCallback, useMemo } from "react";

export interface AIFeatureCallbacksConfig<TRequest = unknown, TResult = unknown> {
  // App provides reactive state
  userId: string | null;
  isAuthenticated: boolean;
  creditBalance: number;

  // Cost config
  creditCostPerUnit: number;

  // Executor - the actual generation function
  executor: (request: TRequest) => Promise<{
    success: boolean;
    data?: TResult;
    error?: string;
    imageUrl?: string;
    imageUrls?: string[];
  }>;

  // Actions from app
  showAuthModal: () => void;
  openPaywall: () => void;
  deductCredits?: (amount: number) => Promise<void>;

  // Optional callbacks
  onSuccess?: (result: TResult) => void;
  onError?: (error: string) => void;
}

/**
 * Discriminated union result type for generation
 */
export type AIFeatureGenerationResult =
  | { success: true; imageUrls: string[] }
  | { success: false; error: string };

/**
 * Universal callbacks interface that maps to all feature-specific ones
 */
export interface AIFeatureCallbacks<TRequest = unknown, TResult = unknown> {
  // User state - needed by orchestrator
  userId: string | null;

  // TextToImageCallbacks compatible
  executeGeneration: (request: TRequest) => Promise<AIFeatureGenerationResult>;
  calculateCost: (multiplier?: number, _model?: string | null) => number;
  canAfford: (cost: number) => boolean;
  isAuthenticated: () => boolean;
  onAuthRequired: () => void;
  onCreditsRequired: (cost?: number) => void;
  onSuccess?: (result: TResult) => void;
  onError?: (error: string) => void;

  // ImageToVideoCallbacks compatible
  onCreditCheck: (cost: number) => boolean;
  onShowPaywall: (cost: number) => void;

  // TextToVideoCallbacks compatible
  onAuthCheck: () => boolean;
}

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

  const canAfford = useCallback(
    (cost: number): boolean => creditBalance >= cost,
    [creditBalance],
  );

  const isAuthenticated = useCallback(
    (): boolean => isAuth && !!userId,
    [isAuth, userId],
  );

  const calculateCost = useCallback(
    (multiplier = 1, _model?: string | null): number => creditCostPerUnit * multiplier,
    [creditCostPerUnit],
  );

  const onAuthRequired = useCallback(() => {
    showAuthModal();
  }, [showAuthModal]);

  const onCreditsRequired = useCallback(
    (_cost?: number) => {
      openPaywall();
    },
    [openPaywall],
  );

  const executeGeneration = useCallback(
    async (request: TRequest): Promise<AIFeatureGenerationResult> => {
      try {
        const result = await executor(request);

        if (result.success && deductCredits) {
          await deductCredits(creditCostPerUnit);
        }

        if (result.success && result.data) {
          onSuccess?.(result.data);
        } else if (!result.success && result.error) {
          onError?.(result.error);
        }

        if (result.success) {
          return { success: true, imageUrls: result.imageUrls ?? [] };
        }
        return { success: false, error: result.error ?? "Unknown error" };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        onError?.(message);
        return { success: false, error: message };
      }
    },
    [executor, deductCredits, creditCostPerUnit, onSuccess, onError],
  );

  // Aliases for different callback interfaces
  const onCreditCheck = canAfford;
  const onAuthCheck = isAuthenticated;
  const onShowPaywall = onCreditsRequired;

  return useMemo(
    () => ({
      userId,
      executeGeneration,
      calculateCost,
      canAfford,
      isAuthenticated,
      onAuthRequired,
      onCreditsRequired,
      onSuccess,
      onError,
      onCreditCheck,
      onAuthCheck,
      onShowPaywall,
    }),
    [
      userId,
      executeGeneration,
      calculateCost,
      canAfford,
      isAuthenticated,
      onAuthRequired,
      onCreditsRequired,
      onSuccess,
      onError,
      onCreditCheck,
      onAuthCheck,
      onShowPaywall,
    ],
  );
}

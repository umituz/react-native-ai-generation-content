/**
 * useAIFeatureGate Hook
 * Centralized access control for AI features
 *
 * Single hook that handles:
 * 1. Authentication check
 * 2. Premium subscription check
 * 3. Credit balance check
 * 4. Paywall display
 *
 * Usage:
 * ```typescript
 * const { requireFeature } = useAIFeatureGate({ creditCost: 1 });
 *
 * <AtomicButton onPress={() => requireFeature(handleGenerate)}>
 *   Generate
 * </AtomicButton>
 * ```
 */

import { useCallback, useMemo } from "react";
import { useAuth, useAuthModalStore } from "@umituz/react-native-auth";
import {
  usePremium,
  useCredits,
  usePaywallVisibility,
  useFeatureGate,
} from "@umituz/react-native-subscription";
import type {
  AIFeatureGateOptions,
  AIFeatureGateReturn,
} from "../types/access-control.types";

/**
 * Hook for AI feature access control with 3-tier gating:
 * Auth → Premium/Credits → Paywall → Execute
 *
 * @param options - Configuration for feature gate
 * @returns Access control interface with requireFeature function
 */
export function useAIFeatureGate(
  options: AIFeatureGateOptions,
): AIFeatureGateReturn {
  const { creditCost, onSuccess, onError } = options;

  // Auth state
  const { isAuthenticated: rawIsAuthenticated, isAnonymous } = useAuth();
  const { showAuthModal } = useAuthModalStore();

  // Subscription state
  const { isPremium } = usePremium();
  const { credits, isLoading: isCreditsLoading } = useCredits();
  const { openPaywall } = usePaywallVisibility();

  // Derived states
  const isCreditsLoaded = !isCreditsLoading;
  const isAuthenticated = rawIsAuthenticated && !isAnonymous;
  const creditBalance = credits?.credits ?? 0;
  const hasCredits = creditBalance >= creditCost;

  // Configure feature gate from subscription package
  const { requireFeature: requireFeatureFromPackage } = useFeatureGate({
    isAuthenticated,
    onShowAuthModal: (cb) => showAuthModal(cb),
    hasSubscription: isPremium,
    creditBalance,
    requiredCredits: creditCost,
    onShowPaywall: () => openPaywall(),
    isCreditsLoaded,
  });

  // Can access if: authenticated AND (premium OR has credits)
  const canAccess = useMemo(() => {
    if (!isAuthenticated) return false;
    if (isPremium) return true;
    return hasCredits;
  }, [isAuthenticated, isPremium, hasCredits]);

  // Wrapped requireFeature with optional callbacks
  const requireFeature = useCallback(
    (action: () => void | Promise<void>): void => {
      requireFeatureFromPackage(() => {
        const result = action();
        if (result instanceof Promise) {
          result
            .then(() => onSuccess?.())
            .catch((error) => {
              const errorObj =
                error instanceof Error ? error : new Error(String(error));
              onError?.(errorObj);
            });
        } else {
          onSuccess?.();
        }
      });
    },
    [requireFeatureFromPackage, onSuccess, onError],
  );

  return {
    requireFeature,
    canAccess,
    isCheckingAccess: isCreditsLoading,
    hasCredits,
    isAuthenticated,
    isPremium,
    creditBalance,
  };
}

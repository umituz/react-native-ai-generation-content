/**
 * AI Feature Gate Hook
 * Handles: Offline → Auth → Credits → Paywall → Execute
 *
 * Uses `hasFirebaseUser` for auth check — anonymous users (autoAnonymousSignIn)
 * pass the gate and go straight to credit/subscription checks.
 * Auth modal is only shown if there is NO Firebase user at all.
 */

import { useCallback, useMemo } from "react";
import { useOffline } from "@umituz/react-native-design-system/offline";
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

const handlePromiseResult = (
  result: void | Promise<void>,
  onSuccess?: () => void,
  onError?: (error: Error) => void,
): void => {
  if (result instanceof Promise) {
    result
      .then(() => onSuccess?.())
      .catch((err) => {
        onError?.(err instanceof Error ? err : new Error(String(err)));
      });
  } else {
    onSuccess?.();
  }
};

export function useAIFeatureGate(options: AIFeatureGateOptions): AIFeatureGateReturn {
  const { creditCost, onNetworkError, onSuccess, onError } = options;

  const { isOffline } = useOffline();
  const { hasFirebaseUser } = useAuth();
  const { showAuthModal } = useAuthModalStore();
  const { isPremium } = usePremium();
  const { credits, isCreditsLoaded, isLoading: isCreditsLoading } = useCredits();
  const { openPaywall } = usePaywallVisibility();
  const creditBalance = credits?.credits ?? 0;
  const hasCredits = creditBalance >= creditCost;

  const { requireFeature: requireFeatureFromPackage } = useFeatureGate({
    isAuthenticated: hasFirebaseUser,
    onShowAuthModal: (cb?: () => void) => showAuthModal(cb),
    hasSubscription: isPremium,
    creditBalance,
    requiredCredits: creditCost,
    onShowPaywall: () => openPaywall(),
    isCreditsLoaded,
  });

  const canAccess = useMemo(
    () => !isOffline && hasFirebaseUser && (isPremium || hasCredits),
    [isOffline, hasFirebaseUser, isPremium, hasCredits],
  );

  const requireFeature = useCallback(
    (action: () => void | Promise<void>): boolean => {
      if (isOffline) {
        onNetworkError?.();
        return false;
      }

      if (hasFirebaseUser && !isCreditsLoaded && isCreditsLoading) {
        return false;
      }

      const executed = requireFeatureFromPackage(() => {
        handlePromiseResult(action(), onSuccess, onError);
      });

      return executed;
    },
    [isOffline, hasFirebaseUser, isCreditsLoaded, isCreditsLoading, isPremium, creditBalance, creditCost, hasCredits, onNetworkError, requireFeatureFromPackage, onSuccess, onError],
  );

  return {
    requireFeature,
    canAccess,
    isCheckingAccess: isCreditsLoading,
    hasCredits,
    hasFirebaseUser,
    isPremium,
    creditBalance,
    isOffline,
  };
}

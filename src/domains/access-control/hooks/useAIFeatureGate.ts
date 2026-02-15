/**
 * AI Feature Gate Hook
 * Handles: Auth → Credits → Paywall → Execute
 */

import { useCallback, useMemo } from "react";
import { useOffline } from "@umituz/react-native-design-system";
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

declare const __DEV__: boolean;

const handlePromiseResult = (
  result: void | Promise<void>,
  onSuccess?: () => void,
  onError?: (error: Error) => void,
): void => {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[AIFeatureGate] handlePromiseResult - isPromise:", result instanceof Promise);
  }
  if (result instanceof Promise) {
    result
      .then(() => {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[AIFeatureGate] Promise resolved, calling onSuccess");
        }
        onSuccess?.();
      })
      .catch((err) => {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[AIFeatureGate] Promise rejected:", err);
        }
        onError?.(err instanceof Error ? err : new Error(String(err)));
      });
  } else {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[AIFeatureGate] Sync result, calling onSuccess");
    }
    onSuccess?.();
  }
};

export function useAIFeatureGate(options: AIFeatureGateOptions): AIFeatureGateReturn {
  const { creditCost, onNetworkError, onSuccess, onError } = options;

  const { isOffline } = useOffline();
  const { isAuthenticated: rawIsAuth, isAnonymous } = useAuth();
  const { showAuthModal } = useAuthModalStore();
  const { isPremium } = usePremium();
  const { credits, isCreditsLoaded, isLoading: isCreditsLoading } = useCredits();
  const { openPaywall } = usePaywallVisibility();

  const isAuthenticated = rawIsAuth && !isAnonymous;
  const creditBalance = credits?.credits ?? 0;
  const hasCredits = creditBalance >= creditCost;

  const { requireFeature: requireFeatureFromPackage } = useFeatureGate({
    isAuthenticated,
    onShowAuthModal: (cb?: () => void) => showAuthModal(cb),
    hasSubscription: isPremium,
    creditBalance,
    requiredCredits: creditCost,
    onShowPaywall: () => openPaywall(),
    isCreditsLoaded,
  });

  const canAccess = useMemo(
    () => !isOffline && isAuthenticated && (isPremium || hasCredits),
    [isOffline, isAuthenticated, isPremium, hasCredits],
  );

  const requireFeature = useCallback(
    (action: () => void | Promise<void>): void => {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[AIFeatureGate] requireFeature called:", {
          isOffline,
          isAuthenticated,
          isCreditsLoaded,
          isPremium,
          creditBalance,
          creditCost,
          hasCredits,
        });
      }

      if (isOffline) {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[AIFeatureGate] BLOCKED: User is offline");
        }
        onNetworkError?.();
        return;
      }

      if (isAuthenticated && !isCreditsLoaded) {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[AIFeatureGate] BLOCKED: User authenticated but credits not loaded yet");
        }
        return;
      }

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[AIFeatureGate] Calling requireFeatureFromPackage");
      }

      requireFeatureFromPackage(() => {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[AIFeatureGate] Inside requireFeatureFromPackage callback - executing action");
        }
        handlePromiseResult(action(), onSuccess, onError);
      });
    },
    [isOffline, isAuthenticated, isCreditsLoaded, isPremium, creditBalance, creditCost, hasCredits, onNetworkError, requireFeatureFromPackage, onSuccess, onError],
  );

  return {
    requireFeature,
    canAccess,
    isCheckingAccess: isCreditsLoading,
    hasCredits,
    isAuthenticated,
    isPremium,
    creditBalance,
    isOffline,
  };
}

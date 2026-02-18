/**
 * AI Feature Callbacks - Authentication Hooks
 * Authentication-related callback hooks
 */

import { useCallback } from "react";

interface UseAuthCallbacksParams {
  isAuth: boolean;
  userId: string | null;
  showAuthModal: (callback?: () => void) => void;
}

interface AuthCallbacks {
  isAuthenticated: () => boolean;
  onAuthRequired: () => void;
  onAuthCheck: () => boolean;
}

/**
 * Hook for authentication-related callbacks
 */
export function useAuthCallbacks(params: UseAuthCallbacksParams): AuthCallbacks {
  const { isAuth, userId, showAuthModal } = params;

  const isAuthenticated = useCallback(
    (): boolean => isAuth && !!userId,
    [isAuth, userId],
  );

  const onAuthRequired = useCallback(() => {
    showAuthModal();
  }, [showAuthModal]);

  // Alias for different callback interfaces
  const onAuthCheck = isAuthenticated;

  return {
    isAuthenticated,
    onAuthRequired,
    onAuthCheck,
  };
}

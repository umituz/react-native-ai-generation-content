/**
 * Access Control Types
 * Type definitions for AI feature access control
 */

export interface AIFeatureGateOptions {
  /**
   * Number of credits required for this feature
   */
  creditCost: number;

  /**
   * Optional feature name for analytics tracking
   */
  featureName?: string;

  /**
   * Callback fired when network is unavailable
   */
  onNetworkError?: () => void;

  /**
   * Callback fired when feature is successfully accessed and executed
   */
  onSuccess?: () => void;

  /**
   * Callback fired when feature access fails or execution errors
   */
  onError?: (error: Error) => void;
}

export interface AIFeatureGateReturn {
  /**
   * Function to execute protected feature
   * Handles all access control checks (auth, premium, credits, paywall)
   * @returns true if action was executed, false if blocked by gate
   */
  requireFeature: (action: () => void | Promise<void>) => boolean;

  /**
   * Whether user can access this feature (all checks passed)
   */
  canAccess: boolean;

  /**
   * Whether access checks are currently loading
   */
  isCheckingAccess: boolean;

  /**
   * Whether user has sufficient credits
   */
  hasCredits: boolean;

  /**
   * Whether user is authenticated (not anonymous)
   */
  isAuthenticated: boolean;

  /**
   * Whether user has premium subscription
   */
  isPremium: boolean;

  /**
   * Current credit balance
   */
  creditBalance: number;

  /**
   * Whether device is offline
   */
  isOffline: boolean;
}

/**
 * Hook type definition for useAIFeatureGate
 */
export type AIFeatureGateHook = (
  options: AIFeatureGateOptions,
) => AIFeatureGateReturn;

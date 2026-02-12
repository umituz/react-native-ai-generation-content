/**
 * AI Feature Callbacks Type Definitions
 * Type definitions for universal AI feature callbacks adapter
 */

/**
 * Configuration for AI feature callbacks hook
 * Generic over TRequest and TResult for type safety
 */
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

  // Actions from app - showAuthModal accepts callback for post-auth resume
  showAuthModal: (callback?: () => void) => void;
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
 * Compatible with TextToImageCallbacks, ImageToVideoCallbacks, TextToVideoCallbacks
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

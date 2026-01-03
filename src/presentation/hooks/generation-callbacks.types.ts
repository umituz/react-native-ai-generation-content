/**
 * Generation Callbacks Types
 * Type definitions for unified generation flow
 */

export type CreditType = "image" | "text" | "video" | "audio";

export interface GenerationExecutionResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface GenerationCallbacksConfig<TRequest, TResult> {
  userId: string | null;
  isAuthenticated: boolean;
  creditBalance: number;
  creditCost: number;
  creditType: CreditType;
  executor: (request: TRequest) => Promise<GenerationExecutionResult<TResult>>;
  deductCredit: (type: CreditType) => Promise<void>;
  openPaywall: () => void;
  showAuthModal?: () => void;
  saveCreation?: (result: TResult) => Promise<void>;
  onNavigateAfterSuccess?: () => void;
  invalidateQueryKeys?: string[];
}

export interface GenerationCallbacks<TRequest, TResult> {
  canAfford: (cost?: number) => boolean;
  isAuthenticated: () => boolean;
  calculateCost: (multiplier?: number) => number;
  execute: (request: TRequest) => Promise<GenerationExecutionResult<TResult>>;
  onAuthRequired: () => void;
  onCreditsRequired: () => void;
}

export interface UseGenerationCallbacksBuilderOptions<TRequest, TResult> {
  config: GenerationCallbacksConfig<TRequest, TResult>;
  onSuccess?: (result: TResult) => void;
  onError?: (error: string) => void;
}

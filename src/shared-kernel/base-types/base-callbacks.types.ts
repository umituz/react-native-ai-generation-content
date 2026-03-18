/**
 * Base callback types for AI generation operations
 * Shared across all generation domains
 */

import type { BaseGenerationResult, GenerationProgress } from './base-generation.types';

/**
 * Credit-related callbacks for premium features
 */
export interface CreditCallbacks {
  /** Called when credit check is needed before generation */
  onCreditCheck?: () => Promise<boolean>;
  /** Called when user needs to see paywall */
  onShowPaywall?: () => void;
  /** Called when credits are successfully consumed */
  onCreditsConsumed?: (amount: number) => void;
}

/**
 * Progress callbacks for long-running operations
 */
export interface ProgressCallbacks {
  /** Called when generation progress updates */
  onProgress?: (progress: GenerationProgress) => void;
  /** Called when operation starts */
  onStart?: () => void;
  /** Called when operation completes (success or failure) */
  onComplete?: () => void;
}

/**
 * Result callbacks for generation operations
 */
export interface ResultCallbacks<TData = string> {
  /** Called when generation succeeds */
  onSuccess?: (result: BaseGenerationResult<TData>) => void;
  /** Called when generation fails */
  onError?: (error: Error) => void;
  /** Called when generation is cancelled */
  onCancel?: () => void;
}

/**
 * Combined callbacks for generation operations
 * Includes all callback types in a single interface
 */
export interface BaseGenerationCallbacks<TData = string>
  extends CreditCallbacks,
    ProgressCallbacks,
    ResultCallbacks<TData> {}

/**
 * Validation callbacks for input validation
 */
export interface ValidationCallbacks {
  /** Called when validation fails */
  onValidationFailed?: (errors: Record<string, string>) => void;
  /** Called when input is invalid */
  onInvalidInput?: (field: string, reason: string) => void;
}

/**
 * Lifecycle callbacks for feature components
 */
export interface LifecycleCallbacks {
  /** Called when component mounts */
  onMount?: () => void;
  /** Called when component unmounts */
  onUnmount?: () => void;
  /** Called when component updates */
  onUpdate?: (prevProps: unknown, nextProps: unknown) => void;
}

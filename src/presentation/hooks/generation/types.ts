/**
 * Generation Types
 * Type definitions for feature-agnostic generation orchestration
 */

export type OrchestratorStatus =
  | "idle"
  | "checking"
  | "authenticating"
  | "moderating"
  | "generating"
  | "saving"
  | "success"
  | "error";

export interface GenerationStrategy<TInput, TResult> {
  /** Execute the generation */
  execute: (
    input: TInput,
    onProgress?: (progress: number) => void,
  ) => Promise<TResult>;
  /** Credit cost for this generation */
  getCreditCost: () => number;
  /** Optional: Save result to storage */
  save?: (result: TResult, userId: string) => Promise<void>;
}

export interface AlertMessages {
  networkError: string;
  policyViolation: string;
  saveFailed: string;
  creditFailed: string;
  unknown: string;
  success?: string;
  authRequired?: string;
}

/** Content moderation result */
export interface ModerationResult {
  allowed: boolean;
  warnings: string[];
}

/** Auth callbacks for features that need authentication */
export interface AuthCallbacks {
  /** Check if user is authenticated */
  isAuthenticated: () => boolean;
  /** Called when auth is required */
  onAuthRequired?: () => void;
}

/** Moderation callbacks for content filtering */
export interface ModerationCallbacks {
  /** Check content for policy violations */
  checkContent: (input: unknown) => Promise<ModerationResult>;
  /** Show moderation warning with continue/cancel options */
  onShowWarning?: (
    warnings: string[],
    onCancel: () => void,
    onContinue: () => void,
  ) => void;
}

/** Credit callbacks for features that manage credits via callbacks */
export interface CreditCallbacks {
  /** Check if user can afford the cost */
  checkCredits: (cost: number) => Promise<boolean>;
  /** Deduct credits after successful generation */
  deductCredits: (cost: number) => Promise<void>;
  /** Called when credits are exhausted */
  onCreditsExhausted?: () => void;
}

export interface GenerationConfig {
  userId: string | undefined;
  alertMessages: AlertMessages;
  onCreditsExhausted?: () => void;
  onSuccess?: (result: unknown) => void;
  onError?: (error: GenerationError) => void;
  /** Optional auth callbacks - if not provided, auth is skipped */
  auth?: AuthCallbacks;
  /** Optional moderation callbacks - if not provided, moderation is skipped */
  moderation?: ModerationCallbacks;
  /** Optional credit callbacks - if provided, overrides default useDeductCredit */
  credits?: CreditCallbacks;
}

export interface GenerationState<TResult> {
  status: OrchestratorStatus;
  isGenerating: boolean;
  progress: number;
  result: TResult | null;
  error: GenerationError | null;
}

export interface GenerationError {
  type: GenerationErrorType;
  message: string;
  originalError?: Error;
}

export type GenerationErrorType =
  | "network"
  | "credits"
  | "policy"
  | "save"
  | "unknown";

export interface UseGenerationOrchestratorReturn<TInput, TResult> {
  generate: (input: TInput) => Promise<void>;
  reset: () => void;
  status: OrchestratorStatus;
  isGenerating: boolean;
  progress: number;
  result: TResult | null;
  error: GenerationError | null;
}

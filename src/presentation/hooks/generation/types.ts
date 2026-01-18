/**
 * Generation Types
 * Type definitions for feature-agnostic generation orchestration
 */

export type OrchestratorStatus =
  | "idle"
  | "checking"
  | "moderating"
  | "generating"
  | "saving"
  | "success"
  | "error";

export interface GenerationStrategy<TInput, TResult> {
  execute: (input: TInput, onProgress?: (progress: number) => void) => Promise<TResult>;
  getCreditCost: () => number;
  save?: (result: TResult, userId: string) => Promise<void>;
}

export interface AlertMessages {
  networkError: string;
  policyViolation: string;
  saveFailed: string;
  creditFailed: string;
  unknown: string;
  success?: string;
}

export interface ModerationResult {
  allowed: boolean;
  warnings: string[];
}

export interface ModerationCallbacks {
  checkContent: (input: unknown) => Promise<ModerationResult>;
  onShowWarning?: (warnings: string[], onCancel: () => void, onContinue: () => void) => void;
}

export interface CreditCallbacks {
  checkCredits: (cost: number) => Promise<boolean>;
  deductCredits: (cost: number) => Promise<boolean>;
  onCreditsExhausted?: () => void;
}

export interface LifecycleConfig {
  onComplete?: (status: "success" | "error", result?: unknown, error?: GenerationError) => void;
  completeDelay?: number;
  autoReset?: boolean;
  resetDelay?: number;
}

export interface GenerationConfig {
  userId: string | undefined;
  alertMessages: AlertMessages;
  onCreditsExhausted?: () => void;
  onSuccess?: (result: unknown) => void;
  onError?: (error: GenerationError) => void;
  moderation?: ModerationCallbacks;
  credits?: CreditCallbacks;
  lifecycle?: LifecycleConfig;
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

export type GenerationErrorType = "network" | "credits" | "policy" | "save" | "unknown";

export interface UseGenerationOrchestratorReturn<TInput, TResult> {
  generate: (input: TInput) => Promise<TResult | void>;
  reset: () => void;
  status: OrchestratorStatus;
  isGenerating: boolean;
  progress: number;
  result: TResult | null;
  error: GenerationError | null;
}

export interface GenerationErrorConfig {
  readonly showCreditInfo?: boolean;
  readonly iconName?: string;
  readonly iconSize?: number;
}

export interface GenerationErrorTranslations {
  readonly title: string;
  readonly tryAgain: string;
  readonly chooseAnother: string;
  readonly noCreditCharged: string;
}

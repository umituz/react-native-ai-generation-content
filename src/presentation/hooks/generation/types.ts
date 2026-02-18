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
  execute: (input: TInput) => Promise<TResult>;
  save?: (result: TResult, userId: string) => Promise<void>;
}

export interface AlertMessages {
  readonly networkError: string;
  readonly policyViolation: string;
  readonly saveFailed: string;
  readonly creditFailed: string;
  readonly unknown: string;
  readonly success?: string;
}

export interface ModerationResult {
  readonly allowed: boolean;
  readonly warnings: string[];
}

export interface ModerationCallbacks {
  readonly checkContent: (input: unknown) => Promise<ModerationResult>;
  readonly onShowWarning?: (
    warnings: string[],
    onCancel: () => void,
    onContinue: () => void
  ) => void;
}

export interface LifecycleConfig {
  readonly onComplete?: (
    status: "success" | "error",
    result?: unknown,
    error?: GenerationError
  ) => void;
  readonly completeDelay?: number;
  readonly autoReset?: boolean;
  readonly resetDelay?: number;
}

export interface GenerationConfig {
  readonly userId: string | undefined;
  readonly alertMessages: AlertMessages;
  readonly onSuccess?: (result: unknown) => void;
  readonly onError?: (error: GenerationError) => void;
  readonly moderation?: ModerationCallbacks;
  readonly lifecycle?: LifecycleConfig;
}

export interface GenerationState<TResult> {
  readonly status: OrchestratorStatus;
  readonly isGenerating: boolean;
  readonly result: TResult | null;
  readonly error: GenerationError | null;
}

export interface GenerationError {
  readonly type: GenerationErrorType;
  readonly message: string;
  readonly originalError?: Error;
}

export type GenerationErrorType = "network" | "credits" | "policy" | "save" | "unknown";

export interface UseGenerationOrchestratorReturn<TInput, TResult> {
  readonly generate: (input: TInput) => Promise<TResult | void>;
  readonly reset: () => void;
  readonly status: OrchestratorStatus;
  readonly isGenerating: boolean;
  readonly result: TResult | null;
  readonly error: GenerationError | null;
}


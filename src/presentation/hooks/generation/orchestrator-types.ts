/**
 * Generation Orchestrator - Type Definitions
 */

export type GenerationStatus = "idle" | "checking" | "generating" | "saving" | "success" | "error";

export interface GenerationState<T> {
  readonly status: GenerationStatus;
  readonly isGenerating: boolean;
  readonly result: T | null;
  readonly error: GenerationError | null;
}

export interface GenerationError {
  readonly type: "network" | "moderation" | "credits" | "generation" | "save" | "unknown";
  readonly message: string;
  readonly originalError?: Error;
}

export interface GenerationStrategy<TInput, TResult> {
  readonly execute: (input: TInput, signal?: AbortSignal) => Promise<TResult>;
  readonly save?: (result: TResult, userId: string) => Promise<void>;
}

export interface GenerationConfig {
  readonly userId: string | null;
  readonly alertMessages: {
    readonly networkError?: string;
    readonly moderationError?: string;
    readonly insufficientCredits?: string;
    readonly generationError?: string;
    readonly saveFailed?: string;
    readonly success?: string;
  };
  readonly onSuccess?: (result: unknown) => Promise<void>;
  readonly onError?: (error: GenerationError) => Promise<void>;
  readonly moderation?: {
    readonly enabled?: boolean;
    readonly onWarning?: (warning: string, onProceed: () => void, onCancel: () => void) => void;
  };
  readonly lifecycle?: {
    readonly onStart?: () => void;
    readonly onComplete?: (status: "success" | "error", result?: unknown, error?: GenerationError) => void;
    readonly completeDelay?: number;
  };
}

export interface UseGenerationOrchestratorReturn<TInput, TResult> {
  readonly generate: (input: TInput) => Promise<TResult | void>;
  readonly reset: () => void;
  readonly status: GenerationStatus;
  readonly isGenerating: boolean;
  readonly result: TResult | null;
  readonly error: GenerationError | null;
}

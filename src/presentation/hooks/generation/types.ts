/**
 * Generation Types
 * Type definitions for feature-agnostic generation orchestration
 */

export type OrchestratorStatus =
  | "idle"
  | "checking"
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
}

export interface GenerationConfig {
  userId: string | undefined;
  alertMessages: AlertMessages;
  onCreditsExhausted?: () => void;
  onSuccess?: (result: unknown) => void;
  onError?: (error: GenerationError) => void;
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

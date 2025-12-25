/**
 * Photo Generation Types
 * Generic types for photo-based AI generation workflows
 */

export interface PhotoGenerationInput<TMetadata = unknown> {
  photos: Array<{ uri: string; base64: string }>;
  metadata?: TMetadata;
}

export interface PhotoGenerationResult<TResult = unknown> {
  success: boolean;
  data?: TResult;
  error?: PhotoGenerationError;
}

export interface PhotoGenerationError {
  type: "network_error" | "policy_violation" | "save_failed" | "credit_failed" | "unknown";
  message: string;
  originalError?: Error;
}

export interface PhotoGenerationConfig<TInput, TResult, TSaveInput> {
  generate: (input: TInput) => Promise<TResult>;
  save?: (result: TResult, input: TInput) => Promise<TSaveInput>;
  buildMetadata?: (input: TInput) => Record<string, unknown>;
  checkCredits?: () => Promise<boolean>;
  deductCredits?: () => Promise<void>;
  onSuccess?: (result: TResult) => void;
  onError?: (error: PhotoGenerationError) => void;
  onSaveComplete?: (saveResult: TSaveInput) => void;
}

export interface PhotoGenerationState<TResult = unknown> {
  isGenerating: boolean;
  result: TResult | null;
  error: PhotoGenerationError | null;
  progress: number;
}

export type PhotoGenerationStatus = "idle" | "validating" | "generating" | "saving" | "success" | "error";

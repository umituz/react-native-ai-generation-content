/**
 * Photo Generation Types
 * Generic types for photo-based AI generation workflows
 */

export interface PhotoGenerationInput<TMetadata = any> {
  photos: Array<{ uri: string; base64: string }>;
  metadata?: TMetadata;
}

export interface PhotoGenerationResult<TResult = any> {
  success: boolean;
  data?: TResult;
  error?: PhotoGenerationError;
}

export interface PhotoGenerationError {
  type: "timeout" | "policy_violation" | "save_failed" | "credit_failed" | "unknown";
  message: string;
  originalError?: Error;
}

export interface PhotoGenerationConfig<TInput, TResult, TSaveInput> {
  generate: (input: TInput) => Promise<TResult>;
  save?: (result: TResult, input: TInput) => Promise<TSaveInput>;
  checkCredits?: () => Promise<boolean>;
  deductCredits?: () => Promise<void>;
  timeout?: number;
  onSuccess?: (result: TResult) => void;
  onError?: (error: PhotoGenerationError) => void;
  onSaveComplete?: (saveResult: TSaveInput) => void;
}

export interface PhotoGenerationState<TResult = any> {
  isGenerating: boolean;
  result: TResult | null;
  error: PhotoGenerationError | null;
  progress: number;
}

export type PhotoGenerationStatus = "idle" | "validating" | "generating" | "saving" | "success" | "error";

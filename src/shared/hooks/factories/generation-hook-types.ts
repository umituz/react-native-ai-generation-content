/**
 * Generic Generation Hook Factory - Type Definitions
 */

/**
 * Generation state
 */
export interface GenerationState {
  isGenerating: boolean;
  progress: number;
  error: string | null;
}

/**
 * Generation callbacks
 */
export interface GenerationCallbacks<TResult> {
  /** Called when generation succeeds */
  onSuccess?: (result: TResult) => void;
  /** Called when generation fails */
  onError?: (error: string) => void;
  /** Called on progress update */
  onProgress?: (progress: number) => void;
}

/**
 * Generation hook configuration
 */
export interface GenerationHookConfig<TRequest, TResult> {
  /** Execute the generation request */
  execute: (request: TRequest, signal?: AbortSignal) => Promise<TResult>;
  /** Optional validation before execution */
  validate?: (request: TRequest) => string | null;
  /** Optional transform for errors */
  transformError?: (error: unknown) => string;
}

/**
 * Generation hook return type
 */
export interface GenerationHookReturn<TRequest, TResult> {
  generationState: GenerationState;
  handleGenerate: (request: TRequest) => Promise<TResult | null>;
  setProgress: (progress: number) => void;
  setError: (error: string | null) => void;
  abort: () => void;
}

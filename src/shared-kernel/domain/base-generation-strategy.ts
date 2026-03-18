/**
 * Base strategy pattern for generation operations
 * Eliminates duplicate strategy implementations across domains
 */

import type {
  BaseGenerationCallbacks,
  BaseGenerationResult,
  BaseRequestMeta,
  GenerationProgress,
} from '../base-types';

/**
 * Base strategy interface for all generation operations
 */
export interface IGenerationStrategy<TInput, TOutput> {
  /** Execute the generation operation */
  execute(input: TInput, meta: BaseRequestMeta): Promise<BaseGenerationResult<TOutput>>;
  /** Validate input before execution */
  validate(input: TInput): boolean | Promise<boolean>;
  /** Get estimated cost in credits */
  getCreditCost(input: TInput): number;
  /** Cancel ongoing generation */
  cancel?(): void;
}

/**
 * Abstract base class for generation strategies
 * Provides common implementation for all strategies
 */
export abstract class BaseGenerationStrategy<TInput, TOutput>
  implements IGenerationStrategy<TInput, TOutput>
{
  protected callbacks?: BaseGenerationCallbacks<TOutput>;
  protected isCancelled = false;

  constructor(callbacks?: BaseGenerationCallbacks<TOutput>) {
    this.callbacks = callbacks;
  }

  /**
   * Execute generation with consistent error handling and callbacks
   */
  async execute(
    input: TInput,
    meta: BaseRequestMeta
  ): Promise<BaseGenerationResult<TOutput>> {
    const startTime = Date.now();

    try {
      this.isCancelled = false;
      this.callbacks?.onStart?.();

      // Validate input
      const isValid = await this.validate(input);
      if (!isValid) {
        throw new Error('Invalid input');
      }

      // Check credits
      const creditCost = this.getCreditCost(input);
      if (this.callbacks?.onCreditCheck) {
        const hasCredits = await this.callbacks.onCreditCheck();
        if (!hasCredits) {
          this.callbacks?.onShowPaywall?.();
          return {
            success: false,
            error: 'Insufficient credits',
            requestId: meta.requestId,
          };
        }
      }

      // Execute generation
      const result = await this.doExecute(input, meta);

      if (this.isCancelled) {
        this.callbacks?.onCancel?.();
        return {
          success: false,
          error: 'Generation cancelled',
          requestId: meta.requestId,
        };
      }

      if (result.success) {
        this.callbacks?.onSuccess?.(result);
        this.callbacks?.onCreditsConsumed?.(creditCost);
      } else {
        const error = new Error(result.error || 'Generation failed');
        this.callbacks?.onError?.(error);
      }

      this.callbacks?.onComplete?.();

      return {
        ...result,
        duration: Date.now() - startTime,
      };
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error');
      this.callbacks?.onError?.(err);
      this.callbacks?.onComplete?.();

      return {
        success: false,
        error: err.message,
        requestId: meta.requestId,
        duration: Date.now() - startTime,
      };
    }
  }

  /**
   * Abstract method to be implemented by concrete strategies
   */
  protected abstract doExecute(
    input: TInput,
    meta: BaseRequestMeta
  ): Promise<BaseGenerationResult<TOutput>>;

  /**
   * Abstract validation method to be implemented by concrete strategies
   */
  abstract validate(input: TInput): boolean | Promise<boolean>;

  /**
   * Abstract credit cost method to be implemented by concrete strategies
   */
  abstract getCreditCost(input: TInput): number;

  /**
   * Cancel ongoing generation
   */
  cancel(): void {
    this.isCancelled = true;
  }

  /**
   * Report progress during generation
   */
  protected reportProgress(progress: number, status?: string): void {
    const progressInfo: GenerationProgress = { progress, status };
    this.callbacks?.onProgress?.(progressInfo);
  }
}

/**
 * BaseExecutor - Template Method Pattern
 * Eliminates code duplication across 8+ executor implementations
 *
 * @see https://refactoring.guru/design-patterns/template-method/typescript/example
 *
 * Template Method Pattern defines skeleton of algorithm in base class,
 * letting subclasses override specific steps without changing structure.
 */

import { providerRegistry } from "../services";
import { failure, success, type Result } from "../../domain/types/result.types";

declare const __DEV__: boolean;

/**
 * Base options that all executors share
 */
export interface BaseExecutorOptions<TInput, TOutput> {
  model: string;
  buildInput: (request: TInput) => unknown;
  extractResult?: (result: unknown) => TOutput | undefined;
  onProgress?: (progress: number) => void;
}

/**
 * Abstract base class for all AI feature executors
 * Implements Template Method pattern for execution flow
 */
export abstract class BaseExecutor<TRequest, TResult, TOutput> {
  protected readonly logPrefix: string;

  constructor(logPrefix: string) {
    this.logPrefix = logPrefix;
  }

  /**
   * Template Method - defines the execution algorithm skeleton
   * This is the main method that orchestrates the execution flow
   */
  public async execute(
    request: TRequest,
    options: BaseExecutorOptions<TRequest, TOutput>,
  ): Promise<Result<TResult, string>> {
    // Step 1: Get provider
    const provider = providerRegistry.getActiveProvider();
    if (!provider) {
      this.logError("No AI provider configured");
      return failure("No AI provider configured");
    }

    // Step 2: Check initialization
    if (!provider.isInitialized()) {
      this.logError("AI provider not initialized");
      return failure("AI provider not initialized");
    }

    // Step 3: Validate request (subclass-specific)
    const validationError = this.validateRequest(request);
    if (validationError) {
      this.logError(validationError);
      return failure(validationError);
    }

    // Step 4: Log execution start
    this.logInfo(`Provider: ${provider.providerId}, Model: ${options.model}`);

    // Step 5: Execute with error handling
    try {
      // Build input
      const input = options.buildInput(request);

      // Execute provider call (subclass-specific)
      // Provider handles all progress reporting via callbacks
      const providerResult = await this.executeProvider(
        provider,
        options.model,
        input,
        options.onProgress,
      );

      // Extract result
      const extractor = options.extractResult || this.getDefaultExtractor();
      const extracted = extractor(providerResult);

      // Validate extracted result (subclass-specific)
      const resultValidationError = this.validateExtractedResult(extracted);
      if (resultValidationError) {
        this.logError(resultValidationError);
        return failure(resultValidationError);
      }

      // Transform to final result (subclass-specific)
      return success(this.transformResult(extracted as TOutput));
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logError(`Error: ${message}`);
      return failure(message);
    }
  }

  /**
   * Check if feature is supported by current provider
   */
  public hasSupport(): boolean {
    const provider = providerRegistry.getActiveProvider();
    return provider !== null && provider.isInitialized();
  }

  // ==================== Abstract Methods (Must Override) ====================

  /**
   * Validate the incoming request
   * Return error message if invalid, undefined if valid
   */
  protected abstract validateRequest(request: TRequest): string | undefined;

  /**
   * Execute the provider call (run or subscribe)
   * Subclasses implement their specific provider interaction
   */
  protected abstract executeProvider(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    provider: any,
    model: string,
    input: unknown,
    onProgress?: (progress: number) => void,
  ): Promise<unknown>;

  /**
   * Validate the extracted result
   * Return error message if invalid, undefined if valid
   */
  protected abstract validateExtractedResult(
    extracted: TOutput | undefined,
  ): string | undefined;

  /**
   * Transform extracted output to final result type
   */
  protected abstract transformResult(extracted: TOutput): TResult;

  /**
   * Get default result extractor for this executor type
   */
  protected abstract getDefaultExtractor(): (
    result: unknown,
  ) => TOutput | undefined;

  // ==================== Utility Methods ====================

  /**
   * Log info message (development only)
   */
  protected logInfo(message: string): void {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log(`[${this.logPrefix}] ${message}`);
    }
  }

  /**
   * Log error message (development only)
   */
  protected logError(message: string): void {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error(`[${this.logPrefix}] ${message}`);
    }
  }
}

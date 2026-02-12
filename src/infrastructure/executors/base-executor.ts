/**
 * BaseExecutor - Template Method Pattern
 */

import { providerRegistry } from "../services";
import { failure, success, type Result } from "../../domain/types/result.types";
import type { IAIProvider } from "../../domain/interfaces";
import type { BaseExecutorOptions } from "./base-executor.types";

declare const __DEV__: boolean;

export abstract class BaseExecutor<TRequest, TResult, TOutput> {
  protected readonly logPrefix: string;

  constructor(logPrefix: string) {
    this.logPrefix = logPrefix;
  }

  public async execute(
    request: TRequest,
    options: BaseExecutorOptions<TRequest, TOutput>,
  ): Promise<Result<TResult, string>> {
    const providerResult = this.getProvider();
    if (providerResult.error || !providerResult.provider) return failure(providerResult.error);

    const validationError = this.validateRequest(request);
    if (validationError) {
      this.log("error", validationError);
      return failure(validationError);
    }

    this.log("info", `Provider: ${providerResult.provider.providerId}, Model: ${options.model}`);

    try {
      return await this.performGeneration(request, options, providerResult.provider);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.log("error", `Error: ${message}`);
      return failure(message);
    }
  }

  public hasSupport(): boolean {
    const provider = providerRegistry.getActiveProvider();
    return provider !== null && provider.isInitialized();
  }

  protected abstract validateRequest(request: TRequest): string | undefined;
  protected abstract executeProvider(
    provider: IAIProvider,
    model: string,
    input: Record<string, unknown>,
    onProgress?: (progress: number) => void,
  ): Promise<unknown>;
  protected abstract validateExtractedResult(extracted: TOutput | undefined): string | undefined;
  protected abstract transformResult(extracted: TOutput): TResult;
  protected abstract getDefaultExtractor(): (result: unknown) => TOutput | undefined;

  private getProvider(): { provider: IAIProvider; error: null } | { provider: null; error: string } {
    const provider = providerRegistry.getActiveProvider();
    if (!provider) {
      this.log("error", "No AI provider configured");
      return { provider: null, error: "No AI provider configured" };
    }
    if (!provider.isInitialized()) {
      this.log("error", "AI provider not initialized");
      return { provider: null, error: "AI provider not initialized" };
    }
    return { provider, error: null };
  }

  private async performGeneration(
    request: TRequest,
    options: BaseExecutorOptions<TRequest, TOutput>,
    provider: IAIProvider,
  ): Promise<Result<TResult, string>> {
    const input = options.buildInput(request);
    const providerResult = await this.executeProvider(provider, options.model, input, options.onProgress);
    const extractor = options.extractResult || this.getDefaultExtractor();
    const extracted = extractor(providerResult);

    const error = this.validateExtractedResult(extracted);
    if (error) {
      this.log("error", error);
      return failure(error);
    }

    return success(this.transformResult(extracted as TOutput));
  }

  protected log(level: "info" | "error", message: string): void {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      const fn = level === "error" ? console.error : console.log;
      fn(`[${this.logPrefix}] ${message}`);
    }
  }
}

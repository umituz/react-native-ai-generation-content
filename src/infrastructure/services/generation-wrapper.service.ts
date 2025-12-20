/**
 * Generation Wrapper Service
 * Wraps orchestrator with middleware support
 * Enables credit checking, moderation, history via middleware pattern
 */

import type {
  GenerationRequest,
  GenerationResult,
  GenerationMiddleware,
  MiddlewareContext,
  MiddlewareResultContext,
} from "../../domain/entities";
import { generationOrchestrator } from "./generation-orchestrator.service";
import type { OrchestratorConfig } from "./generation-orchestrator.service";

export interface WrapperConfig {
  /** Middleware to execute before/after generation */
  middleware?: GenerationMiddleware[];
  /** Orchestrator configuration */
  orchestratorConfig?: OrchestratorConfig;
}

class GenerationWrapperService {
  private middleware: GenerationMiddleware[] = [];
  private orchestratorConfig?: OrchestratorConfig;

  /**
   * Configure wrapper with middleware
   */
  configure(config: WrapperConfig): void {
    this.middleware = config.middleware || [];
    this.orchestratorConfig = config.orchestratorConfig;

    if (this.orchestratorConfig) {
      generationOrchestrator.configure(this.orchestratorConfig);
    }
  }

  /**
   * Add middleware to chain
   */
  use(middleware: GenerationMiddleware): void {
    this.middleware.push(middleware);
  }

  /**
   * Clear all middleware
   */
  clearMiddleware(): void {
    this.middleware = [];
  }

  /**
   * Generate with middleware support
   */
  async generate<T = unknown>(
    request: GenerationRequest,
    userId?: string,
    metadata?: Record<string, unknown>,
  ): Promise<GenerationResult<T>> {
    const startTime = Date.now();

    const context: MiddlewareContext = {
      request,
      userId,
      metadata,
    };

    try {
      await this.executeBeforeHooks(context);

      const result = await generationOrchestrator.generate<T>(request);

      const resultContext: MiddlewareResultContext<T> = {
        ...context,
        result,
      };

      await this.executeAfterHooks(resultContext);

      return result;
    } catch (error) {
      const errorResult: GenerationResult<T> = {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        metadata: {
          model: request.model || "unknown",
          startTime,
          endTime: Date.now(),
          duration: Date.now() - startTime,
        },
      };

      const resultContext: MiddlewareResultContext<T> = {
        ...context,
        result: errorResult,
      };

      await this.executeAfterHooks(resultContext).catch(() => {
        // Silent fail on afterHooks error
      });

      return errorResult;
    }
  }

  /**
   * Execute all beforeGenerate hooks
   */
  private async executeBeforeHooks(
    context: MiddlewareContext,
  ): Promise<void> {
    for (const mw of this.middleware) {
      if (mw.beforeGenerate) {
        await mw.beforeGenerate(context);
      }
    }
  }

  /**
   * Execute all afterGenerate hooks
   */
  private async executeAfterHooks<T>(
    context: MiddlewareResultContext<T>,
  ): Promise<void> {
    for (const mw of this.middleware) {
      if (mw.afterGenerate) {
        await mw.afterGenerate(context);
      }
    }
  }
}

export const generationWrapper = new GenerationWrapperService();

/**
 * Create new wrapper instance
 */
export function createGenerationWrapper(
  config?: WrapperConfig,
): GenerationWrapperService {
  const wrapper = new GenerationWrapperService();
  if (config) {
    wrapper.configure(config);
  }
  return wrapper;
}

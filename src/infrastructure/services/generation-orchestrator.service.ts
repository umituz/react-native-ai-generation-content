/**
 * Generation Orchestrator Service
 * Provider-agnostic AI generation workflow
 */

import type {
  GenerationRequest,
  GenerationResult,
  GenerationProgress,
  PollingConfig,
} from "../../domain/entities";
import { DEFAULT_POLLING_CONFIG } from "../../domain/entities";
import type { IAIProvider, JobStatus } from "../../domain/interfaces";
import { providerRegistry } from "./provider-registry.service";
import {
  classifyError,
  isTransientError,
} from "../utils/error-classifier.util";
import { createPollingDelay } from "../utils/polling-interval.util";
import { createProgressTracker } from "../utils/progress-calculator.util";

declare const __DEV__: boolean;

export interface OrchestratorConfig {
  polling?: Partial<PollingConfig>;
  onStatusUpdate?: (requestId: string, status: string) => Promise<void>;
}

class GenerationOrchestratorService {
  private config: OrchestratorConfig = {};

  configure(config: OrchestratorConfig): void {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      // eslint-disable-next-line no-console
      console.log("[Orchestrator] configure() called", {
        hasPollingConfig: !!config.polling,
        hasStatusUpdate: !!config.onStatusUpdate,
      });
    }
    this.config = { ...this.config, ...config };
  }

  async generate<T = unknown>(
    request: GenerationRequest,
  ): Promise<GenerationResult<T>> {
    const provider = this.getProvider();
    const progressTracker = createProgressTracker();
    const startTime = Date.now();

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      // eslint-disable-next-line no-console
      console.log("[Orchestrator] Generate started:", {
        model: request.model,
        capability: request.capability,
        provider: provider.providerId,
      });
    }

    const updateProgress = (
      stage: GenerationProgress["stage"],
      subProgress = 0,
    ) => {
      const progress = progressTracker.setStatus(stage);
      request.onProgress?.({
        stage,
        progress: progress + subProgress,
      });
    };

    try {
      updateProgress("preparing");

      const submission = await provider.submitJob(request.model, request.input);

      updateProgress("submitting");

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        // eslint-disable-next-line no-console
        console.log("[Orchestrator] Job submitted:", {
          requestId: submission.requestId,
          provider: provider.providerId,
        });
      }

      updateProgress("generating");

      const result = await this.pollForResult<T>(
        provider,
        request.model,
        submission.requestId,
        request.onProgress,
      );

      updateProgress("completed");

      const duration = Date.now() - startTime;

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        // eslint-disable-next-line no-console
        console.log("[Orchestrator] Generate completed:", {
          requestId: submission.requestId,
          duration: `${duration}ms`,
          success: true,
        });
      }

      return {
        success: true,
        data: result,
        requestId: submission.requestId,
        metadata: {
          model: request.model,
          provider: provider.providerId,
          capability: request.capability,
          startTime,
          endTime: Date.now(),
          duration,
        },
      };
    } catch (error) {
      const errorInfo = classifyError(error);

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        // eslint-disable-next-line no-console
        console.error("[Orchestrator] Generation failed:", errorInfo);
      }

      return {
        success: false,
        error: errorInfo.messageKey,
        metadata: {
          model: request.model,
          provider: provider.providerId,
          capability: request.capability,
          startTime,
          endTime: Date.now(),
          duration: Date.now() - startTime,
        },
      };
    }
  }

  private async pollForResult<T>(
    provider: IAIProvider,
    model: string,
    requestId: string,
    onProgress?: (progress: GenerationProgress) => void,
  ): Promise<T> {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      // eslint-disable-next-line no-console
      console.log("[Orchestrator] pollForResult() started", {
        provider: provider.providerId,
        model,
        requestId,
      });
    }

    const config = {
      ...DEFAULT_POLLING_CONFIG,
      ...this.config.polling,
    };

    let consecutiveErrors = 0;

    for (let attempt = 0; attempt < config.maxAttempts; attempt++) {
      await createPollingDelay(attempt, config);

      if (typeof __DEV__ !== "undefined" && __DEV__ && attempt % 5 === 0) {
        // eslint-disable-next-line no-console
        console.log("[Orchestrator] pollForResult() attempt", {
          attempt,
          maxAttempts: config.maxAttempts,
        });
      }

      try {
        const status = await provider.getJobStatus(model, requestId);

        consecutiveErrors = 0;

        this.updateProgressFromStatus(status, attempt, config, onProgress);

        if (status.status === "COMPLETED") {
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            // eslint-disable-next-line no-console
            console.log("[Orchestrator] pollForResult() job COMPLETED", {
              requestId,
              attempt,
            });
          }
          return provider.getJobResult<T>(model, requestId);
        }

        if (status.status === "FAILED") {
          throw new Error("Job failed on provider");
        }

        await this.config.onStatusUpdate?.(requestId, status.status);
      } catch (error) {
        if (isTransientError(error)) {
          consecutiveErrors++;

          if (consecutiveErrors >= config.maxConsecutiveErrors) {
            throw error;
          }

          continue;
        }

        throw error;
      }
    }

    throw new Error(
      `Polling timeout after ${config.maxAttempts} attempts`,
    );
  }

  private updateProgressFromStatus(
    status: JobStatus,
    attempt: number,
    config: PollingConfig,
    onProgress?: (progress: GenerationProgress) => void,
  ): void {
    const baseProgress = 25;
    const maxProgress = 85;
    const range = maxProgress - baseProgress;

    let progress: number;

    if (status.status === "IN_QUEUE") {
      progress = baseProgress + range * 0.2;
    } else if (status.status === "IN_PROGRESS") {
      const ratio = Math.min(attempt / (config.maxAttempts * 0.7), 1);
      progress = baseProgress + range * (0.2 + 0.6 * ratio);
    } else {
      progress = baseProgress;
    }

    onProgress?.({
      stage: "generating",
      progress: Math.round(progress),
      eta: status.eta,
    });
  }

  private getProvider(): IAIProvider {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      // eslint-disable-next-line no-console
      console.log("[Orchestrator] getProvider() called");
    }

    const provider = providerRegistry.getActiveProvider();

    if (!provider) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        // eslint-disable-next-line no-console
        console.error("[Orchestrator] No active provider found!");
      }
      throw new Error(
        "No active AI provider. Register and set a provider first.",
      );
    }

    if (!provider.isInitialized()) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        // eslint-disable-next-line no-console
        console.error("[Orchestrator] Provider not initialized:", provider.providerId);
      }
      throw new Error(
        `Provider ${provider.providerId} is not initialized.`,
      );
    }

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      // eslint-disable-next-line no-console
      console.log("[Orchestrator] getProvider() returning:", {
        providerId: provider.providerId,
        isInitialized: provider.isInitialized(),
      });
    }

    return provider;
  }
}

export const generationOrchestrator = new GenerationOrchestratorService();

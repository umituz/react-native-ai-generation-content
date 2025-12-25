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
import { classifyError } from "../utils/error-classifier.util";
import { ProgressManager } from "./progress-manager";
import { JobPoller, type PollerConfig } from "./job-poller";
import { ProviderValidator } from "./provider-validator";

declare const __DEV__: boolean;

export interface OrchestratorConfig {
  polling?: Partial<PollingConfig>;
  onStatusUpdate?: (requestId: string, status: string) => Promise<void>;
}

class GenerationOrchestratorService {
  private progressManager = new ProgressManager();
  private jobPoller = new JobPoller();
  private providerValidator = new ProviderValidator();

  configure(config: OrchestratorConfig): void {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      // eslint-disable-next-line no-console
      console.log("[Orchestrator] configure() called", {
        hasPollingConfig: !!config.polling,
        hasStatusUpdate: !!config.onStatusUpdate,
      });
    }

    const pollerConfig: PollerConfig = {
      polling: config.polling,
      onStatusUpdate: config.onStatusUpdate,
    };

    this.jobPoller.configure(pollerConfig);
  }

  async generate<T = unknown>(
    request: GenerationRequest,
  ): Promise<GenerationResult<T>> {
    const provider = this.providerValidator.getProvider();
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
      this.progressManager.updateProgress(stage, subProgress, request.onProgress);
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

      const result = await this.jobPoller.pollForResult<T>(
        provider,
        request.model,
        submission.requestId,
        request.onProgress,
        (status, attempt, config) => {
          this.progressManager.updateProgressFromStatus(
            status,
            attempt,
            config,
            request.onProgress,
          );
        },
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
}

export const generationOrchestrator = new GenerationOrchestratorService();

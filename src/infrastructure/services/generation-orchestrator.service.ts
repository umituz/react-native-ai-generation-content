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
import { pollJob } from "./job-poller.service";
import { ProviderValidator } from "./provider-validator";

declare const __DEV__: boolean;

export interface OrchestratorConfig {
  polling?: Partial<PollingConfig>;
  onStatusUpdate?: (requestId: string, status: string) => Promise<void>;
}

class GenerationOrchestratorService {
  private progressManager = new ProgressManager();
  private providerValidator = new ProviderValidator();
  private pollingConfig?: Partial<PollingConfig>;
  private onStatusUpdateCallback?: (requestId: string, status: string) => Promise<void>;

  configure(config: OrchestratorConfig): void {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[Orchestrator] configure() called", {
        hasPollingConfig: !!config.polling,
        hasStatusUpdate: !!config.onStatusUpdate,
      });
    }

    this.pollingConfig = config.polling;
    this.onStatusUpdateCallback = config.onStatusUpdate;
  }

  async generate<T = unknown>(
    request: GenerationRequest,
  ): Promise<GenerationResult<T>> {
    const provider = this.providerValidator.getProvider();
    const startTime = Date.now();

    if (typeof __DEV__ !== "undefined" && __DEV__) {
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
        console.log("[Orchestrator] Job submitted:", {
          requestId: submission.requestId,
          provider: provider.providerId,
        });
      }

      updateProgress("generating");

      const pollResult = await pollJob<T>({
        provider,
        model: request.model,
        requestId: submission.requestId,
        config: this.pollingConfig,
        onStatusChange: async (status) => {
           if (this.onStatusUpdateCallback) {
             await this.onStatusUpdateCallback(submission.requestId, status.status);
           }
        },
        onProgress: (progress: number) => {
           // We map polling progress (0-100) to our "generating" stage progress
           // Since we can't easily access the internal 'status' and 'attempt' here nicely without changing pollJob signature to pass them to onProgress
           // But pollJob onProgress passes a number.
           // The original code used: this.progressManager.updateProgressFromStatus(status, attempt, config...)
           // pollJob calculates progress internally. 
           // We can just use the numeric progress directly for the converting.
           
           // Actually, the original code had access to `status` object inside the callback.
           // pollJob abstracts that away.
           // However, progressManager.updateProgress takes (stage, subProgress).
           // So we can just pass 'generating' and the percentage.
           
           this.progressManager.updateProgress("generating", progress, request.onProgress);
        }
      });

      if (!pollResult.success) {
        throw pollResult.error;
      }

      const result = pollResult.data as T;

      updateProgress("completed");

      const duration = Date.now() - startTime;

      if (typeof __DEV__ !== "undefined" && __DEV__) {
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

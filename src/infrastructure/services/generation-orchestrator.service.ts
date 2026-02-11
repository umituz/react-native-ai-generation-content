/**
 * Generation Orchestrator Service
 * Provider-agnostic AI generation workflow
 * Reports only real status - no fake progress
 */

import type {
  GenerationRequest,
  GenerationResult,
  PollingConfig,
} from "../../domain/entities";
import { classifyError } from "../utils/error-classifier.util";
import { pollJob } from "../../domains/background/infrastructure/services/job-poller.service";
import { ProviderValidator } from "./provider-validator";

declare const __DEV__: boolean;

export interface OrchestratorConfig {
  polling?: Partial<PollingConfig>;
  onStatusUpdate?: (requestId: string, status: string) => Promise<void>;
}

class GenerationOrchestratorService {
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

    try {
      const submission = await provider.submitJob(request.model, request.input);

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[Orchestrator] Job submitted:", {
          requestId: submission.requestId,
          provider: provider.providerId,
        });
      }

      const pollResult = await pollJob<T>({
        provider,
        model: request.model,
        requestId: submission.requestId,
        config: this.pollingConfig,
        signal: request.signal,
        onStatusChange: async (status) => {
          if (this.onStatusUpdateCallback) {
            await this.onStatusUpdateCallback(submission.requestId, status.status);
          }
        },
        onProgress: request.onProgress
          ? (progress: number) => {
              request.onProgress!({
                stage: progress === 100 ? "completed" : "generating",
                progress,
              });
            }
          : undefined,
      });

      if (!pollResult.success) {
        throw pollResult.error ?? new Error("Polling failed");
      }

      const result = pollResult.data as T;
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

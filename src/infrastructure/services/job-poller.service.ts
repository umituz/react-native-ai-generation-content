/**
 * Job Poller Service
 * Provider-agnostic job polling with exponential backoff
 */

import type { IAIProvider } from "../../domain/interfaces"; // eslint-disable-line @typescript-eslint/no-unused-vars
import type { PollingConfig } from "../../domain/entities"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { DEFAULT_POLLING_CONFIG } from "../../domain/entities";
import { calculatePollingInterval } from "../utils/polling-interval.util";
import { checkStatusForErrors, isJobComplete } from "../utils/status-checker.util";
import { validateResult } from "../utils/result-validator.util";
import { isTransientError } from "../utils/error-classifier.util";
import { calculateProgressFromJobStatus } from "../utils/progress-calculator.util";
import type { PollJobOptions, PollJobResult } from "./job-poller.types";
import { createJobPoller } from "./job-poller-factory"; // eslint-disable-line @typescript-eslint/no-unused-vars

// IAIProvider and PollingConfig are used indirectly through provider methods
// createJobPoller is re-exported

declare const __DEV__: boolean;

const MAX_CONSECUTIVE_TRANSIENT_ERRORS = 5;

/**
 * Poll job until completion with exponential backoff
 */
export async function pollJob<T = unknown>(
  options: PollJobOptions,
): Promise<PollJobResult<T>> {
  const {
    provider,
    model,
    requestId,
    config,
    onProgress,
    onStatusChange,
    signal,
  } = options;

  const pollingConfig = { ...DEFAULT_POLLING_CONFIG, ...config };
  const { maxAttempts } = pollingConfig;

  const startTime = Date.now();
  let consecutiveTransientErrors = 0;
  let lastProgress = 0;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    if (signal?.aborted) {
      return {
        success: false,
        error: new Error("Polling aborted"),
        attempts: attempt + 1,
        elapsedMs: Date.now() - startTime,
      };
    }

    if (attempt > 0) {
      const interval = calculatePollingInterval({ attempt, config: pollingConfig });
      await new Promise<void>((resolve) => setTimeout(() => resolve(), interval));
    }

    try {
      const status = await provider.getJobStatus(model, requestId);
      onStatusChange?.(status);

      const statusCheck = checkStatusForErrors(status);

      if (statusCheck.shouldStop && statusCheck.hasError) {
        return {
          success: false,
          error: new Error(statusCheck.errorMessage || "Job failed"),
          attempts: attempt + 1,
          elapsedMs: Date.now() - startTime,
        };
      }

      consecutiveTransientErrors = 0;

      const progress = calculateProgressFromJobStatus(status, attempt, maxAttempts);
      if (progress > lastProgress) {
        lastProgress = progress;
        onProgress?.(progress);
      }

      if (isJobComplete(status)) {
        onProgress?.(90);

        const result = await provider.getJobResult<T>(model, requestId);

        const validation = validateResult(result);
        if (!validation.isValid) {
          return {
            success: false,
            error: new Error(validation.errorMessage || "Invalid result"),
            attempts: attempt + 1,
            elapsedMs: Date.now() - startTime,
          };
        }

        onProgress?.(100);

        return {
          success: true,
          data: result,
          attempts: attempt + 1,
          elapsedMs: Date.now() - startTime,
        };
      }
    } catch (error) {
      if (isTransientError(error)) {
        consecutiveTransientErrors++;

        if (consecutiveTransientErrors >= MAX_CONSECUTIVE_TRANSIENT_ERRORS) {
          return {
            success: false,
            error: error instanceof Error ? error : new Error(String(error)),
            attempts: attempt + 1,
            elapsedMs: Date.now() - startTime,
          };
        }

        if (attempt < maxAttempts - 1) {
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.log(
              `[JobPoller] Transient error, retrying (${attempt + 1}/${maxAttempts})`,
            );
          }
          continue;
        }
      }

      return {
        success: false,
        error: error instanceof Error ? error : new Error(String(error)),
        attempts: attempt + 1,
        elapsedMs: Date.now() - startTime,
      };
    }
  }

  return {
    success: false,
    error: new Error(`Polling timeout after ${maxAttempts} attempts`),
    attempts: maxAttempts,
    elapsedMs: Date.now() - startTime,
  };
}

export { createJobPoller } from "./job-poller-factory";
export type { PollJobOptions, PollJobResult } from "./job-poller.types";

/**
 * Job Poller Service
 * Provider-agnostic job polling with exponential backoff
 * Reports only real status - no fake progress
 */

import { DEFAULT_POLLING_CONFIG } from "../../domain/entities";
import { calculatePollingInterval } from "../utils/polling-interval.util";
import { checkStatusForErrors, isJobComplete } from "../utils/status-checker.util";
import { validateResult } from "../utils/result-validator.util";
import { isTransientError } from "../utils/error-classifier.util";
import type { PollJobOptions, PollJobResult } from "./job-poller.types";

declare const __DEV__: boolean;

/**
 * Poll job until completion with exponential backoff
 * Only reports 100% on actual completion
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
  const { maxAttempts, maxConsecutiveErrors, maxTotalTimeMs } = pollingConfig;

  const startTime = Date.now();
  let consecutiveTransientErrors = 0;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    // Check total time limit
    const elapsedMs = Date.now() - startTime;
    if (maxTotalTimeMs && elapsedMs >= maxTotalTimeMs) {
      return {
        success: false,
        error: new Error(`Polling timeout after ${elapsedMs}ms`),
        attempts: attempt + 1,
        elapsedMs,
      };
    }

    if (signal?.aborted) {
      return {
        success: false,
        error: new Error("Polling aborted"),
        attempts: attempt + 1,
        elapsedMs,
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

      if (isJobComplete(status)) {
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

        if (consecutiveTransientErrors >= maxConsecutiveErrors) {
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

export type { PollJobOptions, PollJobResult } from "./job-poller.types";

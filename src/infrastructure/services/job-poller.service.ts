/**
 * Job Poller Service
 * Provider-agnostic job polling with exponential backoff
 */

import type { IAIProvider, JobStatus } from "../../domain/interfaces";
import type { PollingConfig } from "../../domain/entities";
import { DEFAULT_POLLING_CONFIG } from "../../domain/entities";
import { calculatePollingInterval } from "../utils/polling-interval.util";
import { checkStatusForErrors, isJobComplete } from "../utils/status-checker.util";
import { validateResult } from "../utils/result-validator.util";
import { isTransientError } from "../utils/error-classifier.util";

declare const __DEV__: boolean;

export interface PollJobOptions {
  provider: IAIProvider;
  model: string;
  requestId: string;
  config?: Partial<PollingConfig>;
  onProgress?: (progress: number) => void;
  onStatusChange?: (status: JobStatus) => void;
  signal?: AbortSignal;
}

export interface PollJobResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: Error;
  attempts: number;
  elapsedMs: number;
}

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
    // Check for abort
    if (signal?.aborted) {
      return {
        success: false,
        error: new Error("Polling aborted"),
        attempts: attempt + 1,
        elapsedMs: Date.now() - startTime,
      };
    }

    // Wait for polling interval (skip first attempt)
    if (attempt > 0) {
      const interval = calculatePollingInterval({ attempt, config: pollingConfig });
      await new Promise((resolve) => setTimeout(resolve, interval));
    }

    try {
      // Get job status
      const status = await provider.getJobStatus(model, requestId);
      onStatusChange?.(status);

      // Check for errors in status
      const statusCheck = checkStatusForErrors(status);

      if (statusCheck.shouldStop && statusCheck.hasError) {
        return {
          success: false,
          error: new Error(statusCheck.errorMessage || "Job failed"),
          attempts: attempt + 1,
          elapsedMs: Date.now() - startTime,
        };
      }

      // Reset transient error counter on success
      consecutiveTransientErrors = 0;

      // Update progress
      const progress = calculateProgressFromStatus(status, attempt, maxAttempts);
      if (progress > lastProgress) {
        lastProgress = progress;
        onProgress?.(progress);
      }

      // Check if complete
      if (isJobComplete(status)) {
        onProgress?.(90);

        // Fetch result
        const result = await provider.getJobResult<T>(model, requestId);

        // Validate result
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

        // Too many consecutive transient errors
        if (consecutiveTransientErrors >= MAX_CONSECUTIVE_TRANSIENT_ERRORS) {
          return {
            success: false,
            error: error instanceof Error ? error : new Error(String(error)),
            attempts: attempt + 1,
            elapsedMs: Date.now() - startTime,
          };
        }

        // Continue retrying
        if (attempt < maxAttempts - 1) {
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            // eslint-disable-next-line no-console
            console.log(
              `[JobPoller] Transient error, retrying (${attempt + 1}/${maxAttempts})`,
            );
          }
          continue;
        }
      }

      // Permanent error or max retries reached
      return {
        success: false,
        error: error instanceof Error ? error : new Error(String(error)),
        attempts: attempt + 1,
        elapsedMs: Date.now() - startTime,
      };
    }
  }

  // Max attempts reached
  return {
    success: false,
    error: new Error(`Polling timeout after ${maxAttempts} attempts`),
    attempts: maxAttempts,
    elapsedMs: Date.now() - startTime,
  };
}

/**
 * Calculate progress percentage from job status
 */
function calculateProgressFromStatus(
  status: JobStatus,
  attempt: number,
  maxAttempts: number,
): number {
  const statusString = String(status.status).toUpperCase();

  switch (statusString) {
    case "IN_QUEUE":
      return 30 + Math.min(attempt * 2, 10);
    case "IN_PROGRESS":
      return 50 + Math.min(attempt * 3, 30);
    case "COMPLETED":
      return 90;
    case "FAILED":
      return 0;
    default:
      return 20 + Math.min((attempt / maxAttempts) * 30, 30);
  }
}

/**
 * Create a job poller with preset configuration
 */
export function createJobPoller(defaultConfig?: Partial<PollingConfig>) {
  return {
    poll<T = unknown>(options: Omit<PollJobOptions, "config">) {
      return pollJob<T>({ ...options, config: defaultConfig });
    },
  };
}

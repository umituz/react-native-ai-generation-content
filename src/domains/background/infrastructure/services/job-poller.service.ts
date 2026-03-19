/**
 * Job Poller Service
 * Provider-agnostic job polling with exponential backoff
 */

import type { JobStatus } from "../../../../domain/interfaces/ai-provider.interface";
import type { PollingConfig } from "../../../../domain/entities/polling.types";
import type { PollJobOptions, PollJobResult } from "./job-poller.types";
import { withAbortSignal, validateRequestId, validateModel, logTransientError, logMaxConsecutiveErrors } from "./job-poller-utils";
import { checkStatusForErrors, isJobComplete } from "../utils/status-checker.util";
import { validateResult } from "../utils/result-validator.util";

/**
 * Default polling configuration
 */
const DEFAULT_CONFIG: Partial<PollingConfig> = {
  maxAttempts: 40,
  initialIntervalMs: 1500,
  maxIntervalMs: 5000,
  backoffMultiplier: 1.3,
  maxConsecutiveErrors: 5,
};

/**
 * Poll a job until completion or timeout
 */
export async function pollJob<T = unknown>(
  options: PollJobOptions
): Promise<PollJobResult<T>> {
  const {
    provider,
    model,
    requestId,
    config = DEFAULT_CONFIG,
    onProgress,
    onStatusChange,
    signal,
  } = options;

  // Validate inputs
  const requestIdValidation = validateRequestId(requestId);
  if (!requestIdValidation.valid) {
    return {
      success: false,
      error: new Error(requestIdValidation.error!),
      attempts: 0,
      elapsedMs: 0,
    };
  }

  const modelValidation = validateModel(model);
  if (!modelValidation.valid) {
    return {
      success: false,
      error: new Error(modelValidation.error!),
      attempts: 0,
      elapsedMs: 0,
    };
  }

  const startTime = Date.now();
  let currentInterval = config.initialIntervalMs || DEFAULT_CONFIG.initialIntervalMs!;
  const maxInterval = config.maxIntervalMs || DEFAULT_CONFIG.maxIntervalMs!;
  const maxAttempts = config.maxAttempts || DEFAULT_CONFIG.maxAttempts!;
  const backoffMultiplier = config.backoffMultiplier || DEFAULT_CONFIG.backoffMultiplier!;
  const maxConsecutiveErrors = config.maxConsecutiveErrors || DEFAULT_CONFIG.maxConsecutiveErrors!;

  let consecutiveErrors = 0;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    // Check for abort signal
    if (signal?.aborted) {
      return {
        success: false,
        error: new Error("Operation aborted"),
        attempts: attempt + 1,
        elapsedMs: Date.now() - startTime,
      };
    }

    try {
      // Check job status
      const statusResult = await withAbortSignal(
        provider.checkStatus(requestId, model),
        signal,
        config.maxTotalTimeMs ? config.maxTotalTimeMs - (Date.now() - startTime) : undefined
      );

      // Notify status change
      if (onStatusChange && typeof statusResult === 'object' && 'status' in statusResult) {
        onStatusChange(statusResult as JobStatus);
      }

      // Check for errors in status
      const statusError = checkStatusForErrors(statusResult as JobStatus | Record<string, unknown>);
      if (statusError) {
        return {
          success: false,
          error: statusError,
          attempts: attempt + 1,
          elapsedMs: Date.now() - startTime,
        };
      }

      // Reset consecutive errors on success
      consecutiveErrors = 0;

      // Check if job is complete
      if (isJobComplete(statusResult as JobStatus | Record<string, unknown>)) {
        // Validate result
        const validationResult = validateResult(statusResult);
        if (!validationResult.isValid) {
          return {
            success: false,
            error: new Error(validationResult.errorMessage || "Result validation failed"),
            attempts: attempt + 1,
            elapsedMs: Date.now() - startTime,
          };
        }

        // Report progress
        onProgress?.(100);

        // Extract result data if available
        let data: T | undefined = undefined;
        if (typeof statusResult === 'object' && statusResult !== null && 'result' in statusResult) {
          data = statusResult.result as T;
        } else {
          data = statusResult as T;
        }

        return {
          success: true,
          data,
          attempts: attempt + 1,
          elapsedMs: Date.now() - startTime,
        };
      }

      // Report progress based on attempt number
      const progress = Math.min((attempt / maxAttempts) * 100, 90);
      onProgress?.(progress);

    } catch (error) {
      consecutiveErrors++;
      logTransientError(attempt, requestId, model, consecutiveErrors, error);

      // Check if we've hit max consecutive errors
      if (consecutiveErrors >= maxConsecutiveErrors) {
        logMaxConsecutiveErrors(maxConsecutiveErrors, requestId, model);
        return {
          success: false,
          error: error instanceof Error ? error : new Error(String(error)),
          attempts: attempt + 1,
          elapsedMs: Date.now() - startTime,
        };
      }
    }

    // Wait before next attempt with exponential backoff
    await withAbortSignal(
      new Promise(resolve => setTimeout(resolve, currentInterval)),
      signal
    );

    // Increase interval for next attempt (exponential backoff)
    currentInterval = Math.min(currentInterval * backoffMultiplier, maxInterval);
  }

  // Max attempts reached
  return {
    success: false,
    error: new Error(`Job did not complete after ${maxAttempts} attempts`),
    attempts: maxAttempts,
    elapsedMs: Date.now() - startTime,
  };
}

export type { PollJobOptions, PollJobResult } from './job-poller.types';

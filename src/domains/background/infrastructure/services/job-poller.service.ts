/**
 * Job Poller Service
 * Provider-agnostic job polling with exponential backoff
 * Reports only real status - no fake progress
 */

import { DEFAULT_POLLING_CONFIG } from "../../../../domain/entities/polling.types";
import { calculatePollingInterval } from "../utils/polling-interval.util";
import { checkStatusForErrors, isJobComplete } from "../utils/status-checker.util";
import { validateResult } from "../utils/result-validator.util";
import type { PollJobOptions, PollJobResult } from "./job-poller.types";


/**
 * Wraps a promise with abort signal support
 * Rejects if signal is aborted before promise resolves
 */
function withAbortSignal<T>(
  promise: Promise<T>,
  signal: AbortSignal | undefined,
  timeoutMs?: number,
): Promise<T> {
  if (!signal && !timeoutMs) {
    return promise;
  }

  return new Promise<T>((resolve, reject) => {
    // Handle abort signal
    if (signal?.aborted) {
      reject(new Error("Operation aborted"));
      return;
    }

    const abortHandler = () => {
      reject(new Error("Operation aborted"));
    };

    signal?.addEventListener("abort", abortHandler, { once: true });

    // Handle timeout
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    if (timeoutMs) {
      timeoutId = setTimeout(() => {
        reject(new Error(`Operation timeout after ${timeoutMs}ms`));
      }, timeoutMs);
    }

    promise
      .then((result) => {
        signal?.removeEventListener("abort", abortHandler);
        if (timeoutId) clearTimeout(timeoutId);
        resolve(result);
      })
      .catch((error) => {
        signal?.removeEventListener("abort", abortHandler);
        if (timeoutId) clearTimeout(timeoutId);
        reject(error);
      });
  });
}

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

  // Validate requestId early
  if (!requestId || typeof requestId !== "string" || requestId.trim() === "") {
    return {
      success: false,
      error: new Error("Invalid requestId provided"),
      attempts: 0,
      elapsedMs: 0,
    };
  }

  // Validate model early
  if (!model || typeof model !== "string" || model.trim() === "") {
    return {
      success: false,
      error: new Error("Invalid model provided"),
      attempts: 0,
      elapsedMs: 0,
    };
  }

  const pollingConfig = { ...DEFAULT_POLLING_CONFIG, ...config };
  const { maxAttempts, maxTotalTimeMs, maxConsecutiveErrors } = pollingConfig;

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
      // Wrap provider calls with abort signal support and timeout (30s default)
      const status = await withAbortSignal(
        provider.getJobStatus(model, requestId),
        signal,
        30000,
      );
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
        // Wrap result retrieval with abort signal support and timeout (60s for larger results)
        const result = await withAbortSignal(
          provider.getJobResult<T>(model, requestId),
          signal,
          60000,
        );

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
      consecutiveTransientErrors++;

      if (__DEV__) {
        console.warn("[JobPoller] Transient error during polling", {
          attempt: attempt + 1,
          requestId,
          model,
          consecutiveErrors: consecutiveTransientErrors,
          error: error instanceof Error ? error.message : String(error),
          code: (error as { code?: string })?.code,
        });
      }

      // Check if we've hit max consecutive transient errors
      if (maxConsecutiveErrors && consecutiveTransientErrors >= maxConsecutiveErrors) {
        if (__DEV__) {
          console.error("[JobPoller] Max consecutive errors reached", {
            maxConsecutiveErrors,
            requestId,
            model,
          });
        }
        return {
          success: false,
          error: new Error(`Too many consecutive errors (${consecutiveTransientErrors})`),
          attempts: attempt + 1,
          elapsedMs: Date.now() - startTime,
        };
      }

      // Continue polling on transient errors
      continue;
    }
  }

  return {
    success: false,
    error: new Error(`Polling timeout after ${maxAttempts} attempts`),
    attempts: maxAttempts,
    elapsedMs: Date.now() - startTime,
  };
}


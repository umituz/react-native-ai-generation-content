/**
 * Processing Jobs Poller - Logger
 * Logging utilities for job polling
 */

/**
 * Log status check
 */
export function logStatusCheck(creationId: string): void {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[ProcessingJobsPoller] Checking status:", creationId);
  }
}

/**
 * Log status result
 */
export function logStatusResult(creationId: string, status: string): void {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[ProcessingJobsPoller] Status:", creationId, status);
  }
}

/**
 * Log completed job
 */
export function logJobCompleted(creationId: string, urls: unknown): void {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[ProcessingJobsPoller] Completed:", creationId, urls);
  }
}

/**
 * Log no valid URI error
 */
export function logNoValidUri(creationId: string): void {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.error("[ProcessingJobsPoller] No valid URI in result:", creationId);
  }
}

/**
 * Log failed job
 */
export function logJobFailed(creationId: string): void {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[ProcessingJobsPoller] Failed:", creationId);
  }
}

/**
 * Log poll error
 */
export function logPollError(creationId: string, error: unknown): void {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.error("[ProcessingJobsPoller] Poll error:", creationId, error);
  }
}

/**
 * Log orphan job timeout
 */
export function logOrphanTimeout(creationId: string): void {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[ProcessingJobsPoller] Orphan job timed out, marking as failed:", creationId);
  }
}

/**
 * Log failed to clean up orphans
 */
export function logCleanupOrphansFailed(error: unknown): void {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.error("[ProcessingJobsPoller] Failed to clean up orphan jobs:", error);
  }
}

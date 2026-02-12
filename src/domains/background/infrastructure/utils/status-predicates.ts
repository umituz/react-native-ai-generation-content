/**
 * Status Predicates
 * Infrastructure: Check job status states
 */

import type { JobStatus } from "../../../../domain/interfaces/ai-provider.interface";

/**
 * Extract status string from JobStatus or string
 */
function getStatusString(status: JobStatus | string): string {
  return typeof status === "string"
    ? status.toUpperCase()
    : String(status?.status || "").toUpperCase();
}

/**
 * Check if status indicates job is complete
 */
export function isJobComplete(status: JobStatus | string): boolean {
  return getStatusString(status) === "COMPLETED";
}

/**
 * Check if status indicates job is still processing
 */
export function isJobProcessing(status: JobStatus | string): boolean {
  const statusString = getStatusString(status);
  return statusString === "IN_QUEUE" || statusString === "IN_PROGRESS";
}

/**
 * Check if status indicates job has failed
 */
export function isJobFailed(status: JobStatus | string): boolean {
  return getStatusString(status) === "FAILED";
}

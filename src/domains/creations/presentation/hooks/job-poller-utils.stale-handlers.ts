/**
 * Processing Jobs Poller - Stale Job Handlers
 * Functions for handling stale jobs
 */

import type { Creation } from "../../domain/entities/Creation";
import type { ICreationsRepository } from "../../domain/repositories/ICreationsRepository";
import { CREATION_STATUS } from "../../../../domain/constants/queue-status.constants";
import { DEFAULT_MAX_POLL_TIME_MS } from "../../../../infrastructure/constants/polling.constants";
import { isOlderThan, calculateAgeMs } from "../../../../shared/utils/calculations/time-calculations";

/**
 * Check if job is stale (older than max poll time)
 */
export function isJobStale(creation: Creation): boolean {
  return isOlderThan(creation.createdAt, DEFAULT_MAX_POLL_TIME_MS);
}

/**
 * Log stale job detection
 */
export function logStaleJob(creationId: string): void {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[ProcessingJobsPoller] Stale job detected, marking as failed:", creationId, {
      ageMs: calculateAgeMs(creationId ? new Date() : new Date()),
    });
  }
}

/**
 * Log failed to mark stale job
 */
export function logMarkStaleFailed(error: unknown): void {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.error("[ProcessingJobsPoller] Failed to mark stale job:", error);
  }
}

/**
 * Mark stale job as failed
 */
export async function markJobAsFailed(
  repository: ICreationsRepository,
  userId: string,
  creation: Creation
): Promise<void> {
  await repository.update(userId, creation.id, {
    status: CREATION_STATUS.FAILED,
    metadata: { ...creation.metadata, error: "Generation timed out" },
    completedAt: new Date(),
  });
}

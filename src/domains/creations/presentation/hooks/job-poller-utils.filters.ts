/**
 * Processing Jobs Poller - Filters
 * Filter functions for processing jobs
 */

import type { Creation } from "../../domain/entities/Creation";
import { CREATION_STATUS } from "../../../../domain/constants/queue-status.constants";

/**
 * Filter processing jobs with valid IDs
 */
export function getProcessingJobIds(creations: Creation[]): string[] {
  return creations
    .filter((c) => c.status === CREATION_STATUS.PROCESSING && c.requestId && c.model)
    .map((c) => c.id);
}

/**
 * Filter processing jobs with valid IDs
 */
export function getProcessingJobs(creations: Creation[]): Creation[] {
  return creations.filter(
    (c) => c.status === CREATION_STATUS.PROCESSING && c.requestId && c.model,
  );
}

/**
 * Filter orphan jobs (processing but no requestId/model)
 */
export function getOrphanJobs(creations: Creation[]): Creation[] {
  return creations.filter(
    (c) => c.status === CREATION_STATUS.PROCESSING && !c.requestId && !c.model,
  );
}

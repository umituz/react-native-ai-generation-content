/**
 * Progress Calculator Utility
 * Maps provider status to generation status
 * Only reports real status - no fake progress calculations
 */

import type { GenerationStatus } from "../../domain/entities";
import type { AIJobStatusType } from "../../domain/interfaces/ai-provider.interface";

/**
 * Maps provider job status to generation status
 * Provider: IN_QUEUE, IN_PROGRESS, COMPLETED, FAILED
 * Generation: idle, preparing, submitting, generating, completed, failed
 */
export function mapJobStatusToGenerationStatus(
  jobStatus: AIJobStatusType,
): GenerationStatus {
  const statusMap: Record<AIJobStatusType, GenerationStatus> = {
    IN_QUEUE: "submitting",
    IN_PROGRESS: "generating",
    COMPLETED: "completed",
    FAILED: "failed",
  };
  return statusMap[jobStatus] ?? "generating";
}

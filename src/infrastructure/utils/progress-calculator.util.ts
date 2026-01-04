/**
 * Progress Calculator Utility
 * Calculates progress based on generation stage
 * Maps provider status to generation progress
 */

import type { GenerationStatus } from "../../domain/entities";
import {
  DEFAULT_PROGRESS_STAGES,
  type ProgressStageConfig,
} from "../../domain/entities";
import type { AIJobStatusType } from "../../domain/interfaces/ai-provider.interface";

export interface ProgressOptions {
  status: GenerationStatus;
  stages?: ProgressStageConfig[];
  subProgress?: number;
}

export function getProgressForStatus(options: ProgressOptions): number {
  const { status, stages = DEFAULT_PROGRESS_STAGES, subProgress = 0 } = options;

  const stage = stages.find((s) => s.status === status);

  if (!stage) {
    return 0;
  }

  const range = stage.maxProgress - stage.minProgress;
  const adjustedProgress = stage.minProgress + range * (subProgress / 100);

  return Math.round(adjustedProgress);
}

export function interpolateProgress(
  startTime: number,
  estimatedDurationMs: number,
  minProgress: number,
  maxProgress: number,
): number {
  const elapsed = Date.now() - startTime;
  const ratio = Math.min(elapsed / estimatedDurationMs, 1);

  const eased = 1 - Math.pow(1 - ratio, 2);

  const progress = minProgress + (maxProgress - minProgress) * eased;
  return Math.round(progress);
}

/**
 * Calculate progress for polling-based operations
 * Returns a rounded integer between minProgress and maxProgress
 *
 * @param currentAttempt - Current polling attempt (1-based)
 * @param maxAttempts - Maximum number of polling attempts
 * @param minProgress - Starting progress percentage (default: 10)
 * @param maxProgress - Maximum progress percentage before completion (default: 95)
 * @returns Rounded progress percentage
 */
export function calculatePollingProgress(
  currentAttempt: number,
  maxAttempts: number,
  minProgress: number = 10,
  maxProgress: number = 95,
): number {
  const ratio = currentAttempt / maxAttempts;
  const progress = minProgress + ratio * (maxProgress - minProgress);
  return Math.round(Math.min(maxProgress, progress));
}

export function createProgressTracker(stages?: ProgressStageConfig[]) {
  const effectiveStages = stages ?? DEFAULT_PROGRESS_STAGES;
  let currentStatus: GenerationStatus = "idle";
  let stageStartTime = Date.now();

  return {
    setStatus(status: GenerationStatus): number {
      currentStatus = status;
      stageStartTime = Date.now();
      return getProgressForStatus({ status, stages: effectiveStages });
    },

    getProgress(subProgress = 0): number {
      return getProgressForStatus({
        status: currentStatus,
        stages: effectiveStages,
        subProgress,
      });
    },

    getCurrentStatus(): GenerationStatus {
      return currentStatus;
    },

    getElapsedTime(): number {
      return Date.now() - stageStartTime;
    },
  };
}

/**
 * Maps provider job status to generation status
 * Provider: IN_QUEUE, IN_PROGRESS, COMPLETED, FAILED
 * Generation: idle, preparing, submitting, generating, polling, finalizing, completed, failed
 */
export function mapJobStatusToGenerationStatus(
  jobStatus: AIJobStatusType
): GenerationStatus {
  const statusMap: Record<AIJobStatusType, GenerationStatus> = {
    IN_QUEUE: "submitting",
    IN_PROGRESS: "generating",
    COMPLETED: "completed",
    FAILED: "failed",
  };
  return statusMap[jobStatus] ?? "generating";
}

/**
 * Calculate progress from provider job status
 * Uses default progress stages for consistent progress reporting
 */
export function getProgressFromJobStatus(
  jobStatus: AIJobStatusType,
  stages: ProgressStageConfig[] = DEFAULT_PROGRESS_STAGES
): number {
  const generationStatus = mapJobStatusToGenerationStatus(jobStatus);
  return getProgressForStatus({ status: generationStatus, stages });
}

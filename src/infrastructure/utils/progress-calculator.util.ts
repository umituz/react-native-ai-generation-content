/**
 * Progress Calculator Utility
 * Calculates progress based on generation stage
 */

import type { GenerationStatus } from "../../domain/entities";
import {
  DEFAULT_PROGRESS_STAGES,
  type ProgressStageConfig,
} from "../../domain/entities";

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

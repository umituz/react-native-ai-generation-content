/**
 * Progress Types
 * Progress tracking for generation stages
 */

import type { GenerationStatus } from "./generation.types";

export interface ProgressStageConfig {
  status: GenerationStatus;
  minProgress: number;
  maxProgress: number;
  weight: number;
}

export const DEFAULT_PROGRESS_STAGES: ProgressStageConfig[] = [
  { status: "preparing", minProgress: 0, maxProgress: 5, weight: 1 },
  { status: "moderating", minProgress: 5, maxProgress: 15, weight: 1 },
  { status: "submitting", minProgress: 15, maxProgress: 25, weight: 1 },
  { status: "generating", minProgress: 25, maxProgress: 85, weight: 6 },
  { status: "finalizing", minProgress: 85, maxProgress: 95, weight: 1 },
  { status: "completed", minProgress: 95, maxProgress: 100, weight: 1 },
];

export interface ProgressConfig {
  stages: ProgressStageConfig[];
  estimatedDurations?: Record<string, number>;
}

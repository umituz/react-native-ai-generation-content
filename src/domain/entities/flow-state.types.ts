/**
 * Flow State Types
 */

import type { FlowUploadedImageData } from "./flow-config-data.types";

/** Flow Generation Status - subset of GenerationStatus */
export type FlowGenerationStatus = Extract<
  import("./generation.types").GenerationStatus,
  "idle" | "preparing" | "generating" | "completed" | "failed"
>;

/** Flow State */
export interface FlowState {
  readonly currentStepId: string;
  readonly currentStepIndex: number;
  readonly completedSteps: readonly string[];
  readonly selectedCategory?: unknown;
  readonly selectedScenario?: unknown;
  readonly partners: Record<string, FlowUploadedImageData | undefined>;
  readonly partnerNames: Record<string, string>;
  readonly textInput?: string;
  readonly visualStyle?: string;
  readonly selectedFeatures: Record<string, readonly string[]>;
  readonly customData: Record<string, unknown>;
  readonly generationStatus: FlowGenerationStatus;
  readonly generationProgress: number;
  readonly generationResult?: unknown;
  readonly generationError?: string;
}

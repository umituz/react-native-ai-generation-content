/**
 * Video Generation Executor
 * Handles the actual video generation execution.
 * Model-agnostic: uses VideoModelConfig.buildInput() for model-specific parameters.
 * Fallback: generic input builder when no modelConfig is provided.
 */

export { executeVideoGeneration } from "./video-generation-executor";
export { submitVideoGenerationToQueue } from "./video-generation-submission";
export { buildGenericInput } from "./video-generation-input-builder";
export type { ExecutionResult, SubmissionResult } from "./video-generation-result-types";

/**
 * Video Generation Executor
 * Handles the actual video generation execution.
 * Model-agnostic: uses VideoModelConfig.buildInput() for model-specific parameters.
 * Fallback: generic input builder when no modelConfig is provided.
 */

export { executeVideoGeneration, submitVideoGenerationToQueue, buildGenericInput } from "./video-generation-executor-index";
export type { ExecutionResult, SubmissionResult } from "./video-generation-executor-index";

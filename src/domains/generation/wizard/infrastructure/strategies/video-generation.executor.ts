/**
 * Video Generation Executor
 * Handles the actual video generation execution.
 * Model-agnostic: uses VideoModelConfig.buildInput() for model-specific parameters.
 */

export { executeVideoGeneration, submitVideoGenerationToQueue, buildGenericInput } from "./video-generation-executor-index";
export type { ExecutionResult, SubmissionResult } from "./video-generation-executor-index";

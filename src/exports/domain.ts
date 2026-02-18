/**
 * Domain Layer Exports
 * Core types, entities, and interfaces
 */

// Result Type Pattern - Functional error handling
export type { Result, Success, Failure } from "../domain/types";
export {
  success, failure, isSuccess, isFailure, mapResult, andThen, unwrap, unwrapOr,
} from "../domain/types";

// Interfaces
export type {
  AIProviderConfig, IAIProvider, JobSubmission, JobStatus, AIJobStatusType, AILogEntry,
  SubscribeOptions, RunOptions, ImageFeatureType, VideoFeatureType, ImageFeatureInputData,
  VideoFeatureInputData, ProviderCapabilities, ProviderProgressInfo, INetworkService,
  ICreditService, IPaywallService, IAuthService, IAnalyticsService, IAppServices, PartialAppServices,
  IFeatureUtils,
} from "../domain/interfaces";

// Entities
export { AIErrorType } from "../domain/entities";
export type {
  AIErrorInfo, AIErrorMessages, GenerationCapability, GenerationStatus, GenerationMetadata,
  GenerationResult, GenerationProgress, GenerationRequest, PollingConfig, PollingState,
  PollingOptions, BackgroundJobStatus, BackgroundJob, AddJobInput, UpdateJobInput,
  JobExecutorConfig, BackgroundQueueConfig, GenerationMode,
} from "../domain/entities";
export { DEFAULT_POLLING_CONFIG, DEFAULT_QUEUE_CONFIG } from "../domain/entities";

// Queue & Creation Status — canonical values used across all apps
export { QUEUE_STATUS, CREATION_STATUS } from "../domain/constants/queue-status.constants";
export type { QueueStatus } from "../domain/constants/queue-status.constants";

// Processing Modes
export type { ImageProcessingMode, ModeConfig, ModeCatalog } from "../domain/entities/processing-modes.types";
export {
  DEFAULT_PROCESSING_MODES, getModeConfig, getFreeModes, getPremiumModes, getPromptRequiredModes,
} from "../domain/constants/processing-modes.constants";

// Access Control
export { useAIFeatureGate } from "../domains/access-control";
export type {
  AIFeatureGateOptions,
  AIFeatureGateReturn,
  AIFeatureGateHook,
} from "../domains/access-control";

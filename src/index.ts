/**
 * @umituz/react-native-ai-generation-content
 * Provider-agnostic AI generation orchestration
 *
 * Usage:
 *   import {
 *     providerRegistry,
 *     generationOrchestrator,
 *     useGeneration,
 *   } from '@umituz/react-native-ai-generation-content';
 */

// =============================================================================
// DOMAIN LAYER - Types & Interfaces
// =============================================================================

export type {
  AIProviderConfig,
  IAIProvider,
  JobSubmission,
  JobStatus,
  AIJobStatusType,
  AILogEntry,
  SubscribeOptions,
} from "./domain/interfaces";

export {
  AIErrorType,
} from "./domain/entities";

export type {
  AIErrorInfo,
  AIErrorMessages,
  GenerationCapability,
  GenerationStatus,
  GenerationMetadata,
  GenerationResult,
  GenerationProgress,
  GenerationRequest,
  PollingConfig,
  PollingState,
  PollingOptions,
  ProgressStageConfig,
  ProgressConfig,
  MiddlewareContext,
  MiddlewareResultContext,
  BeforeGenerateHook,
  AfterGenerateHook,
  GenerationMiddleware,
  MiddlewareChain,
  // Background Job Types
  BackgroundJobStatus,
  BackgroundJob,
  AddJobInput,
  UpdateJobInput,
  JobExecutorConfig,
  BackgroundQueueConfig,
  GenerationMode,
} from "./domain/entities";

export { DEFAULT_POLLING_CONFIG, DEFAULT_PROGRESS_STAGES, DEFAULT_QUEUE_CONFIG } from "./domain/entities";

// =============================================================================
// INFRASTRUCTURE LAYER - Services
// =============================================================================

export {
  providerRegistry,
  generationOrchestrator,
  pollJob,
  createJobPoller,
  generationWrapper,
  createGenerationWrapper,
} from "./infrastructure/services";

export type {
  OrchestratorConfig,
  PollJobOptions,
  PollJobResult,
  WrapperConfig,
} from "./infrastructure/services";

// =============================================================================
// INFRASTRUCTURE LAYER - Middleware Factories
// =============================================================================

export {
  createCreditCheckMiddleware,
  createHistoryTrackingMiddleware,
} from "./infrastructure/middleware";

export type {
  CreditCheckConfig,
  HistoryConfig,
  HistoryEntry,
} from "./infrastructure/middleware";

// =============================================================================
// INFRASTRUCTURE LAYER - Utils
// =============================================================================

export {
  // Error classification
  classifyError,
  isTransientError,
  isPermanentError,
  // Polling
  calculatePollingInterval,
  createPollingDelay,
  // Progress
  getProgressForStatus,
  interpolateProgress,
  createProgressTracker,
  // Status checking
  checkStatusForErrors,
  isJobComplete,
  isJobProcessing,
  isJobFailed,
  // Result validation
  validateResult,
  extractOutputUrl,
  extractOutputUrls,
  // Photo generation utils
  cleanBase64,
  addBase64Prefix,
  preparePhoto,
  preparePhotos,
  isValidBase64,
  getBase64Size,
  getBase64SizeMB,
} from "./infrastructure/utils";

export type {
  IntervalOptions,
  ProgressOptions,
  StatusCheckResult,
  ResultValidation,
  ValidateResultOptions,
  PhotoInput,
  PreparedImage,
} from "./infrastructure/utils";

// =============================================================================
// INFRASTRUCTURE LAYER - Wrappers
// =============================================================================

export {
  enhancePromptWithLanguage,
  getSupportedLanguages,
  getLanguageName,
  ModerationWrapper,
  generateSynchronously,
} from "./infrastructure/wrappers";

export type {
  ModerationResult,
  ModerationConfig,
  SynchronousGenerationInput,
  SynchronousGenerationConfig,
} from "./infrastructure/wrappers";

// =============================================================================
// PRESENTATION LAYER - Hooks
// =============================================================================

export {
  useGeneration,
  usePendingJobs,
  useBackgroundGeneration,
  usePhotoGeneration,
} from "./presentation/hooks";

export type {
  UseGenerationOptions,
  UseGenerationReturn,
  UsePendingJobsOptions,
  UsePendingJobsReturn,
  UseBackgroundGenerationOptions,
  UseBackgroundGenerationReturn,
  DirectExecutionResult,
  UsePhotoGenerationReturn,
  PhotoGenerationInput,
  PhotoGenerationResult,
  PhotoGenerationError,
  PhotoGenerationConfig,
  PhotoGenerationState,
  PhotoGenerationStatus,
} from "./presentation/hooks";

// =============================================================================
// PRESENTATION LAYER - Components
// =============================================================================

export {
  GenerationProgressModal,
  GenerationProgressContent,
  GenerationProgressBar,
  PendingJobCard,
  PendingJobProgressBar,
  PendingJobCardActions,
  GenerationResultContent,
  ResultHeader,
  ResultImageCard,
  ResultStoryCard,
  ResultActions,
} from "./presentation/components";

export type {
  GenerationProgressModalProps,
  GenerationProgressRenderProps,
  GenerationProgressContentProps,
  GenerationProgressBarProps,
  PendingJobCardProps,
  StatusLabels,
  PendingJobProgressBarProps,
  PendingJobCardActionsProps,
  GenerationResultData,
  GenerationResultContentProps,
  ResultHeaderProps,
  ResultImageCardProps,
  ResultStoryCardProps,
  ResultActionsProps,
} from "./presentation/components";

// =============================================================================
// DOMAINS - AI Prompts
// =============================================================================

export * from "./domains/prompts";

// =============================================================================
// DOMAINS - Content Moderation
// =============================================================================

export * from "./domains/content-moderation";

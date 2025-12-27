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

// eslint-disable-next-line no-console
if (typeof __DEV__ !== "undefined" && __DEV__) console.log("📍 [LIFECYCLE] @umituz/react-native-ai-generation-content/index.ts - Module loading");

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
// DOMAIN LAYER - Processing Modes
// =============================================================================

export type {
  ImageProcessingMode,
  ModeConfig,
  ModeCatalog,
} from "./domain/entities/processing-modes.types";

export {
  DEFAULT_PROCESSING_MODES,
  getModeConfig,
  getFreeModes,
  getPremiumModes,
  getPromptRequiredModes,
} from "./domain/constants/processing-modes.constants";

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
  useGenerationFlow,
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
  UseGenerationFlowOptions,
  UseGenerationFlowReturn,
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
  DEFAULT_RESULT_CONFIG,
  PhotoStep,
  // Image Picker
  ImagePickerBox,
  DualImagePicker,
  // Buttons
  GenerateButton,
  // Display
  ResultDisplay,
  ErrorDisplay,
  // Headers
  FeatureHeader,
  // Photo Upload
  PhotoUploadCard,
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
  ResultConfig,
  ResultHeaderConfig,
  ResultImageConfig,
  ResultStoryConfig,
  ResultActionsConfig,
  ResultLayoutConfig,
  ResultActionButton,
  PhotoStepProps,
  // Image Picker
  ImagePickerBoxProps,
  DualImagePickerProps,
  // Buttons
  GenerateButtonProps,
  // Display
  ResultDisplayProps,
  ResultDisplayAction,
  ErrorDisplayProps,
  // Headers
  FeatureHeaderProps,
  // Photo Upload
  PhotoUploadCardProps,
  PhotoUploadCardConfig,
} from "./presentation/components";

// =============================================================================
// PRESENTATION LAYER - Flow Configuration
// =============================================================================

export {
  DEFAULT_SINGLE_PHOTO_FLOW,
  DEFAULT_DUAL_PHOTO_FLOW,
} from "./presentation/types/flow-config.types";

export type {
  PhotoStepConfig,
  TextInputStepConfig,
  PreviewStepConfig,
  GenerationFlowConfig,
  PhotoStepData,
  TextInputStepData,
  GenerationFlowState,
} from "./presentation/types/flow-config.types";

// =============================================================================
// DOMAINS - AI Prompts
// =============================================================================

export * from "./domains/prompts";

// =============================================================================
// DOMAINS - Content Moderation
// =============================================================================

export * from "./domains/content-moderation";

// =============================================================================
// DOMAINS - Creations
// =============================================================================

export * from "./domains/creations";

// =============================================================================
// DOMAINS - Face Detection
// =============================================================================

export * from "./domains/face-detection";

// =============================================================================
// FEATURES - Background
// =============================================================================

export * from "./features/replace-background";

// =============================================================================
// FEATURES - Upscaling
// =============================================================================

export * from "./features/upscaling";

// =============================================================================
// FEATURES - Photo Restoration
// =============================================================================

export * from "./features/photo-restoration";

// =============================================================================
// FEATURES - AI Hug
// =============================================================================

export * from "./features/ai-hug";

// =============================================================================
// FEATURES - AI Kiss
// =============================================================================

export * from "./features/ai-kiss";

// =============================================================================
// FEATURES - Face Swap
// =============================================================================

export * from "./features/face-swap";

// =============================================================================
// FEATURES - Anime Selfie
// =============================================================================

export * from "./features/anime-selfie";

// =============================================================================
// FEATURES - Remove Background
// =============================================================================

export * from "./features/remove-background";

// =============================================================================
// FEATURES - Remove Object
// =============================================================================

export * from "./features/remove-object";

// =============================================================================
// FEATURES - Text-to-Video
// =============================================================================

export * from "./features/text-to-video";

// =============================================================================
// FEATURES - Text-to-Image
// =============================================================================

export * from "./features/text-to-image";

// =============================================================================
// FEATURES - Image-to-Video
// =============================================================================

export * from "./features/image-to-video";

// =============================================================================
// FEATURES - Text-to-Voice
// =============================================================================

export * from "./features/text-to-voice";

// =============================================================================
// FEATURES - HD Touch Up
// =============================================================================

export * from "./features/hd-touch-up";


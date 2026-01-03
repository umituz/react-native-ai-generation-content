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
  RunOptions,
  ImageFeatureType,
  VideoFeatureType,
  ImageFeatureInputData,
  VideoFeatureInputData,
  // App Services Interfaces
  INetworkService,
  ICreditService,
  IPaywallService,
  IAuthService,
  IAnalyticsService,
  IAppServices,
  PartialAppServices,
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
// INFRASTRUCTURE LAYER - App Services Configuration
// =============================================================================

export {
  configureAppServices,
  updateAppServices,
  getAppServices,
  isAppServicesConfigured,
  resetAppServices,
  getNetworkService,
  getCreditService,
  getPaywallService,
  getAuthService,
  getAnalyticsService,
} from "./infrastructure/config";

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
  executeImageFeature,
  hasImageFeatureSupport,
  executeVideoFeature,
  hasVideoFeatureSupport,
} from "./infrastructure/services";

export type {
  OrchestratorConfig,
  PollJobOptions,
  PollJobResult,
  WrapperConfig,
  ImageResultExtractor,
  ExecuteImageFeatureOptions,
  ImageFeatureResult,
  ImageFeatureRequest,
  VideoResultExtractor,
  ExecuteVideoFeatureOptions,
  VideoFeatureResult,
  VideoFeatureRequest,
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
  isResultNotReady,
  // Polling
  calculatePollingInterval,
  createPollingDelay,
  // Progress
  getProgressForStatus,
  interpolateProgress,
  createProgressTracker,
  calculatePollingProgress,
  // Status checking
  checkStatusForErrors,
  isJobComplete,
  isJobProcessing,
  isJobFailed,
  // Result validation & URL extraction
  validateResult,
  extractOutputUrl,
  extractOutputUrls,
  extractVideoUrl,
  extractThumbnailUrl,
  extractAudioUrl,
  extractImageUrls,
  // Photo generation utils
  cleanBase64,
  addBase64Prefix,
  preparePhoto,
  preparePhotos,
  isValidBase64,
  getBase64Size,
  getBase64SizeMB,
  // Feature utils
  prepareImage,
  createDevCallbacks,
  createFeatureUtils,
  // Video helpers
  showVideoGenerationSuccess,
  handleGenerationError,
  showContentModerationWarning,
} from "./infrastructure/utils";

export type {
  IntervalOptions,
  ProgressOptions,
  StatusCheckResult,
  ResultValidation,
  ValidateResultOptions,
  PhotoInput,
  PreparedImage,
  // Feature utils types
  ImageSelector,
  VideoSaver,
  AlertFunction,
  FeatureUtilsConfig,
  // Video helpers types
  VideoAlertFunction,
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
  useGenerationCallbacksBuilder,
  useAIFeatureCallbacks,
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
  CreditType,
  GenerationExecutionResult,
  GenerationCallbacksConfig,
  GenerationCallbacks,
  UseGenerationCallbacksBuilderOptions,
  AIFeatureCallbacksConfig,
  AIFeatureCallbacks,
  AIFeatureGenerationResult,
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
  // New Generic Sections
  AIGenerationProgressInline,
  PromptInput,
  AIGenerationHero,
  ExamplePrompts,
  ModerationSummary,
  // Buttons
  GenerateButton,
  // Display
  ResultDisplay,
  AIGenerationResult,
  ErrorDisplay,
  // Headers
  FeatureHeader,
  AIGenScreenHeader,

  // Photo Upload
  PhotoUploadCard,
  // Modals
  SettingsSheet,
  // Selectors
  StyleSelector,
  AspectRatioSelector,
  DurationSelector,
  GridSelector,
  StylePresetsGrid,
  AIGenerationForm,

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
  AIGenerationProgressInlineProps,
  PromptInputProps,
  AIGenerationHeroProps,
  ExamplePromptsProps,
  ModerationSummaryProps,
  StylePresetsGridProps,
  StylePreset,
  // Buttons
  GenerateButtonProps,
  // Display
  ResultDisplayProps,
  ResultDisplayAction,
  AIGenerationResultProps,
  AIGenerationResultAction,
  ErrorDisplayProps,
  // Headers
  FeatureHeaderProps,
  AIGenScreenHeaderProps,
  NavigationButtonType,

  // Photo Upload
  PhotoUploadCardProps,
  PhotoUploadCardConfig,
  // Modals
  SettingsSheetProps,
  // Selectors
  StyleSelectorProps,
  AspectRatioSelectorProps,
  DurationSelectorProps,
  GridSelectorProps,
  GridSelectorOption,

  StyleOption,
  AspectRatioOption,
  DurationValue,
  // Selector Factories
  AspectRatioTranslations,
  DurationOption,
  StyleTranslations,
  AIGenerationFormProps,
  AIGenerationFormTranslations,
} from "./presentation/components";

// Selector Factories
export {
  createAspectRatioOptions,
  createDurationOptions,
  createStyleOptions,
  createStyleOptionsFromConfig,
  ASPECT_RATIO_IDS,
  COMMON_DURATIONS,
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
export * from "./features/script-generator";


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

// =============================================================================
// FEATURES - Meme Generator
// =============================================================================

export * from "./features/meme-generator";

// =============================================================================
// INFRASTRUCTURE - Orchestration
// =============================================================================

export * from "./infrastructure/orchestration";

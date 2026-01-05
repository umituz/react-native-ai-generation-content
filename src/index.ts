/**
 * @umituz/react-native-ai-generation-content
 * Provider-agnostic AI generation orchestration
 */

if (typeof __DEV__ !== "undefined" && __DEV__) console.log("📍 [LIFECYCLE] @umituz/react-native-ai-generation-content/index.ts - Module loading");

export type {
  AIProviderConfig, IAIProvider, JobSubmission, JobStatus, AIJobStatusType, AILogEntry,
  SubscribeOptions, RunOptions, ImageFeatureType, VideoFeatureType, ImageFeatureInputData,
  VideoFeatureInputData, ProviderCapabilities, ProviderProgressInfo, INetworkService,
  ICreditService, IPaywallService, IAuthService, IAnalyticsService, IAppServices, PartialAppServices,
} from "./domain/interfaces";

export { AIErrorType } from "./domain/entities";

export type {
  AIErrorInfo, AIErrorMessages, GenerationCapability, GenerationStatus, GenerationMetadata,
  GenerationResult, GenerationProgress, GenerationRequest, PollingConfig, PollingState,
  PollingOptions, ProgressStageConfig, ProgressConfig, MiddlewareContext, MiddlewareResultContext,
  BeforeGenerateHook, AfterGenerateHook, GenerationMiddleware, MiddlewareChain,
  BackgroundJobStatus, BackgroundJob, AddJobInput, UpdateJobInput, JobExecutorConfig,
  BackgroundQueueConfig, GenerationMode,
} from "./domain/entities";

export { DEFAULT_POLLING_CONFIG, DEFAULT_PROGRESS_STAGES, DEFAULT_QUEUE_CONFIG } from "./domain/entities";

export type { ImageProcessingMode, ModeConfig, ModeCatalog } from "./domain/entities/processing-modes.types";
export { DEFAULT_PROCESSING_MODES, getModeConfig, getFreeModes, getPremiumModes, getPromptRequiredModes } from "./domain/constants/processing-modes.constants";

export {
  configureAppServices, updateAppServices, getAppServices, isAppServicesConfigured,
  resetAppServices, getNetworkService, getCreditService, getPaywallService, getAuthService, getAnalyticsService,
} from "./infrastructure/config";

export {
  providerRegistry, generationOrchestrator, pollJob, createJobPoller, generationWrapper,
  createGenerationWrapper, executeImageFeature, hasImageFeatureSupport, executeVideoFeature, hasVideoFeatureSupport,
} from "./infrastructure/services";

export type {
  OrchestratorConfig, PollJobOptions, PollJobResult, WrapperConfig, ImageResultExtractor,
  ExecuteImageFeatureOptions, ImageFeatureResult, ImageFeatureRequest, VideoResultExtractor,
  ExecuteVideoFeatureOptions, VideoFeatureResult, VideoFeatureRequest,
} from "./infrastructure/services";

export { createCreditCheckMiddleware, createHistoryTrackingMiddleware } from "./infrastructure/middleware";
export type { CreditCheckConfig, HistoryConfig, HistoryEntry } from "./infrastructure/middleware";

export {
  classifyError, isTransientError, isPermanentError, isResultNotReady, calculatePollingInterval,
  createPollingDelay, getProgressForStatus, interpolateProgress, createProgressTracker,
  calculatePollingProgress, checkStatusForErrors, isJobComplete, isJobProcessing, isJobFailed,
  validateResult, extractOutputUrl, extractOutputUrls, extractVideoUrl, extractThumbnailUrl,
  extractAudioUrl, extractImageUrls, cleanBase64, addBase64Prefix, preparePhoto, preparePhotos,
  isValidBase64, getBase64Size, getBase64SizeMB, prepareImage, createDevCallbacks, createFeatureUtils,
  showVideoGenerationSuccess, handleGenerationError, showContentModerationWarning,
} from "./infrastructure/utils";

export type {
  IntervalOptions, ProgressOptions, StatusCheckResult, ResultValidation, ValidateResultOptions,
  PhotoInput, PreparedImage, ImageSelector, VideoSaver, AlertFunction, FeatureUtilsConfig, VideoAlertFunction,
} from "./infrastructure/utils";

export { enhancePromptWithLanguage, getSupportedLanguages, getLanguageName, ModerationWrapper, generateSynchronously } from "./infrastructure/wrappers";
export type { ModerationResult, ModerationConfig, SynchronousGenerationInput, SynchronousGenerationConfig } from "./infrastructure/wrappers";

export {
  useGeneration, usePendingJobs, useBackgroundGeneration, usePhotoGeneration,
  useGenerationFlow, useGenerationCallbacksBuilder, useAIFeatureCallbacks,
} from "./presentation/hooks";

export type {
  UseGenerationOptions, UseGenerationReturn, UsePendingJobsOptions, UsePendingJobsReturn,
  UseBackgroundGenerationOptions, UseBackgroundGenerationReturn, DirectExecutionResult,
  UsePhotoGenerationReturn, PhotoGenerationInput, PhotoGenerationResult, PhotoGenerationError,
  PhotoGenerationConfig, PhotoGenerationState, PhotoGenerationStatus, UseGenerationFlowOptions,
  UseGenerationFlowReturn, CreditType, GenerationExecutionResult, GenerationCallbacksConfig,
  GenerationCallbacks, UseGenerationCallbacksBuilderOptions, AIFeatureCallbacksConfig,
  AIFeatureCallbacks, AIFeatureGenerationResult,
} from "./presentation/hooks";

export {
  GenerationProgressModal, GenerationProgressContent, GenerationProgressBar, PendingJobCard,
  PendingJobProgressBar, PendingJobCardActions, GenerationResultContent, ResultHeader,
  ResultImageCard, ResultStoryCard, ResultActions, DEFAULT_RESULT_CONFIG, PhotoStep,
  DualImagePicker, PromptInput, AIGenerationHero, ExamplePrompts, ModerationSummary,
  GenerateButton, ResultDisplay, AIGenerationResult, ErrorDisplay, FeatureHeader,
  AIGenScreenHeader, CreditBadge, PhotoUploadCard, SettingsSheet, StyleSelector,
  AspectRatioSelector, DurationSelector, GridSelector, StylePresetsGrid, AIGenerationForm,
  createAspectRatioOptions, createDurationOptions, createStyleOptions, createStyleOptionsFromConfig,
  ASPECT_RATIO_IDS, COMMON_DURATIONS,
} from "./presentation/components";

export {
  SingleImageFeatureLayout, SingleImageWithPromptFeatureLayout,
  DualImageFeatureLayout, DualImageVideoFeatureLayout,
} from "./presentation/layouts";
export type {
  ModalTranslations, BaseLayoutTranslations, PhotoUploadTranslations,
  SingleImageInputRenderProps, SingleImageWithPromptInputRenderProps,
  SingleImageWithPromptFeatureState, SingleImageWithPromptFeatureLayoutProps,
  DualImageInputRenderProps, ResultRenderProps, CustomResultRenderProps,
  ProcessingModalRenderProps, SingleImageFeatureLayoutProps, DualImageFeatureLayoutProps,
  DualImageVideoFeatureState, DualImageVideoFeatureLayoutProps,
} from "./presentation/layouts";

export type {
  GenerationProgressModalProps, GenerationProgressRenderProps, GenerationProgressContentProps,
  GenerationProgressBarProps, PendingJobCardProps, StatusLabels, PendingJobProgressBarProps,
  PendingJobCardActionsProps, GenerationResultData, GenerationResultContentProps, ResultHeaderProps,
  ResultImageCardProps, ResultStoryCardProps, ResultActionsProps, ResultConfig, ResultHeaderConfig,
  ResultImageConfig, ResultStoryConfig, ResultActionsConfig, ResultLayoutConfig, ResultActionButton,
  PhotoStepProps, DualImagePickerProps, PromptInputProps, AIGenerationHeroProps, ExamplePromptsProps,
  ModerationSummaryProps, StylePresetsGridProps, StylePreset, GenerateButtonProps, ResultDisplayProps,
  ResultDisplayAction, AIGenerationResultProps, AIGenerationResultAction, ErrorDisplayProps,
  FeatureHeaderProps, AIGenScreenHeaderProps, NavigationButtonType, CreditBadgeProps,
  PhotoUploadCardProps, PhotoUploadCardConfig, SettingsSheetProps, StyleSelectorProps,
  AspectRatioSelectorProps, DurationSelectorProps, GridSelectorProps, GridSelectorOption,
  StyleOption, AspectRatioOption, DurationValue, AspectRatioTranslations, DurationOption,
  StyleTranslations, AIGenerationFormProps, AIGenerationFormTranslations,
} from "./presentation/components";

export { DEFAULT_SINGLE_PHOTO_FLOW, DEFAULT_DUAL_PHOTO_FLOW } from "./presentation/types/flow-config.types";
export type {
  PhotoStepConfig, TextInputStepConfig, PreviewStepConfig, GenerationFlowConfig,
  PhotoStepData, TextInputStepData, GenerationFlowState,
} from "./presentation/types/flow-config.types";

export * from "./domains/prompts";
export * from "./domains/content-moderation";
export * from "./domains/creations";
export * from "./domains/face-detection";
export * from "./features/image-to-image";
export * from "./features/replace-background";
export * from "./features/upscaling";
export * from "./features/script-generator";
export * from "./features/photo-restoration";
export type { DualImageVideoProcessingStartData, DualImageVideoResult, DualImageVideoFeatureConfig } from "./features/shared/dual-image-video";
export * from "./features/ai-hug";
export * from "./features/ai-kiss";
export * from "./features/face-swap";
export * from "./features/anime-selfie";
export * from "./features/remove-background";
export * from "./features/remove-object";
export * from "./features/text-to-video";
export * from "./features/text-to-image";
export * from "./features/image-to-video";
export * from "./features/text-to-voice";
export * from "./features/hd-touch-up";
export * from "./features/meme-generator";
export * from "./infrastructure/orchestration";

// Unified AI Feature Screen
export {
  AIFeatureScreen,
  AI_FEATURE_CONFIGS,
  getAIFeatureConfig,
  hasAIFeature,
  getAllAIFeatureIds,
  getAIFeaturesByMode,
  createFeatureTranslations,
  createSingleImageTranslations,
  createDualImageTranslations,
  createComparisonTranslations,
  createPromptTranslations,
} from "./presentation/screens/ai-feature";
export type {
  AIFeatureId,
  AIFeatureMode,
  AIFeatureOutputType,
  AIFeatureCreditType,
  AIFeatureConfig,
  AIFeatureScreenProps,
  SingleImageTranslationKeys,
  DualImageTranslationKeys,
  ComparisonTranslationKeys,
  PromptTranslationKeys,
} from "./presentation/screens/ai-feature";

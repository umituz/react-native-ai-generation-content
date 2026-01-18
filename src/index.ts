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
  IFeatureUtils,
} from "./domain/interfaces";

export { AIErrorType } from "./domain/entities";

export type {
  AIErrorInfo, AIErrorMessages, GenerationCapability, GenerationStatus, GenerationMetadata,
  GenerationResult, GenerationProgress, GenerationRequest, PollingConfig, PollingState,
  PollingOptions, BackgroundJobStatus, BackgroundJob, AddJobInput, UpdateJobInput,
  JobExecutorConfig, BackgroundQueueConfig, GenerationMode,
} from "./domain/entities";

export { DEFAULT_POLLING_CONFIG, DEFAULT_QUEUE_CONFIG } from "./domain/entities";

export type { ImageProcessingMode, ModeConfig, ModeCatalog } from "./domain/entities/processing-modes.types";
export { DEFAULT_PROCESSING_MODES, getModeConfig, getFreeModes, getPremiumModes, getPromptRequiredModes } from "./domain/constants/processing-modes.constants";

export {
  configureAppServices, updateAppServices, getAppServices, isAppServicesConfigured,
  resetAppServices, getNetworkService, getCreditService, getPaywallService, getAuthService, getAnalyticsService,
} from "./infrastructure/config";

export {
  providerRegistry, generationOrchestrator, pollJob, createJobPoller,
  executeImageFeature, hasImageFeatureSupport, executeVideoFeature, hasVideoFeatureSupport,
} from "./infrastructure/services";

export type {
  OrchestratorConfig, PollJobOptions, PollJobResult, ImageResultExtractor,
  ExecuteImageFeatureOptions, ImageFeatureResult, ImageFeatureRequest,
  ExecuteVideoFeatureOptions, VideoFeatureResult, VideoFeatureRequest,
} from "./infrastructure/services";

export {
  classifyError, isTransientError, isPermanentError, isResultNotReady, calculatePollingInterval,
  createPollingDelay, checkStatusForErrors, isJobComplete, isJobProcessing, isJobFailed,
  validateResult, extractOutputUrl, extractOutputUrls, extractVideoUrl, extractThumbnailUrl,
  extractAudioUrl, extractImageUrls, cleanBase64, addBase64Prefix, preparePhoto, preparePhotos,
  isValidBase64, getBase64Size, getBase64SizeMB, prepareImage, createDevCallbacks, createFeatureUtils,
  showVideoGenerationSuccess, handleGenerationError, showContentModerationWarning,
  saveMediaToGallery, shareMedia, createSaveHandler, createShareHandler, createMediaHandlers,
  mapJobStatusToGenerationStatus,
} from "./infrastructure/utils";

export { distinctBy } from "./utils/arrayUtils";

export type {
  IntervalOptions, StatusCheckResult, ResultValidation, ValidateResultOptions,
  PhotoInput, PreparedImage, ImageSelector, VideoSaver, AlertFunction, FeatureUtilsConfig, VideoAlertFunction,
  MediaActionResult, MediaActionTranslations, ToastConfig,
} from "./infrastructure/utils";

export {
  useGeneration, usePendingJobs, useBackgroundGeneration,
  useGenerationFlow, useAIFeatureCallbacks,
  useAIGenerateState, AIGenerateStep,
  useGenerationOrchestrator, useImageGeneration, useVideoGeneration,
  createGenerationError, getAlertMessage, parseError,
} from "./presentation/hooks";

export type {
  UseGenerationOptions, UseGenerationReturn, UsePendingJobsOptions, UsePendingJobsReturn,
  UseBackgroundGenerationOptions, UseBackgroundGenerationReturn, DirectExecutionResult,
  UseGenerationFlowOptions, UseGenerationFlowReturn,
  AIFeatureCallbacksConfig, AIFeatureCallbacks, AIFeatureGenerationResult,
  GenerationStrategy, GenerationConfig, GenerationState, OrchestratorStatus,
  GenerationError, GenerationErrorType, AlertMessages, UseGenerationOrchestratorReturn,
  SingleImageInput, DualImageInput, ImageGenerationInput, ImageGenerationConfig,
  DualImageVideoInput, VideoGenerationConfig,
  UploadedImage,
} from "./presentation/hooks";

export {
  GenerationProgressContent, GenerationProgressBar, PendingJobCard,
  PendingJobProgressBar, PendingJobCardActions, GenerationResultContent, ResultHeader,
  ResultImageCard, ResultStoryCard, ResultActions, DEFAULT_RESULT_CONFIG, PhotoStep,
  DualImagePicker, PromptInput, AIGenerationHero, ExamplePrompts, ModerationSummary,
  GenerateButton, ResultDisplay, AIGenerationResult, ErrorDisplay, FeatureHeader,
  AIGenScreenHeader, CreditBadge, PhotoUploadCard, SettingsSheet, StyleSelector,
  AspectRatioSelector, DurationSelector, GridSelector, StylePresetsGrid, AIGenerationForm,
  AIGenerationConfig,
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
  SingleImageFeatureLayoutProps, DualImageFeatureLayoutProps,
  DualImageVideoFeatureState, DualImageVideoFeatureLayoutProps,
} from "./presentation/layouts";

export type {
  GenerationProgressContentProps, GenerationProgressBarProps, PendingJobCardProps, StatusLabels,
  PendingJobProgressBarProps, PendingJobCardActionsProps, GenerationResultData, GenerationResultContentProps,
  ResultHeaderProps, ResultImageCardProps, ResultStoryCardProps, ResultActionsProps, ResultConfig,
  ResultHeaderConfig, ResultImageConfig, ResultStoryConfig, ResultActionsConfig, ResultLayoutConfig,
  ResultActionButton, PhotoStepProps, DualImagePickerProps, PromptInputProps, AIGenerationHeroProps,
  ExamplePromptsProps, ModerationSummaryProps, StylePresetsGridProps, StylePreset, GenerateButtonProps,
  ResultDisplayProps, ResultDisplayAction, AIGenerationResultProps, AIGenerationResultAction,
  ErrorDisplayProps, FeatureHeaderProps, AIGenScreenHeaderProps, NavigationButtonType, CreditBadgeProps,
  PhotoUploadCardProps, PhotoUploadCardConfig, SettingsSheetProps, StyleSelectorProps,
  AspectRatioSelectorProps, DurationSelectorProps, GridSelectorProps, GridSelectorOption,
  StyleOption, AspectRatioOption, DurationValue, AspectRatioTranslations, DurationOption,
  StyleTranslations, AIGenerationFormProps, AIGenerationFormTranslations,
  AIGenerationConfigProps,
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
export * from "./domains/scenarios";
export * from "./infrastructure/orchestration";

export {
  GenerationConfigProvider,
  useGenerationConfig,
  type GenerationModels,
  type GenerationConfigValue,
  type GenerationConfigProviderProps,
} from "./infrastructure/providers";

export * from "./domains/result-preview";
export * from "./domains/generation";

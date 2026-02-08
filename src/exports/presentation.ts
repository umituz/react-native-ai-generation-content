/**
 * Presentation Layer Exports
 * Hooks, components, layouts
 */

// Hooks
export {
  useGeneration, usePendingJobs, useBackgroundGeneration,
  useGenerationFlow, useAIFeatureCallbacks,
  useAIGenerateState, AIGenerateStep,
  useGenerationOrchestrator, useImageGeneration, useVideoGeneration, useDualImageGeneration,
  useImagePicker,
  createGenerationError, getAlertMessage, parseError,
} from "../presentation/hooks";
export type {
  UseGenerationOptions, UseGenerationReturn, UsePendingJobsOptions, UsePendingJobsReturn,
  UseBackgroundGenerationOptions, UseBackgroundGenerationReturn, DirectExecutionResult,
  UseGenerationFlowOptions, UseGenerationFlowReturn,
  AIFeatureCallbacksConfig, AIFeatureCallbacks, AIFeatureGenerationResult,
  GenerationStrategy, GenerationConfig, GenerationState, OrchestratorStatus,
  GenerationError, GenerationErrorType, AlertMessages, UseGenerationOrchestratorReturn,
  SingleImageInput, DualImageInput, ImageGenerationInput, ImageGenerationConfig,
  DualImageVideoInput, VideoGenerationConfig,
  DualImageGenerationConfig, DualImageGenerationReturn,
  ImagePickerState, UseImagePickerOptions, UseImagePickerReturn,
  UploadedImage,
} from "../presentation/hooks";

// Components
export {
  GenerationProgressContent, GenerationProgressBar, PendingJobCard,
  PendingJobProgressBar, PendingJobCardActions, GenerationResultContent, ResultHeader,
  ResultImageCard, ResultStoryCard, ResultActions, DEFAULT_RESULT_CONFIG, PhotoStep,
  DualImagePicker, PromptInput, AIGenerationHero, ExamplePrompts, ModerationSummary,
  GenerateButton, ResultDisplay, AIGenerationResult, ErrorDisplay, FeatureHeader,
  AIGenScreenHeader, CreditBadge, PhotoUploadCard, SettingsSheet, StyleSelector,
  AspectRatioSelector, DurationSelector, GridSelector, StylePresetsGrid, AIGenerationForm,
  AIGenerationConfig, ModelSelector, ErrorBoundary, withErrorBoundary,
  createAspectRatioOptions, createDurationOptions, createStyleOptions, createStyleOptionsFromConfig,
  ASPECT_RATIO_IDS, COMMON_DURATIONS,
} from "../presentation/components";
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
  AIGenerationConfigProps, ModelOption, ModelSelectorProps,
} from "../presentation/components";

// Layouts
export {
  SingleImageFeatureLayout, SingleImageWithPromptFeatureLayout,
  DualImageFeatureLayout, DualImageVideoFeatureLayout,
} from "../presentation/layouts";
export type {
  ModalTranslations, BaseLayoutTranslations, PhotoUploadTranslations,
  SingleImageInputRenderProps, SingleImageWithPromptInputRenderProps,
  SingleImageWithPromptFeatureState, SingleImageWithPromptFeatureLayoutProps,
  DualImageInputRenderProps, ResultRenderProps, CustomResultRenderProps,
  SingleImageFeatureLayoutProps, DualImageFeatureLayoutProps,
  DualImageVideoFeatureState, DualImageVideoFeatureLayoutProps,
} from "../presentation/layouts";

// Flow Config Types
export { DEFAULT_SINGLE_PHOTO_FLOW, DEFAULT_DUAL_PHOTO_FLOW } from "../presentation/types/flow-config.types";
export type {
  PhotoStepConfig, TextInputStepConfig, PreviewStepConfig, GenerationFlowConfig,
  PhotoStepData, TextInputStepData, GenerationFlowState,
} from "../presentation/types/flow-config.types";

/**
 * Domain Modules Exports
 * Prompts, content-moderation, creations, face-detection, scenarios, etc.
 */

// Prompts Domain
export type {
  AIPromptCategory, AIPromptVariableType, AIPromptError, AIPromptResult,
  AIPromptVariable, AIPromptSafety, AIPromptVersion,
  AIPromptTemplate, CreateAIPromptTemplateParams,
  GeneratedPrompt, CreateGeneratedPromptParams,
  ITemplateRepository, IPromptHistoryRepository, IPromptGenerationService,
  AsyncState, AsyncActions, UseTemplateState, UseTemplateActions,
  UsePromptGenerationState, UsePromptGenerationActions,
  IdentitySegment, AnimeStyleSegment, QualitySegment,
  ImagePromptResult, ImagePromptBuilderOptions, AnimeSelfiePromptResult,
  CreatePromptOptions, MultiPersonPreservationRules, FacePreservationOptions,
  InteractionStyle, InteractionStyleOptions,
} from "../domains/prompts";
export {
  createPromptVersion, formatVersion,
  createAIPromptTemplate, updateTemplateVersion, getTemplateString,
  createGeneratedPrompt, isPromptRecent,
  TemplateRepository, PromptHistoryRepository, PromptGenerationService,
  useAsyncState, useTemplateRepository, usePromptGeneration,
  IDENTITY_SEGMENTS, IDENTITY_NEGATIVE_SEGMENTS, ANIME_STYLE_SEGMENTS,
  QUALITY_SEGMENTS, QUALITY_NEGATIVE_SEGMENTS, ANTI_REALISM_SEGMENTS,
  ANATOMY_NEGATIVE_SEGMENTS, PRESET_COLLECTIONS,
  ImagePromptBuilder, createAnimeSelfiePrompt, createStyleTransferPrompt,
  IDENTITY_PRESERVATION_CORE, PHOTOREALISTIC_RENDERING, NATURAL_POSE_GUIDELINES,
  MASTER_BASE_PROMPT, createPhotorealisticPrompt, createTransformationPrompt, enhanceExistingPrompt,
  MULTI_PERSON_PRESERVATION_RULES, createMultiPersonPrompt,
  buildFacePreservationPrompt, buildMinimalFacePreservationPrompt,
  buildInteractionStylePrompt, buildMinimalInteractionStylePrompt, getInteractionRules, getInteractionForbidden,
} from "../domains/prompts";

// Content Moderation Domain
export type {
  ContentType, ModerationSeverity, AgeRating, ViolationType, ModerationRule,
  ModerationResult, Violation, ModerationContext, ModerationConfig,
  SuggestionMessages, ValidationLimits, ContentFilterResult, IContentFilter, IModerator,
  PatternMatch,
} from "../domains/content-moderation";
export {
  contentModerationService, patternMatcherService, textModerator, imageModerator,
  videoModerator, voiceModerator, BaseModerator,
  rulesRegistry, defaultModerationRules, ContentPolicyViolationError,
} from "../domains/content-moderation";

// Creations Domain
export type {
  CreationTypeId, CreationStatus, CreationCategory, CreationFilter, FilterOption, CreationStats,
  StatusColorKey, CreationOutput, IconName, Creation, CreationDocument,
  CreationType, CreationsTranslations, CreationsConfig, DocumentMapper,
  ICreationsRepository, CreationsSubscriptionCallback, UnsubscribeFunction, RepositoryOptions,
  UseCreationPersistenceConfig, UseCreationPersistenceReturn, BaseProcessingStartData, BaseProcessingResult,
  UseProcessingJobsPollerConfig, UseProcessingJobsPollerReturn,
  CreationAction, CreationCardData, CreationCardCallbacks, FilterButton, PendingJobsSectionProps,
} from "../domains/creations";
export {
  ALL_CREATION_STATUSES, ALL_CREATION_CATEGORIES, ALL_CREATION_TYPES,
  IMAGE_CREATION_TYPES, VIDEO_CREATION_TYPES, DEFAULT_CREATION_FILTER,
  MEDIA_FILTER_OPTIONS, STATUS_FILTER_OPTIONS, getTypesForCategory, getCategoryForType,
  getCategoryForCreation, isTypeInCategory, isVideoCreationType, isImageCreationType, calculateCreationStats,
  getStatusColorKey, getStatusColor, getStatusTextKey, getStatusText, isInProgress, isCompleted, isFailed,
  getPreviewUrl, getAllMediaUrls, hasDownloadableContent, hasVideoContent, hasAudioContent, getPrimaryMediaUrl,
  generateCreationId, getTypeIcon, getTypeTextKey, getTypeText, getCreationTitle, filterBySearch, sortCreations, truncateText,
  mapDocumentToCreation, DEFAULT_TRANSLATIONS, DEFAULT_CONFIG,
  CreationsRepository, createCreationsRepository,
  useCreations, useDeleteCreation, useCreationsFilter, useAdvancedFilter, useCreationPersistence, useProcessingJobsPoller,
  CreationPreview, CreationBadges, CreationActions, CreationCard, CreationThumbnail,
  FilterChips, CreationsFilterBar, createMediaFilterButtons, createStatusFilterButtons,
  CreationsHomeCard, EmptyState, PendingJobsSection,
  getLocalizedTitle, getFilterCategoriesFromConfig, getTranslatedTypes,
  CreationsGalleryScreen,
} from "../domains/creations";

// Face Detection Domain
export type { FaceDetectionResult, FaceValidationState, FaceDetectionConfig } from "../domains/face-detection";
export {
  FACE_DETECTION_CONFIG, FACE_DETECTION_PROMPTS,
  isValidFace, parseDetectionResponse, createFailedResult, createSuccessResult,
  analyzeImageForFace, useFaceDetection, FaceValidationStatus, FaceDetectionToggle,
} from "../domains/face-detection";

// Scenarios Domain
export type {
  ScenarioOutputType, ScenarioInputType, ScenarioPromptType, GeneratingMessages, Scenario,
  AppScenarioConfig, ConfiguredScenario, WizardConfigOptions,
  CategoryNavigationContainerProps, MainCategoryScreenProps, SubCategoryScreenProps,
  MainCategory, SubCategory, CategoryInfo, ScenarioSelectorConfig, ScenarioPreviewTranslations,
  ScenarioConfig, VisualStyleOption, InspirationChipData, MagicPromptConfig,
  ScenarioData,
} from "../domains/scenarios";
export {
  createScenariosForApp, filterScenariosByOutputType, filterScenariosByCategory,
  getScenarioCategories, findScenarioById,
  configureScenarios, getConfiguredScenario, getDefaultOutputType, isScenariosConfigured, getAllConfiguredScenarios,
  createStoryTemplate, createCreativePrompt,
  WizardInputType, detectWizardInputType, SCENARIO_TO_WIZARD_INPUT_MAP,
  getScenarioWizardConfig, hasExplicitConfig, getScenarioWizardInputType, registerWizardConfig,
  CategoryNavigationContainer, ScenarioPreviewScreen, MainCategoryScreen, SubCategoryScreen, HierarchicalScenarioListScreen,
} from "../domains/scenarios";

// Access Control Domain
export type { AIFeatureGateOptions, AIFeatureGateReturn, AIFeatureGateHook } from "../domains/access-control";
export { useAIFeatureGate } from "../domains/access-control";

// Result Preview Domain
export type {
  ResultData, ResultActionsCallbacks, ResultDisplayState,
  ResultActionBarProps, RecentCreation, ResultPreviewScreenProps, ResultPreviewTranslations,
  UseResultActionsOptions, UseResultActionsReturn,
  StarRatingPickerProps, GenerationErrorTranslations, GenerationErrorConfig, GenerationErrorScreenProps,
} from "../domains/result-preview";
export {
  ResultPreviewScreen, ResultActionBar, RecentCreationsSection,
  GenerationErrorScreen, StarRatingPicker, useResultActions,
} from "../domains/result-preview";

// Generation Domain (wizard, flow, strategy)
export type {
  UseAIGenerationProps, UseAIGenerationReturn, AlertMessages as GenerationAlertMessages,
  FeatureConfig, FeatureRegistration, GenerationType, InputType, OutputType, VisualStyleConfig,
  GenerationExecutor, GenerationOptions as GenerationExecutorOptions,
  GenerationResult as GenerationExecutorResult,
  ImageGenerationOutput, VideoGenerationInput, VideoGenerationOutput,
  MemeGenerationInput, MemeGenerationOutput, TextToImageInput, TextToImageOutput, ExecutorGenerationType,
  BaseStepConfig, AuthGateStepConfig, CreditGateStepConfig, PhotoUploadStepConfig,
  TextInputStepConfig as WizardTextInputStepConfig, SelectionStepConfig,
  PreviewStepConfig as WizardPreviewStepConfig, WizardStepConfig,
  WizardFeatureConfig, ScenarioBasedConfig,
  UsePhotoUploadStateProps, UsePhotoUploadStateReturn, PhotoUploadConfig,
  PhotoUploadTranslations as WizardPhotoUploadTranslations,
  UseWizardGenerationProps, UseWizardGenerationReturn, WizardScenarioData, WizardOutputType,
  GenericWizardFlowProps, TextInputScreenTranslations, TextInputScreenConfig, TextInputScreenProps,
  FlowStoreType,
  GateResult, AuthGateConfig, CreditGateConfig, FlowState, FlowActions, FlowCallbacks,
  FlowConfiguration, StepDefinition,
} from "../domains/generation";
export {
  useAIGeneration, featureRegistry, createGenerationStrategy, ExecutorFactory,
  buildWizardConfigFromScenario, WIZARD_PRESETS, buildFlowStepsFromWizard, getPhotoUploadCount,
  getStepConfig, quickBuildWizard, usePhotoUploadState, useWizardGeneration,
  GenericWizardFlow, GeneratingScreen, TextInputScreen,
  TEXT_TO_IMAGE_WIZARD_CONFIG, TEXT_TO_VIDEO_WIZARD_CONFIG, IMAGE_TO_VIDEO_WIZARD_CONFIG,
  createFlowStore, useFlow, resetFlowStore,
  StepType,
} from "../domains/generation";

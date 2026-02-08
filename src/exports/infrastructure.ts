/**
 * Infrastructure Layer Exports
 * Services, config, utils, orchestration
 */

// Base Executor
export { BaseExecutor } from "../infrastructure/executors";
export type { BaseExecutorOptions } from "../infrastructure/executors";

// App Services Config
export {
  configureAppServices, updateAppServices, getAppServices, isAppServicesConfigured,
  resetAppServices, getNetworkService, getCreditService, getPaywallService, getAuthService, getAnalyticsService,
} from "../infrastructure/config";

// Services
export {
  providerRegistry, generationOrchestrator, pollJob, createJobPoller,
  executeImageFeature, hasImageFeatureSupport, executeVideoFeature, hasVideoFeatureSupport,
  submitVideoFeatureToQueue, executeMultiImageGeneration,
} from "../infrastructure/services";
export type {
  OrchestratorConfig, PollJobOptions, PollJobResult, ImageResultExtractor,
  ExecuteImageFeatureOptions, ImageFeatureResult, ImageFeatureRequest,
  ExecuteVideoFeatureOptions, VideoFeatureResult, VideoFeatureRequest,
  MultiImageGenerationInput, MultiImageGenerationResult,
} from "../infrastructure/services";

// Utils
export {
  classifyError, isTransientError, isPermanentError, isResultNotReady, calculatePollingInterval,
  checkStatusForErrors, isJobComplete, isJobProcessing, isJobFailed,
  validateResult, extractOutputUrl, extractOutputUrls, extractVideoUrl, extractThumbnailUrl,
  extractAudioUrl, extractImageUrls, cleanBase64, addBase64Prefix, preparePhoto, preparePhotos,
  isValidBase64, getBase64Size, getBase64SizeMB, prepareImage, createDevCallbacks, createFeatureUtils,
  showVideoGenerationSuccess, handleGenerationError, showContentModerationWarning,
  mapJobStatusToGenerationStatus,
} from "../infrastructure/utils";
export type {
  IntervalOptions, StatusCheckResult, ResultValidation, ValidateResultOptions,
  PhotoInput, PreparedImage, ImageSelector, VideoSaver, AlertFunction, FeatureUtilsConfig, VideoAlertFunction,
} from "../infrastructure/utils";

// Validation
export {
  sanitizeString,
  validateString,
  validateNumber,
  validateURL,
  validateEmail,
  validateBase64,
  validateObject,
  validateArray,
  combineValidationResults,
  sanitizeAndValidate,
  validateAIPrompt,
  validateImageData,
  validateUserId,
  validateCreationId,
} from "../infrastructure/validation/input-validator";
export type {
  ValidationResult,
  StringValidationOptions,
  NumericValidationOptions,
} from "../infrastructure/validation/input-validator";

// Orchestration
export type {
  CreditService, PaywallService, NetworkService, AuthService,
  GenerationMetadata as OrchestratorGenerationMetadata, GenerationCapability as OrchestratorGenerationCapability,
  OrchestratorConfig as GenerationOrchestratorConfig,
} from "../infrastructure/orchestration";
export {
  GenerationOrchestrator, NetworkUnavailableError, InsufficientCreditsError, AuthenticationRequiredError,
} from "../infrastructure/orchestration";

// Providers
export {
  GenerationConfigProvider,
  useGenerationConfig,
  type GenerationModels,
  type GenerationConfigValue,
  type GenerationConfigProviderProps,
} from "../infrastructure/providers";

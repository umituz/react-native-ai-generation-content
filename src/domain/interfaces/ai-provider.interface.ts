/**
 * AI Provider Interface
 * Provider-agnostic interface for AI generation services
 */

// =============================================================================
// Feature Types (must be defined first for use in other interfaces)
// =============================================================================

/**
 * Feature types for image processing (output: image)
 */
export type ImageFeatureType =
  | "upscale"
  | "photo-restore"
  | "face-swap"
  | "anime-selfie"
  | "remove-background"
  | "remove-object"
  | "hd-touch-up"
  | "replace-background";

/**
 * Feature types for video generation (output: video)
 */
export type VideoFeatureType =
  | "ai-hug"
  | "ai-kiss"
  | "image-to-video"
  | "text-to-video";

// =============================================================================
// Provider Configuration
// =============================================================================

export interface AIProviderConfig {
  apiKey: string;
  maxRetries?: number;
  baseDelay?: number;
  maxDelay?: number;
  defaultTimeoutMs?: number;
  /** Text generation model ID */
  textModel?: string;
  /** Text-to-image generation model ID */
  textToImageModel?: string;
  /** Image editing model ID */
  imageEditModel?: string;
  /** Video generation model ID */
  videoGenerationModel?: string;
  /** Video feature model mapping - app provides models for each feature */
  videoFeatureModels?: Partial<Record<VideoFeatureType, string>>;
  /** Image feature model mapping - app provides models for each feature */
  imageFeatureModels?: Partial<Record<ImageFeatureType, string>>;
}

// =============================================================================
// Status Types
// =============================================================================

export type AIJobStatusType =
  | "IN_QUEUE"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED";

export interface AILogEntry {
  message: string;
  level: "info" | "warn" | "error";
  timestamp?: string;
}

export interface JobSubmission {
  requestId: string;
  statusUrl?: string;
  responseUrl?: string;
}

export interface JobStatus {
  status: AIJobStatusType;
  logs?: AILogEntry[];
  queuePosition?: number;
  eta?: number;
}

// =============================================================================
// Progress & Options
// =============================================================================

export interface ProviderProgressInfo {
  /** Progress percentage (0-100) */
  progress: number;
  /** Current job status */
  status?: AIJobStatusType;
  /** Human-readable message */
  message?: string;
  /** Estimated time remaining in ms */
  estimatedTimeRemaining?: number;
}

export interface SubscribeOptions<T = unknown> {
  timeoutMs?: number;
  onQueueUpdate?: (status: JobStatus) => void;
  onProgress?: (progress: ProviderProgressInfo) => void;
  onResult?: (result: T) => void;
}

export interface RunOptions {
  onProgress?: (progress: ProviderProgressInfo) => void;
}

// =============================================================================
// Capabilities
// =============================================================================

export interface ProviderCapabilities {
  /** Supported image features */
  imageFeatures: readonly ImageFeatureType[];
  /** Supported video features */
  videoFeatures: readonly VideoFeatureType[];
  /** Supports text-to-image generation */
  textToImage: boolean;
  /** Supports text-to-video generation */
  textToVideo: boolean;
  /** Supports image-to-video generation */
  imageToVideo: boolean;
  /** Supports text-to-voice generation */
  textToVoice: boolean;
  /** Supports text-to-text (LLM) generation */
  textToText: boolean;
}

// =============================================================================
// Feature Input Data
// =============================================================================

export interface ImageFeatureInputData {
  imageBase64: string;
  targetImageBase64?: string;
  prompt?: string;
  options?: Record<string, unknown>;
}

export interface VideoFeatureInputData {
  /** Source image (required for image-to-video, optional for text-to-video) */
  sourceImageBase64?: string;
  /** Target image (optional, used for dual-image features like ai-kiss, ai-hug) */
  targetImageBase64?: string;
  /** Generation prompt (required for text-to-video) */
  prompt?: string;
  /** Additional generation options */
  options?: Record<string, unknown>;
}

// =============================================================================
// Provider Interface
// =============================================================================

export interface IAIProvider {
  readonly providerId: string;
  readonly providerName: string;

  initialize(config: AIProviderConfig): void;
  isInitialized(): boolean;
  getCapabilities(): ProviderCapabilities;
  isFeatureSupported(feature: ImageFeatureType | VideoFeatureType): boolean;

  submitJob(model: string, input: Record<string, unknown>): Promise<JobSubmission>;
  getJobStatus(model: string, requestId: string): Promise<JobStatus>;
  getJobResult<T = unknown>(model: string, requestId: string): Promise<T>;

  subscribe<T = unknown>(
    model: string,
    input: Record<string, unknown>,
    options?: SubscribeOptions<T>,
  ): Promise<T>;

  run<T = unknown>(
    model: string,
    input: Record<string, unknown>,
    options?: RunOptions,
  ): Promise<T>;

  reset(): void;

  getImageFeatureModel(feature: ImageFeatureType): string;
  buildImageFeatureInput(
    feature: ImageFeatureType,
    data: ImageFeatureInputData,
  ): Record<string, unknown>;

  getVideoFeatureModel(feature: VideoFeatureType): string;
  buildVideoFeatureInput(
    feature: VideoFeatureType,
    data: VideoFeatureInputData,
  ): Record<string, unknown>;
}

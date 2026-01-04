/**
 * AI Provider Interface
 * Provider-agnostic interface for AI generation services
 */

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
}

/**
 * Provider-level progress info for run/subscribe operations
 */
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

/**
 * Provider capabilities and metadata
 */
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

export interface SubscribeOptions<T = unknown> {
  timeoutMs?: number;
  onQueueUpdate?: (status: JobStatus) => void;
  onProgress?: (progress: ProviderProgressInfo) => void;
  onResult?: (result: T) => void;
}

export interface RunOptions {
  onProgress?: (progress: ProviderProgressInfo) => void;
}

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
  | "ai-kiss";

/**
 * Input data for image features
 */
export interface ImageFeatureInputData {
  imageBase64: string;
  targetImageBase64?: string;
  prompt?: string;
  options?: Record<string, unknown>;
}

/**
 * Input data for video features
 */
export interface VideoFeatureInputData {
  sourceImageBase64: string;
  targetImageBase64: string;
  prompt?: string;
  options?: Record<string, unknown>;
}

/**
 * AI Provider Interface
 * All AI providers must implement this interface
 */
export interface IAIProvider {
  readonly providerId: string;
  readonly providerName: string;

  initialize(config: AIProviderConfig): void;
  isInitialized(): boolean;

  /**
   * Get provider capabilities
   */
  getCapabilities(): ProviderCapabilities;

  /**
   * Check if a specific feature is supported
   */
  isFeatureSupported(feature: ImageFeatureType | VideoFeatureType): boolean;

  submitJob(
    model: string,
    input: Record<string, unknown>,
  ): Promise<JobSubmission>;

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

  /**
   * Get model ID for an image feature
   * @throws Error if feature is not supported
   */
  getImageFeatureModel(feature: ImageFeatureType): string;

  /**
   * Build provider-specific input for an image feature
   * @throws Error if feature is not supported
   */
  buildImageFeatureInput(
    feature: ImageFeatureType,
    data: ImageFeatureInputData,
  ): Record<string, unknown>;

  /**
   * Get model ID for a video feature
   * @throws Error if feature is not supported
   */
  getVideoFeatureModel(feature: VideoFeatureType): string;

  /**
   * Build provider-specific input for a video feature
   * @throws Error if feature is not supported
   */
  buildVideoFeatureInput(
    feature: VideoFeatureType,
    data: VideoFeatureInputData,
  ): Record<string, unknown>;
}

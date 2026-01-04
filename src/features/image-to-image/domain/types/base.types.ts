/**
 * Base Image-to-Image Types
 * Common types for all image processing features
 */

import type { ImageFeatureType } from "../../../../domain/interfaces";

/**
 * Image processing categories
 */
export type ImageProcessingCategory =
  | "enhancement"
  | "editing"
  | "transformation"
  | "composition";

/**
 * Input mode for image processing
 */
export type ImageInputMode = "single" | "single-with-prompt" | "dual";

/**
 * Base result for all image processing features
 */
export interface BaseImageResult {
  success: boolean;
  imageUrl?: string;
  imageBase64?: string;
  error?: string;
  requestId?: string;
}

/**
 * Base state for single image features
 */
export interface BaseSingleImageState {
  imageUri: string | null;
  processedUrl: string | null;
  isProcessing: boolean;
  progress: number;
  error: string | null;
}

/**
 * Base state for single image + prompt features
 */
export interface BaseImageWithPromptState extends BaseSingleImageState {
  prompt: string;
}

/**
 * Base state for dual image features
 */
export interface BaseDualImageState {
  sourceImageUri: string | null;
  targetImageUri: string | null;
  processedUrl: string | null;
  isProcessing: boolean;
  progress: number;
  error: string | null;
}

/**
 * Base translations for image features
 */
export interface BaseImageTranslations {
  uploadTitle: string;
  uploadSubtitle: string;
  uploadChange: string;
  uploadAnalyzing: string;
  description: string;
  processingText: string;
  processButtonText: string;
  successText: string;
  saveButtonText: string;
  tryAnotherText: string;
  beforeLabel?: string;
  afterLabel?: string;
  compareHint?: string;
}

/**
 * Base translations for dual image features
 */
export interface BaseDualImageTranslations {
  sourceUploadTitle: string;
  sourceUploadSubtitle: string;
  targetUploadTitle: string;
  targetUploadSubtitle: string;
  uploadChange: string;
  uploadAnalyzing: string;
  description: string;
  processingText: string;
  processButtonText: string;
  successText: string;
  saveButtonText: string;
  tryAnotherText: string;
}

/**
 * Result extractor function type
 */
export type ImageResultExtractor = (result: unknown) => string | undefined;

/**
 * Base config for all image features
 */
export interface BaseImageConfig<TResult extends BaseImageResult = BaseImageResult> {
  featureType: ImageFeatureType;
  creditCost?: number;
  extractResult?: ImageResultExtractor;
  prepareImage: (imageUri: string) => Promise<string>;
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: TResult) => void;
  onError?: (error: string) => void;
}

/**
 * Config for single image features
 */
export interface SingleImageConfig<TResult extends BaseImageResult = BaseImageResult>
  extends BaseImageConfig<TResult> {
  onImageSelect?: (uri: string) => void;
}

/**
 * Config for dual image features
 */
export interface DualImageConfig<TResult extends BaseImageResult = BaseImageResult>
  extends BaseImageConfig<TResult> {
  onSourceImageSelect?: (uri: string) => void;
  onTargetImageSelect?: (uri: string) => void;
}

/**
 * Base hook props for single image features
 */
export interface BaseSingleImageHookProps<
  TConfig extends SingleImageConfig = SingleImageConfig,
> {
  config: TConfig;
  onSelectImage: () => Promise<string | null>;
  onSaveImage: (imageUrl: string) => Promise<void>;
  /** Called before processing starts. Return false to cancel. */
  onBeforeProcess?: () => Promise<boolean>;
}

/**
 * Base hook props for dual image features
 */
export interface BaseDualImageHookProps<
  TConfig extends DualImageConfig = DualImageConfig,
> {
  config: TConfig;
  onSelectSourceImage: () => Promise<string | null>;
  onSelectTargetImage: () => Promise<string | null>;
  onSaveImage: (imageUrl: string) => Promise<void>;
  /** Called before processing starts. Return false to cancel. */
  onBeforeProcess?: () => Promise<boolean>;
}

/**
 * Base hook return for single image features
 */
export interface BaseSingleImageHookReturn extends BaseSingleImageState {
  selectImage: () => Promise<void>;
  process: () => Promise<void>;
  save: () => Promise<void>;
  reset: () => void;
}

/**
 * Base hook return for dual image features
 */
export interface BaseDualImageHookReturn extends BaseDualImageState {
  selectSourceImage: () => Promise<void>;
  selectTargetImage: () => Promise<void>;
  process: () => Promise<void>;
  save: () => Promise<void>;
  reset: () => void;
}

/**
 * Feature metadata for categorization
 */
export interface ImageFeatureMetadata {
  name: string;
  category: ImageProcessingCategory;
  inputMode: ImageInputMode;
  featureType: ImageFeatureType;
  requiresPrompt?: boolean;
  requiresMask?: boolean;
}

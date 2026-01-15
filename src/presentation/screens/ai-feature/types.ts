/**
 * AIFeatureScreen Types
 * Unified type definitions for all AI feature screens
 */

import type { ReactNode } from "react";

/**
 * All supported AI feature types
 */
export type AIFeatureId =
  | "anime-selfie"
  | "remove-background"
  | "hd-touch-up"
  | "upscale"
  | "photo-restore"
  | "remove-object"
  | "replace-background"
  | "face-swap"
  | "ai-hug"
  | "ai-kiss"
  | "meme-generator"
  | "image-to-video"
  | "text-to-video";

/**
 * Image mode for the feature
 */
export type AIFeatureMode = "single" | "single-with-prompt" | "dual" | "dual-video" | "text-input";

/**
 * Output type of the feature
 */
export type AIFeatureOutputType = "image" | "video";

/**
 * Credit type for the feature
 */
export type AIFeatureCreditType = "image" | "video";

/**
 * Translation keys structure for single image features
 */
export interface SingleImageTranslationKeys {
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
}

/**
 * Translation keys structure for comparison result features (upscale, photo-restore)
 */
export interface ComparisonTranslationKeys extends SingleImageTranslationKeys {
  beforeLabel: string;
  afterLabel: string;
}

/**
 * Translation keys structure for prompt features (remove-object, replace-background)
 */
export interface PromptTranslationKeys extends SingleImageTranslationKeys {
  promptPlaceholder: string;
  maskTitle?: string;
  maskSubtitle?: string;
}

/**
 * Translation keys structure for dual image features
 */
export interface DualImageTranslationKeys {
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
  modalTitle?: string;
  modalMessage?: string;
  modalHint?: string;
  modalBackgroundHint?: string;
}

/**
 * Translation keys structure for text-input features (text-to-image, meme-generator)
 */
export interface TextInputTranslationKeys {
  title: string;
  description: string;
  promptPlaceholder: string;
  processButtonText: string;
  processingText: string;
  successText: string;
  saveButtonText: string;
  tryAnotherText: string;
  styleLabel?: string;
  tipsLabel?: string;
}

/**
 * Static feature configuration (doesn't change at runtime)
 */
export interface AIFeatureConfig {
  /** Unique feature identifier */
  readonly id: AIFeatureId;
  /** Feature mode: single image, dual image, etc. */
  readonly mode: AIFeatureMode;
  /** Output type: image or video */
  readonly outputType: AIFeatureOutputType;
  /** Credit type to deduct */
  readonly creditType: AIFeatureCreditType;
  /** Translation key prefix (e.g., "anime-selfie" for t("anime-selfie.uploadTitle")) */
  readonly translationPrefix: string;
  /** Whether this feature has comparison result (before/after slider) */
  readonly hasComparisonResult?: boolean;
  /** Feature-specific extra config */
  readonly extraConfig?: Record<string, unknown>;
}

/**
 * Runtime props for AIFeatureScreen
 */
export interface AIFeatureScreenProps {
  /** Feature configuration from registry */
  readonly config: AIFeatureConfig;
  /** Credit cost for this feature */
  readonly creditCost: number;
  /** Deduct credits callback */
  readonly onDeductCredits: (cost: number) => Promise<void | boolean>;
  /** Select image callback */
  readonly onSelectImage: () => Promise<string | null>;
  /** Save media callback */
  readonly onSaveMedia: (url: string) => Promise<void>;
  /** Credit guard check callback */
  readonly onCheckCreditGuard: (cost: number, featureName: string) => Promise<boolean>;
  /** Current image credits count */
  readonly imageCredits: number;
  /** Custom header right content */
  readonly headerRightContent?: ReactNode;
}

/**
 * Feature registry entry with component
 */
export interface AIFeatureRegistryEntry extends AIFeatureConfig {
  /** The Feature component to render */
  readonly Component: React.ComponentType<unknown>;
}

/**
 * Replace Background Feature Types
 * Extends base image-to-image types with replace-background options
 */

import type {
  BaseImageResult,
  BaseImageWithPromptState,
  BaseImageTranslations,
  SingleImageConfig,
} from "../../../image-to-image/domain/types";

export type ReplaceBackgroundMode =
  | "replace"
  | "blur"
  | "creative-scene"
  | "solid-color";

export interface ReplaceBackgroundOptions {
  mode?: ReplaceBackgroundMode;
  prompt?: string;
  backgroundColor?: string;
  blurIntensity?: number;
}

export interface ReplaceBackgroundRequest {
  imageUri: string;
  imageBase64?: string;
  userId: string;
  prompt?: string;
  options?: ReplaceBackgroundOptions;
}

export type ReplaceBackgroundResult = BaseImageResult;

export interface ReplaceBackgroundFeatureState extends BaseImageWithPromptState {
  mode: ReplaceBackgroundMode;
}

export interface ReplaceBackgroundTranslations extends BaseImageTranslations {
  promptPlaceholder: string;
}

export interface ReplaceBackgroundFeatureConfig
  extends SingleImageConfig<ReplaceBackgroundResult> {
  defaultMode?: ReplaceBackgroundMode;
  onPromptChange?: (prompt: string) => void;
}

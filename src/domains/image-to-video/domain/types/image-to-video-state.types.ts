/**
 * Image-to-Video State Types
 * Refactored to use shared kernel types
 */

import type { BaseFeatureState } from '../../../../shared-kernel/base-types';

/**
 * Image-to-video feature state
 * Extends base feature state with image-specific fields
 */
export interface ImageToVideoFeatureState extends BaseFeatureState {
  imageUri: string | null;
  motionPrompt: string;
  videoUrl: string | null;
  thumbnailUrl: string | null;
}

/**
 * Image-to-video translations
 */
export interface ImageToVideoTranslations {
  uploadTitle: string;
  uploadSubtitle: string;
  motionPromptPlaceholder: string;
  generateButtonText: string;
  processingText: string;
  successText: string;
  saveButtonText: string;
  tryAnotherText: string;
}

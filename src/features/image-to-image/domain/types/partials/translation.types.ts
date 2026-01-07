/**
 * Image Feature Translation Types
 * Translation interfaces for all image processing features
 */

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
  /** Modal title shown during processing */
  modalTitle?: string;
  /** Modal message shown during processing */
  modalMessage?: string;
  /** Modal hint/tip shown during processing */
  modalHint?: string;
  /** "Continue in background" text */
  modalBackgroundHint?: string;
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
  /** Modal title shown during processing */
  modalTitle?: string;
  /** Modal message shown during processing */
  modalMessage?: string;
  /** Modal hint/tip shown during processing */
  modalHint?: string;
  /** "Continue in background" text */
  modalBackgroundHint?: string;
}

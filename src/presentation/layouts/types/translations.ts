/**
 * Layout Translation Types
 * Translation interfaces for feature layouts
 */

/**
 * Modal translations for processing modal
 */
export interface ModalTranslations {
  title: string;
  message: string;
  hint: string;
  backgroundHint: string;
}

/**
 * Base translations required by layouts
 */
export interface BaseLayoutTranslations {
  successText: string;
  saveButtonText: string;
  tryAnotherText: string;
  processButtonText: string;
  processingText: string;
}

/**
 * Photo upload translations
 */
export interface PhotoUploadTranslations {
  uploadTitle: string;
  uploadSubtitle: string;
  uploadChange: string;
  uploadAnalyzing: string;
}

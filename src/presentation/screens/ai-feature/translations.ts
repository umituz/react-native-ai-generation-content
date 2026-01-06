/**
 * AI Feature Translations Factory
 * Creates translation objects from prefix and t function
 */

import type { AIFeatureConfig } from "./types";

type TranslateFunction = (key: string) => string;

/**
 * Create single image translations
 */
export function createSingleImageTranslations(prefix: string, t: TranslateFunction) {
  return {
    uploadTitle: t(`${prefix}.uploadTitle`),
    uploadSubtitle: t(`${prefix}.uploadSubtitle`),
    uploadChange: t(`${prefix}.uploadChange`),
    uploadAnalyzing: t(`${prefix}.uploadAnalyzing`),
    description: t(`${prefix}.description`),
    processingText: t(`${prefix}.processingText`),
    processButtonText: t(`${prefix}.processButtonText`),
    successText: t(`${prefix}.successText`),
    saveButtonText: t(`${prefix}.saveButtonText`),
    tryAnotherText: t(`${prefix}.tryAnotherText`),
  };
}

/**
 * Create comparison result translations (upscale, photo-restore)
 */
export function createComparisonTranslations(prefix: string, t: TranslateFunction) {
  return {
    ...createSingleImageTranslations(prefix, t),
    beforeLabel: t(`${prefix}.beforeLabel`),
    afterLabel: t(`${prefix}.afterLabel`),
  };
}

/**
 * Create prompt feature translations (remove-object, replace-background)
 */
export function createPromptTranslations(prefix: string, t: TranslateFunction) {
  return {
    ...createSingleImageTranslations(prefix, t),
    promptPlaceholder: t(`${prefix}.promptPlaceholder`),
    maskTitle: t(`${prefix}.maskTitle`),
    maskSubtitle: t(`${prefix}.maskSubtitle`),
  };
}

/**
 * Create text-input translations (text-to-image, meme-generator)
 * For pure text-to-image features without image upload
 */
export function createTextInputTranslations(prefix: string, t: TranslateFunction) {
  return {
    title: t(`${prefix}.title`),
    description: t(`${prefix}.description`),
    promptPlaceholder: t(`${prefix}.promptPlaceholder`),
    processButtonText: t(`${prefix}.processButtonText`),
    processingText: t(`${prefix}.processingText`),
    successText: t(`${prefix}.successText`),
    saveButtonText: t(`${prefix}.saveButtonText`),
    tryAnotherText: t(`${prefix}.tryAnotherText`),
    styleLabel: t(`${prefix}.styleLabel`),
    tipsLabel: t(`${prefix}.tipsLabel`),
  };
}

/**
 * Create dual image translations (face-swap, ai-hug, ai-kiss)
 */
export function createDualImageTranslations(prefix: string, t: TranslateFunction) {
  return {
    sourceUploadTitle: t(`${prefix}.sourceUploadTitle`),
    sourceUploadSubtitle: t(`${prefix}.sourceUploadSubtitle`),
    targetUploadTitle: t(`${prefix}.targetUploadTitle`),
    targetUploadSubtitle: t(`${prefix}.targetUploadSubtitle`),
    uploadChange: t(`${prefix}.uploadChange`),
    uploadAnalyzing: t(`${prefix}.uploadAnalyzing`),
    description: t(`${prefix}.description`),
    processingText: t(`${prefix}.processingText`),
    processButtonText: t(`${prefix}.processButtonText`),
    successText: t(`${prefix}.successText`),
    saveButtonText: t(`${prefix}.saveButtonText`),
    tryAnotherText: t(`${prefix}.tryAnotherText`),
    modalTitle: t(`${prefix}.modalTitle`),
    modalMessage: t(`${prefix}.modalMessage`),
    modalHint: t(`${prefix}.modalHint`),
    modalBackgroundHint: t(`${prefix}.modalBackgroundHint`),
  };
}

/**
 * Create translations based on feature config
 */
export function createFeatureTranslations(config: AIFeatureConfig, t: TranslateFunction) {
  const { translationPrefix, mode, hasComparisonResult } = config;

  switch (mode) {
    case "single":
      return hasComparisonResult
        ? createComparisonTranslations(translationPrefix, t)
        : createSingleImageTranslations(translationPrefix, t);
    case "single-with-prompt":
      return createPromptTranslations(translationPrefix, t);
    case "text-input":
      return createTextInputTranslations(translationPrefix, t);
    case "dual":
    case "dual-video":
      return createDualImageTranslations(translationPrefix, t);
    default:
      return createSingleImageTranslations(translationPrefix, t);
  }
}

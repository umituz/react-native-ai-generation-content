/**
 * useAIGenerateWizard Hook
 * Provides all necessary logic for AI generation wizard screens
 * Centralizes save, share, and generation handling
 */

import { useCallback, useMemo } from "react";
import {
  saveMediaToGallery,
  shareMedia,
  type MediaActionTranslations,
  type ToastConfig,
} from "../../infrastructure/utils/media-actions.util";
import { useAIFeatureGeneration } from "./generation";
import type { AlertMessages } from "./generation";

export interface AIGenerateWizardConfig {
  readonly featureType: string;
  readonly userId?: string;
  readonly alertMessages?: AlertMessages;
}

export interface AIGenerateWizardTranslations {
  readonly headerTitle: string;
  readonly uploadSubtitle: string;
  readonly uploadSubtitle2: string;
  readonly continue: string;
  readonly tapToUpload: string;
  readonly selectPhoto: string;
  readonly change: string;
  readonly analyzing: string;
  readonly error: string;
  readonly uploadFailed: string;
  readonly aiDisclosure: string;
  readonly heroTitle: string;
  readonly heroSubtitle: string;
  readonly presetsTitle: string;
  readonly showAdvancedLabel: string;
  readonly hideAdvancedLabel: string;
  readonly promptTitle: string;
  readonly promptPlaceholder: string;
  readonly styleTitle: string;
  readonly durationTitle: string;
  readonly generateButton: string;
  readonly generatingButton: string;
  readonly processingTitle: string;
  readonly processingMessage: string;
  readonly processingHint: string;
  readonly successTitle: string;
  readonly saveButton: string;
  readonly shareButton: string;
  readonly tryAgainButton: string;
  readonly fileTooLarge: string;
  readonly maxFileSize: string;
}

export interface UseAIGenerateWizardReturn {
  readonly generate: (data: {
    prompt: string;
    style: string;
    duration: number;
    images: { uri: string }[];
  }) => Promise<string | null | void>;
  readonly handleSave: (uri: string) => Promise<void>;
  readonly handleShare: (uri: string) => Promise<void>;
}

/**
 * Hook that provides all AI generation wizard functionality
 * Handles generation, save, and share operations
 */
export function useAIGenerateWizard(
  config: AIGenerateWizardConfig,
  translations: { error?: string; success?: string },
  toast?: ToastConfig
): UseAIGenerateWizardReturn {
  const { generate } = useAIFeatureGeneration({
    featureType: config.featureType as never,
    alertMessages: config.alertMessages ?? {
      success: translations.success ?? "Generation successful",
      error: translations.error ?? "Error",
      creditLimit: "Insufficient credits",
    },
    userId: config.userId,
  });

  const mediaTranslations: MediaActionTranslations = useMemo(
    () => ({
      success: translations.success,
      error: translations.error,
      permissionDenied: "Permission denied",
      saveFailed: "Failed to save media",
      shareFailed: "Failed to share media",
      shareNotAvailable: "Sharing is not available on this device",
    }),
    [translations]
  );

  const handleSave = useCallback(
    async (uri: string): Promise<void> => {
      await saveMediaToGallery(uri, mediaTranslations, toast);
    },
    [mediaTranslations, toast]
  );

  const handleShare = useCallback(
    async (uri: string): Promise<void> => {
      await shareMedia(uri, mediaTranslations, toast);
    },
    [mediaTranslations, toast]
  );

  return {
    generate,
    handleSave,
    handleShare,
  };
}

/**
 * Creates translations object from t function
 * @param t - Translation function
 * @param featureType - Feature type for feature-specific keys
 * @returns Translations object for AIGenerateWizardFlow
 */
export function createWizardTranslations(
  t: (key: string) => string,
  featureType: string
): AIGenerateWizardTranslations {
  const featureKey = featureType.replace(/-/g, "_");
  return {
    headerTitle: t(`home.ai_features.${featureKey}.title`),
    uploadSubtitle: t("imageProcessing.upload.subtitle"),
    uploadSubtitle2: t("imageProcessing.upload.subtitle_2"),
    continue: t("common.actions.continue"),
    tapToUpload: t("imageProcessing.upload.tapToUpload"),
    selectPhoto: t("imageProcessing.upload.selectPhoto"),
    change: t("imageProcessing.upload.change"),
    analyzing: t("imageProcessing.upload.analyzing"),
    error: t("common.error"),
    uploadFailed: t("common.errors.upload_failed"),
    aiDisclosure: t("imageProcessing.upload.aiDisclosure"),
    heroTitle: "",
    heroSubtitle: "",
    presetsTitle: t("common.generation.presets.title"),
    showAdvancedLabel: t("common.generation.advanced.show"),
    hideAdvancedLabel: t("common.generation.advanced.hide"),
    promptTitle: t("common.prompts.custom_prompt"),
    promptPlaceholder: t("common.prompts.placeholder"),
    styleTitle: t("common.generation.style_selector.video_title"),
    durationTitle: t("common.generation.duration_selector.title"),
    generateButton: t("common.actions.generate"),
    generatingButton: t("common.actions.generating"),
    processingTitle: t("common.generation.progress.title"),
    processingMessage: t("common.generation.progress.hint"),
    processingHint: t("common.generation.progress.backgroundHint"),
    successTitle: t("common.generation.success"),
    saveButton: t("common.actions.save"),
    shareButton: t("common.actions.share"),
    tryAgainButton: t("common.actions.try_again"),
    fileTooLarge: t("common.errors.file_too_large"),
    maxFileSize: t("common.errors.max_file_size"),
  };
}

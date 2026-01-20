/**
 * Gallery Result Preview Component
 * Displays result preview when a creation is selected in gallery
 */

import React from "react";
import { useAlert, AlertType, AlertMode } from "@umituz/react-native-design-system";
import { ResultPreviewScreen } from "../../../result-preview/presentation/components/ResultPreviewScreen";
import { StarRatingPicker } from "../../../result-preview/presentation/components/StarRatingPicker";
import { useResultActions } from "../../../result-preview/presentation/hooks/useResultActions";
import type { Creation } from "../../domain/entities/Creation";
import type { CreationsConfig } from "../../domain/value-objects/CreationsConfig";

interface GalleryResultPreviewProps {
  readonly selectedCreation: Creation;
  readonly imageUrl?: string;
  readonly videoUrl?: string;
  readonly showRatingPicker: boolean;
  readonly config: CreationsConfig;
  readonly t: (key: string) => string;
  readonly onBack: () => void;
  readonly onTryAgain: () => void;
  readonly onRate: () => void;
  readonly onSubmitRating: (rating: number, description: string) => void;
  readonly onCloseRating: () => void;
}

export function GalleryResultPreview({
  selectedCreation,
  imageUrl,
  videoUrl,
  showRatingPicker,
  config,
  t,
  onBack,
  onTryAgain,
  onRate,
  onSubmitRating,
  onCloseRating,
}: GalleryResultPreviewProps) {
  const alert = useAlert();

  const { isSaving, isSharing, handleDownload, handleShare } = useResultActions({
    imageUrl,
    videoUrl,
    onSaveSuccess: () => alert.show(AlertType.SUCCESS, AlertMode.TOAST, t("result.saveSuccess"), t("result.saveSuccessMessage")),
    onSaveError: () => alert.show(AlertType.ERROR, AlertMode.TOAST, t("common.error"), t("result.saveError")),
  });

  const hasRating = selectedCreation.rating !== undefined && selectedCreation.rating !== null;

  return (
    <>
      <ResultPreviewScreen
        imageUrl={videoUrl ? undefined : imageUrl}
        videoUrl={videoUrl}
        isSaving={isSaving}
        isSharing={isSharing}
        onDownload={handleDownload}
        onShare={handleShare}
        onTryAgain={onTryAgain}
        onNavigateBack={onBack}
        onRate={onRate}
        hideLabel
        iconOnly
        showTryAgain
        showRating={!hasRating}
        translations={{
          title: t(config.translations.title),
          saveButton: t("result.saveButton"),
          saving: t("result.saving"),
          shareButton: t("result.shareButton"),
          sharing: t("result.sharing"),
          tryAnother: t("result.tryAnother"),
        }}
      />
      <StarRatingPicker
        visible={showRatingPicker}
        onClose={onCloseRating}
        onRate={onSubmitRating}
        title={t("result.rateTitle")}
        submitLabel={t("common.submit")}
        cancelLabel={t("common.cancel")}
        descriptionPlaceholder={t("result.feedbackPlaceholder")}
      />
    </>
  );
}

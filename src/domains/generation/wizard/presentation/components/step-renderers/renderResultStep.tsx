/**
 * Result Step Renderer
 */

import React from "react";
import { extractMediaUrl, getMediaTypeFromUrl } from "@umituz/react-native-design-system";
import { ResultPreviewScreen } from "../../../../../result-preview/presentation/components/ResultPreviewScreen";

export interface ResultStepProps {
  readonly generationResult: unknown;
  readonly isSaving: boolean;
  readonly isSharing: boolean;
  readonly showRating: boolean;
  readonly onDownload: () => void;
  readonly onShare: () => void;
  readonly onRate?: () => void;
  readonly onTryAgain?: () => void;
  readonly onBack: () => void;
  readonly t: (key: string) => string;
  readonly renderResult?: (result: unknown) => React.ReactElement | null;
}

export function renderResultStep({
  generationResult,
  isSaving,
  isSharing,
  showRating,
  onDownload,
  onShare,
  onRate,
  onTryAgain,
  onBack,
  t,
  renderResult,
}: ResultStepProps): React.ReactElement | null {
  if (renderResult) return renderResult(generationResult);

  const media = extractMediaUrl(generationResult);
  if (!media) return null;

  const isVideo = media.isVideo || getMediaTypeFromUrl(media.url) === "video";
  const handleTryAgain = onTryAgain ?? onBack;

  return (
    <ResultPreviewScreen
      imageUrl={isVideo ? undefined : media.url}
      videoUrl={isVideo ? media.url : undefined}
      isSaving={isSaving}
      isSharing={isSharing}
      onDownload={onDownload}
      onShare={onShare}
      onRate={onRate}
      onTryAgain={handleTryAgain}
      onNavigateBack={handleTryAgain}
      hideLabel
      iconOnly
      showTryAgain
      showRating={showRating}
      translations={{
        title: t("generation.result.title"),
        saveButton: t("generation.result.save"),
        saving: t("generation.result.saving"),
        shareButton: t("generation.result.share"),
        sharing: t("generation.result.sharing"),
        tryAnother: t("generation.result.tryAnother"),
      }}
    />
  );
}

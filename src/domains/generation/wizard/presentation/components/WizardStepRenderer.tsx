/**
 * Wizard Step Renderer
 * Orchestrates rendering of different wizard step types
 */

import React from "react";
import { extractMediaUrl, getMediaTypeFromUrl } from "@umituz/react-native-design-system/media";
import { StepType } from "../../../../../domain/entities/flow-config.types";
import { GeneratingScreen } from "../screens/GeneratingScreen";
import { ResultPreviewScreen } from "../../../../result-preview/presentation/components/ResultPreviewScreen";
import { renderPreviewStep } from "./step-renderers/renderPreviewStep";
import { renderPhotoUploadStep } from "./step-renderers/renderPhotoUploadStep";
import { renderTextInputStep } from "./step-renderers/renderTextInputStep";
import { renderSelectionStep } from "./step-renderers/renderSelectionStep";
import type { WizardStepRendererProps } from "./WizardStepRenderer.types";

export const WizardStepRenderer: React.FC<WizardStepRendererProps> = ({
  step,
  scenario,
  customData,
  generationProgress,
  generationResult,
  isSaving,
  isSharing,
  showRating = true,
  creditCost,
  onNext,
  onBack,
  onPhotoContinue,
  calculateCreditForSelection,
  onDownload,
  onShare,
  onRate,
  onTryAgain,
  onDismissGenerating,
  t,
  alertMessages,
  renderPreview,
  renderGenerating,
  renderResult,
}) => {
  if (!step) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.warn("[WizardStepRenderer] No current step!");
    }
    return null;
  }

  switch (step.type) {
    case StepType.SCENARIO_PREVIEW:
      return renderPreviewStep({ step, scenario, onNext, onBack, t, renderPreview });

    case StepType.GENERATING: {
      if (renderGenerating) return renderGenerating(generationProgress);
      return <GeneratingScreen progress={generationProgress} scenario={scenario} t={t} onDismiss={onDismissGenerating} />;
    }

    case StepType.RESULT_PREVIEW: {
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

    case StepType.PARTNER_UPLOAD:
      return renderPhotoUploadStep({ key: step.id, step, customData, onBack, onPhotoContinue, t, creditCost });

    case StepType.TEXT_INPUT:
      return renderTextInputStep({ key: step.id, step, customData, onBack, onPhotoContinue, t, alertMessages, creditCost });

    case StepType.FEATURE_SELECTION:
      return renderSelectionStep({ key: step.id, step, customData, onBack, onPhotoContinue, calculateCreditForSelection, t, creditCost });

    default:
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.warn("[WizardStepRenderer] Unhandled step type", { stepType: step.type });
      }
      return null;
  }
};

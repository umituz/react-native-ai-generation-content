import React from "react";
import { getMediaTypeFromUrl, extractMediaUrl } from "@umituz/react-native-design-system";
import { StepType } from "../../../../../domain/entities/flow-config.types";
import { GenericPhotoUploadScreen } from "../screens/GenericPhotoUploadScreen";
import { GeneratingScreen } from "../screens/GeneratingScreen";
import { ScenarioPreviewScreen } from "../../../../scenarios/presentation/screens/ScenarioPreviewScreen";
import { ResultPreviewScreen } from "../../../../result-preview/presentation/components/ResultPreviewScreen";
import { getWizardStepConfig, getUploadedImage } from "./WizardStepRenderer.utils";
import type { WizardStepRendererProps } from "./WizardStepRenderer.types";

export type { WizardStepRendererProps } from "./WizardStepRenderer.types";

export const WizardStepRenderer: React.FC<WizardStepRendererProps> = ({
  step,
  scenario,
  customData,
  generationProgress,
  generationResult,
  isSaving,
  isSharing,
  showRating = true,
  onNext,
  onBack,
  onPhotoContinue,
  onDownload,
  onShare,
  onRate,
  onTryAgain,
  t,
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
    case StepType.SCENARIO_PREVIEW: {
      if (renderPreview) return renderPreview(onNext);
      if (!scenario) return null;
      return (
        <ScenarioPreviewScreen
          scenario={scenario}
          translations={{
            continueButton: t("common.continue"),
            whatToExpect: t("scenarioPreview.whatToExpect"),
          }}
          onContinue={onNext}
          onBack={onBack}
          t={t}
        />
      );
    }

    case StepType.GENERATING: {
      if (renderGenerating) return renderGenerating(generationProgress);
      return (
        <GeneratingScreen progress={generationProgress} scenario={scenario} t={t} />
      );
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

    case StepType.PARTNER_UPLOAD: {
      const wizardConfig = getWizardStepConfig(step.config);
      const titleKey = wizardConfig?.titleKey ?? `wizard.steps.${step.id}.title`;
      const subtitleKey = wizardConfig?.subtitleKey ?? `wizard.steps.${step.id}.subtitle`;
      const existingPhoto = getUploadedImage(customData[step.id]);

      return (
        <GenericPhotoUploadScreen
          stepId={step.id}
          translations={{
            title: t(titleKey),
            subtitle: t(subtitleKey),
            continue: t("common.continue"),
            tapToUpload: t("photoUpload.tapToUpload"),
            selectPhoto: t("photoUpload.selectPhoto"),
            change: t("common.change"),
            fileTooLarge: t("common.errors.file_too_large"),
            maxFileSize: t("common.errors.max_file_size"),
            error: t("common.error"),
            uploadFailed: t("common.errors.upload_failed"),
          }}
          t={t}
          onBack={onBack}
          onContinue={(image) => onPhotoContinue(step.id, image)}
          existingImage={existingPhoto}
        />
      );
    }

    default:
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.warn("[WizardStepRenderer] Unhandled step type", { stepType: step.type });
      }
      return null;
  }
};

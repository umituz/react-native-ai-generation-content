import React from "react";
import { extractMediaUrl, getMediaTypeFromUrl } from "@umituz/react-native-design-system";
import { StepType } from "../../../../../domain/entities/flow-config.types";
import { GenericPhotoUploadScreen } from "../screens/GenericPhotoUploadScreen";
import { GeneratingScreen } from "../screens/GeneratingScreen";
import { TextInputScreen } from "../screens/TextInputScreen";
import { SelectionScreen } from "../screens/SelectionScreen";
import { ScenarioPreviewScreen } from "../../../../scenarios/presentation/screens/ScenarioPreviewScreen";
import { ResultPreviewScreen } from "../../../../result-preview/presentation/components/ResultPreviewScreen";
import { getWizardStepConfig, getTextInputConfig, getSelectionConfig, getUploadedImage } from "./WizardStepRenderer.utils";
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

    case StepType.TEXT_INPUT: {
      const textConfig = getTextInputConfig(step.config);
      const titleKey = textConfig?.titleKey ?? `wizard.steps.${step.id}.title`;
      const subtitleKey = textConfig?.subtitleKey ?? `wizard.steps.${step.id}.subtitle`;
      const placeholderKey = textConfig?.placeholderKey ?? `wizard.steps.${step.id}.placeholder`;
      const existingData = customData[step.id];
      const existingText = typeof existingData === "string"
        ? existingData
        : typeof existingData === "object" && existingData !== null && "text" in existingData
          ? String((existingData as { text: string }).text)
          : "";

      return (
        <TextInputScreen
          stepId={step.id}
          translations={{
            title: t(titleKey),
            subtitle: subtitleKey ? t(subtitleKey) : undefined,
            placeholder: t(placeholderKey),
            continueButton: t("common.continue"),
            backButton: t("common.back"),
            examplesTitle: t("textInput.examplesTitle"),
          }}
          config={{
            minLength: textConfig?.minLength ?? 3,
            maxLength: textConfig?.maxLength ?? 1000,
            multiline: textConfig?.multiline ?? true,
          }}
          initialValue={existingText}
          onBack={onBack}
          onContinue={(text) => {
            // Store text in a structure compatible with existing handlers
            onPhotoContinue(step.id, { uri: text, text, previewUrl: "" } as any);
          }}
        />
      );
    }

    case StepType.FEATURE_SELECTION: {
      const selectionConfig = getSelectionConfig(step.config);
      const titleKey = selectionConfig?.titleKey ?? `wizard.steps.${step.id}.title`;
      const subtitleKey = selectionConfig?.subtitleKey ?? `wizard.steps.${step.id}.subtitle`;
      const existingValue = customData[step.id] as string | string[] | undefined;

      const options = selectionConfig?.options ?? [];

      return (
        <SelectionScreen
          stepId={step.id}
          translations={{
            title: t(titleKey),
            subtitle: subtitleKey ? t(subtitleKey) : undefined,
            continueButton: t("common.continue"),
            backButton: t("common.back"),
          }}
          options={options.map((opt) => ({
            id: opt.id,
            label: opt.label,
            icon: opt.icon,
            value: opt.value,
          }))}
          config={{
            multiSelect: selectionConfig?.multiSelect ?? false,
            required: step.required ?? true,
          }}
          initialValue={existingValue}
          onBack={onBack}
          onContinue={(value) => {
            // Store selection value
            onPhotoContinue(step.id, { uri: String(value), selection: value, previewUrl: "" } as any);
          }}
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

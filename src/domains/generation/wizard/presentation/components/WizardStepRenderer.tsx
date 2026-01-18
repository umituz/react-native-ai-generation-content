/**
 * Wizard Step Renderer Component
 * Renders the appropriate screen based on current step type
 */

import React from "react";
import { StepType, type StepDefinition } from "../../../../../domain/entities/flow-config.types";
import type { WizardStepConfig } from "../../domain/entities/wizard-config.types";
import type { WizardScenarioData } from "../hooks/useWizardGeneration";
import type { UploadedImage } from "../../../../../presentation/hooks/generation/useAIGenerateState";
import type { Creation } from "../../../../creations/domain/entities/Creation";
import { GenericPhotoUploadScreen } from "../screens/GenericPhotoUploadScreen";
import { GeneratingScreen } from "../screens/GeneratingScreen";
import { ScenarioPreviewScreen } from "../../../../scenarios/presentation/screens/ScenarioPreviewScreen";
import type { ScenarioData } from "../../../../scenarios/domain/scenario.types";
import { ResultPreviewScreen } from "../../../../result-preview/presentation/components/ResultPreviewScreen";

export interface WizardStepRendererProps {
  readonly step: StepDefinition | undefined;
  readonly scenario?: WizardScenarioData;
  readonly customData: Record<string, unknown>;
  readonly generationProgress: number;
  readonly generationResult: unknown;
  readonly isSaving: boolean;
  readonly isSharing: boolean;
  readonly onNext: () => void;
  readonly onBack: () => void;
  readonly onPhotoContinue: (stepId: string, image: UploadedImage) => void;
  readonly onDownload: () => void;
  readonly onShare: () => void;
  readonly onTryAgain?: () => void;
  readonly t: (key: string) => string;
  readonly renderPreview?: (onContinue: () => void) => React.ReactElement | null;
  readonly renderGenerating?: (progress: number) => React.ReactElement | null;
  readonly renderResult?: (result: unknown) => React.ReactElement | null;
}

export const WizardStepRenderer: React.FC<WizardStepRendererProps> = ({
  step,
  scenario,
  customData,
  generationProgress,
  generationResult,
  isSaving,
  isSharing,
  onNext,
  onBack,
  onPhotoContinue,
  onDownload,
  onShare,
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
      if (renderPreview) {
        return renderPreview(onNext);
      }
      if (!scenario) return null;
      return (
        <ScenarioPreviewScreen
          scenario={scenario as unknown as ScenarioData}
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
      if (renderGenerating) {
        return renderGenerating(generationProgress);
      }
      return (
        <GeneratingScreen
          progress={generationProgress}
          scenario={scenario}
          t={t}
        />
      );
    }

    case StepType.RESULT_PREVIEW: {
      if (renderResult) {
        return renderResult(generationResult);
      }
      const creation = generationResult as Creation;
      const imageUrl = creation?.output?.imageUrl || creation?.uri || "";
      if (!imageUrl) return null;
      return (
        <ResultPreviewScreen
          imageUrl={imageUrl}
          isSaving={isSaving}
          isSharing={isSharing}
          onDownload={onDownload}
          onShare={onShare}
          onTryAgain={onTryAgain || onBack}
          onNavigateBack={onTryAgain || onBack}
          translations={{
            title: t("generation.result.title"),
            yourResult: t("generation.result.yourResult"),
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
      const wizardConfig = step.config as WizardStepConfig;
      const titleKey = wizardConfig?.titleKey || `wizard.steps.${step.id}.title`;
      const subtitleKey = wizardConfig?.subtitleKey || `wizard.steps.${step.id}.subtitle`;
      const existingPhoto = customData[step.id] as UploadedImage | undefined;

      return (
        <GenericPhotoUploadScreen
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

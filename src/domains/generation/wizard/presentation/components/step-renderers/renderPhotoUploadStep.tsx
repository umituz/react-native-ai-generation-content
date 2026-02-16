/**
 * Photo Upload Step Renderer
 */

import React from "react";
import { GenericPhotoUploadScreen } from "../../screens/GenericPhotoUploadScreen";
import { getWizardStepConfig, getUploadedImage } from "../WizardStepRenderer.utils";
import type { StepDefinition } from "../../../../../../domain/entities/flow-config.types";
import type { UploadedImage } from "../../../../../../presentation/hooks/generation/useAIGenerateState";

export interface PhotoUploadStepProps {
  readonly key?: string;
  readonly step: StepDefinition;
  readonly customData: Record<string, unknown>;
  readonly onBack: () => void;
  readonly onPhotoContinue: (stepId: string, image: UploadedImage) => void;
  readonly t: (key: string) => string;
  readonly creditCost?: number;
}

export function renderPhotoUploadStep({
  step,
  customData,
  onBack,
  onPhotoContinue,
  t,
  creditCost,
}: PhotoUploadStepProps): React.ReactElement {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[renderPhotoUploadStep] Rendering", {
      stepId: step.id,
      hasOnPhotoContinue: !!onPhotoContinue,
      creditCost,
    });
  }
  const wizardConfig = getWizardStepConfig(step.config);
  const titleKey = wizardConfig?.titleKey ?? `wizard.steps.${step.id}.title`;
  const subtitleKey = wizardConfig?.subtitleKey ?? `wizard.steps.${step.id}.subtitle`;
  const existingPhoto = getUploadedImage(customData[step.id]);

  return (
    <GenericPhotoUploadScreen
      key={step.id}
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
      creditCost={creditCost}
      onBack={onBack}
      onContinue={(image) => onPhotoContinue(step.id, image)}
      existingImage={existingPhoto}
    />
  );
}

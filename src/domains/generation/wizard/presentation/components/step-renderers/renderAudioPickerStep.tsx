/**
 * Audio Picker Step Renderer
 */

import React from "react";
import { AudioPickerScreen } from "../../screens/AudioPickerScreen";
import { getAudioPickerConfig } from "../WizardStepRenderer.utils";
import type { StepDefinition } from "../../../../../../domain/entities/flow-config.types";
import type { UploadedImage } from "../../../../../../presentation/hooks/generation/useAIGenerateState";

interface AudioPickerStepProps {
  readonly key?: string;
  readonly step: StepDefinition;
  readonly onBack: () => void;
  readonly onPhotoContinue: (stepId: string, image: UploadedImage) => void;
  readonly t: (key: string) => string;
  readonly creditCost?: number;
}

export function renderAudioPickerStep({
  step,
  onBack,
  onPhotoContinue,
  t,
  creditCost,
}: AudioPickerStepProps): React.ReactElement {
  const audioConfig = getAudioPickerConfig(step.config);
  const titleKey = audioConfig?.titleKey ?? `wizard.steps.${step.id}.title`;
  const subtitleKey = audioConfig?.subtitleKey;
  const isOptional = !(step.required ?? true);

  return (
    <AudioPickerScreen
      key={step.id}
      stepId={step.id}
      translations={{
        title: t(titleKey),
        subtitle: subtitleKey ? t(subtitleKey) : undefined,
        selectButton: t("audioPicker.selectFile"),
        skipButton: t("audioPicker.skip"),
        continueButton: t("common.continue"),
        selectedLabel: t("audioPicker.selected"),
        fileTooLarge: t("common.errors.file_too_large"),
        unsupportedFormat: t("audioPicker.unsupportedFormat"),
      }}
      allowedTypes={audioConfig?.allowedTypes as string[] | undefined}
      maxFileSizeMB={audioConfig?.maxFileSizeMB}
      optional={isOptional}
      creditCost={creditCost}
      onBack={onBack}
      onContinue={(audioUri) => {
        onPhotoContinue(step.id, { uri: audioUri, previewUrl: "" } as UploadedImage);
      }}
    />
  );
}

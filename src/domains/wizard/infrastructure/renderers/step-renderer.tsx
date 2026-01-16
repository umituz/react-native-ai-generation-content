/**
 * Generic Step Renderer
 * Renders any step type based on configuration
 * NO feature-specific code! Works for ALL features!
 */

import React from "react";
import { StepType } from "../../../../domain/entities/flow-config.types";
import type { StepDefinition } from "../../../../domain/entities/flow-config.types";
import type {
  WizardStepConfig,
  PhotoUploadStepConfig,
  TextInputStepConfig,
  SelectionStepConfig,
} from "../../domain/entities/wizard-config.types";

// Import generic step components (will create these)
import { PhotoUploadStep } from "../../presentation/steps/PhotoUploadStep";
import { TextInputStep } from "../../presentation/steps/TextInputStep";
import { SelectionStep } from "../../presentation/steps/SelectionStep";

export interface StepRendererProps {
  readonly step: StepDefinition;
  readonly onContinue: (data: Record<string, unknown>) => void;
  readonly onBack: () => void;
  readonly t: (key: string) => string;
  readonly translations?: Record<string, string>;
}

/**
 * Render a step based on its type and configuration
 * This is the ONLY renderer needed for ALL features!
 */
export const renderStep = (props: StepRendererProps): React.ReactElement | null => {
  const { step, onContinue, onBack, t, translations } = props;

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[StepRenderer] Rendering step", {
      stepId: step.id,
      stepType: step.type,
      hasConfig: !!step.config,
    });
  }

  const wizardConfig = step.config as WizardStepConfig | undefined;

  switch (step.type) {
    case StepType.PARTNER_UPLOAD: {
      // This handles ALL photo uploads (couple, face-swap, image-to-video, etc.)
      const photoConfig = wizardConfig as PhotoUploadStepConfig;
      return (
        <PhotoUploadStep
          config={photoConfig}
          onContinue={(imageData) => {
            onContinue({ [`photo_${step.id}`]: imageData });
          }}
          onBack={onBack}
          t={t}
          translations={translations}
        />
      );
    }

    case StepType.TEXT_INPUT: {
      const textConfig = wizardConfig as TextInputStepConfig;
      return (
        <TextInputStep
          config={textConfig}
          onContinue={(text) => {
            onContinue({ text });
          }}
          onBack={onBack}
          t={t}
          translations={translations}
        />
      );
    }

    case StepType.FEATURE_SELECTION: {
      const selectionConfig = wizardConfig as SelectionStepConfig;
      return (
        <SelectionStep
          config={selectionConfig}
          onContinue={(selected) => {
            onContinue({ [`selection_${step.id}`]: selected });
          }}
          onBack={onBack}
          t={t}
          translations={translations}
        />
      );
    }

    case StepType.SCENARIO_PREVIEW:
    case StepType.GENERATING:
    case StepType.RESULT_PREVIEW:
      // These are handled by parent wizard component
      return null;

    default:
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.warn("[StepRenderer] Unknown step type", step.type);
      }
      return null;
  }
};

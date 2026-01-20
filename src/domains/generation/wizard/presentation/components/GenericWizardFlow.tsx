/**
 * Generic Wizard Flow Component
 * Config-driven wizard for AI generation features
 * Supports both scenario object and scenarioId (resolved from registry)
 */

import React, { useMemo } from "react";
import type { StepType } from "../../../../../domain/entities/flow-config.types";
import type { WizardFeatureConfig } from "../../domain/entities/wizard-config.types";
import type { WizardScenarioData } from "../hooks/useWizardGeneration";
import type { AlertMessages } from "../../../../../presentation/hooks/generation/types";
import { validateScenario } from "../utilities/validateScenario";
import { WizardFlowContent } from "./WizardFlowContent";
import {
  getConfiguredScenario,
  getDefaultOutputType,
} from "../../../../scenarios/infrastructure/scenario-registry";

declare const __DEV__: boolean;

export interface GenericWizardFlowProps {
  readonly featureConfig: WizardFeatureConfig;
  readonly scenario?: WizardScenarioData;
  readonly scenarioId?: string;
  readonly userId?: string;
  readonly alertMessages: AlertMessages;
  readonly skipResultStep?: boolean;
  readonly onStepChange?: (stepId: string, stepType: StepType | string) => void;
  readonly onGenerationStart?: (
    data: Record<string, unknown>,
    proceedToGenerating: () => void,
  ) => void;
  readonly onGenerationComplete?: (result: unknown) => void;
  readonly onGenerationError?: (error: string) => void;
  readonly onCreditsExhausted?: () => void;
  readonly onBack?: () => void;
  readonly onTryAgain?: () => void;
  readonly t: (key: string) => string;
  readonly translations?: Record<string, string>;
  readonly renderPreview?: (onContinue: () => void) => React.ReactElement | null;
  readonly renderGenerating?: (progress: number) => React.ReactElement | null;
  readonly renderResult?: (result: unknown) => React.ReactElement | null;
}

export const GenericWizardFlow: React.FC<GenericWizardFlowProps> = (props) => {
  const {
    featureConfig,
    scenario: scenarioProp,
    scenarioId,
    userId,
    alertMessages,
    skipResultStep = false,
    onStepChange,
    onGenerationStart,
    onGenerationComplete,
    onGenerationError,
    onCreditsExhausted,
    onBack,
    onTryAgain,
    t,
    renderPreview,
    renderGenerating,
    renderResult,
  } = props;

  // Resolve scenario from prop or registry
  const scenario = useMemo<WizardScenarioData | undefined>(() => {
    if (scenarioProp) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[GenericWizardFlow] Using scenario from prop:", {
          id: scenarioProp.id,
          outputType: scenarioProp.outputType,
        });
      }
      return scenarioProp;
    }

    if (scenarioId) {
      const found = getConfiguredScenario(scenarioId);
      if (found) {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[GenericWizardFlow] Resolved from registry:", {
            id: found.id,
            outputType: found.outputType,
          });
        }
        return found;
      }
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.warn("[GenericWizardFlow] Scenario not in registry:", scenarioId);
      }
      return { id: scenarioId, outputType: getDefaultOutputType() };
    }

    return undefined;
  }, [scenarioProp, scenarioId]);

  const validatedScenario = useMemo(() => validateScenario(scenario), [scenario]);

  return (
    <WizardFlowContent
      featureConfig={featureConfig}
      scenario={scenario}
      validatedScenario={validatedScenario}
      userId={userId}
      alertMessages={alertMessages}
      skipResultStep={skipResultStep}
      onStepChange={onStepChange}
      onGenerationStart={onGenerationStart}
      onGenerationComplete={onGenerationComplete}
      onGenerationError={onGenerationError}
      onCreditsExhausted={onCreditsExhausted}
      onBack={onBack}
      onTryAgain={onTryAgain}
      t={t}
      renderPreview={renderPreview}
      renderGenerating={renderGenerating}
      renderResult={renderResult}
    />
  );
};

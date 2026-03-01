/**
 * Generic Wizard Flow Component
 * Config-driven wizard for AI generation features
 * Supports both scenario object and scenarioId (resolved from registry)
 */

import React, { useMemo } from "react";
import type { StepType } from "../../../../../domain/entities/flow-config.types";
import type { WizardFeatureConfig } from "../../domain/entities/wizard-feature.types";
import type { WizardScenarioData } from "../hooks/useWizardGeneration";
import type { AlertMessages } from "../../../../../presentation/hooks/generation/types";
import type { GenerationErrorInfo } from "./WizardFlow.types";
import type { CreditCalculatorFn } from "../../domain/types/credit-calculation.types";
import type { VideoModelConfig } from "../../../../../domain/interfaces/video-model-config.types";
import { validateScenario } from "../utilities/validateScenario";
import { WizardFlowContent } from "./WizardFlowContent";
import {
  getConfiguredScenario,
  getDefaultOutputType,
} from "../../../../scenarios/infrastructure/scenario-registry";


export interface GenericWizardFlowProps {
  readonly featureConfig: WizardFeatureConfig;
  readonly scenario?: WizardScenarioData;
  readonly scenarioId?: string;
  /** Model configuration - encapsulates all model-specific behavior */
  readonly modelConfig?: VideoModelConfig;
  readonly userId?: string;
  readonly alertMessages: AlertMessages;
  /** Credit cost for this generation - REQUIRED, determined by the app */
  readonly creditCost: number;
  /** Calculator function provided by APP - package calls this to get dynamic cost */
  readonly calculateCredits?: CreditCalculatorFn;
  /** Called after successful generation to deduct credits — provided by the app */
  readonly deductCredits?: (cost: number) => Promise<boolean>;
  readonly skipResultStep?: boolean;
  readonly onStepChange?: (stepId: string, stepType: StepType | string) => void;
  /** When true, the GENERATING step is visible but generation waits (e.g. for prompt enhancement) */
  readonly isPreparing?: boolean;
  readonly onGenerationStart?: (
    data: Record<string, unknown>,
    proceedToGenerating: () => void,
    onError?: (error: string) => void,
  ) => void;
  readonly onGenerationComplete?: (result: unknown) => void;
  readonly onGenerationError?: (error: string, errorInfo?: GenerationErrorInfo) => void;
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
    modelConfig,
    userId,
    alertMessages,
    creditCost,
    calculateCredits,
    deductCredits,
    skipResultStep = false,
    onStepChange,
    isPreparing = false,
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
      modelConfig={modelConfig}
      userId={userId}
      alertMessages={alertMessages}
      creditCost={creditCost}
      calculateCredits={calculateCredits}
      deductCredits={deductCredits}
      skipResultStep={skipResultStep}
      isPreparing={isPreparing}
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

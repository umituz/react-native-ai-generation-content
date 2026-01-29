/**
 * Wizard Flow Handlers Hook
 * Extracts callback handlers from WizardFlowContent
 */

import { useCallback } from "react";
import { AlertType, AlertMode, useAlert } from "@umituz/react-native-design-system";
import { StepType, type StepDefinition } from "../../../../../domain/entities/flow-config.types";
import type { UploadedImage } from "../../../../../presentation/hooks/generation/useAIGenerateState";
import type { Creation } from "../../../../creations/domain/entities/Creation";

declare const __DEV__: boolean;

export interface UseWizardFlowHandlersProps {
  readonly currentStepIndex: number;
  readonly flowSteps: StepDefinition[];
  readonly customData: Record<string, unknown>;
  readonly skipResultStep: boolean;
  readonly userId?: string;
  readonly currentCreation: Creation | null;
  readonly repository: { rate: (uid: string, id: string, rating: number, desc: string) => Promise<boolean> };
  readonly t: (key: string) => string;
  readonly nextStep: () => void;
  readonly previousStep: () => void;
  readonly setResult: (result: unknown) => void;
  readonly setCustomData: (stepId: string, data: unknown) => void;
  readonly setCurrentCreation: (creation: Creation | null) => void;
  readonly setHasRated: (hasRated: boolean) => void;
  readonly setShowRatingPicker: (show: boolean) => void;
  readonly onGenerationStart?: (data: Record<string, unknown>, proceed: () => void) => void;
  readonly onGenerationComplete?: (result: unknown) => void;
  readonly onGenerationError?: (error: string) => void;
  readonly onBack?: () => void;
}

export function useWizardFlowHandlers(props: UseWizardFlowHandlersProps) {
  const {
    currentStepIndex,
    flowSteps,
    customData,
    skipResultStep,
    userId,
    currentCreation,
    repository,
    t,
    nextStep,
    previousStep,
    setResult,
    setCustomData,
    setCurrentCreation,
    setHasRated,
    setShowRatingPicker,
    onGenerationStart,
    onGenerationComplete,
    onGenerationError,
    onBack,
  } = props;

  const alert = useAlert();

  const handleGenerationComplete = useCallback(
    (result: unknown) => {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[WizardFlowHandlers] Generation completed");
      }
      setResult(result);
      setCurrentCreation(result as Creation);
      onGenerationComplete?.(result);
      if (!skipResultStep) nextStep();
    },
    [setResult, setCurrentCreation, nextStep, onGenerationComplete, skipResultStep],
  );

  const handleGenerationError = useCallback(
    (errorMessage: string) => {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[WizardFlowHandlers] Generation error:", errorMessage);
      }
      // Translate error key if it looks like a translation key
      const displayMessage = errorMessage.startsWith("error.")
        ? t(errorMessage)
        : errorMessage;
      // Show error alert to user
      alert.show(
        AlertType.ERROR,
        AlertMode.MODAL,
        t("common.error"),
        displayMessage,
      );
      // Notify parent component
      onGenerationError?.(errorMessage);
      // Close the wizard
      onBack?.();
    },
    [alert, t, onGenerationError, onBack],
  );

  const handleDismissGenerating = useCallback(() => {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[WizardFlowHandlers] Dismissing - generation continues");
    }
    alert.show(
      AlertType.INFO,
      AlertMode.TOAST,
      t("generator.backgroundTitle"),
      t("generator.backgroundMessage"),
    );
    onBack?.();
  }, [alert, t, onBack]);

  const handleBack = useCallback(() => {
    if (currentStepIndex === 0) onBack?.();
    else previousStep();
  }, [currentStepIndex, previousStep, onBack]);

  const handleNextStep = useCallback(() => {
    const nextStepDef = flowSteps[currentStepIndex + 1];
    if (nextStepDef?.type === StepType.GENERATING && onGenerationStart) {
      onGenerationStart(customData, nextStep);
      return;
    }
    nextStep();
  }, [currentStepIndex, flowSteps, customData, onGenerationStart, nextStep]);

  const handlePhotoContinue = useCallback(
    (stepId: string, image: UploadedImage) => {
      setCustomData(stepId, image);
      handleNextStep();
    },
    [setCustomData, handleNextStep],
  );

  const handleSubmitRating = useCallback(
    async (rating: number, description: string) => {
      if (!currentCreation?.id || !userId) return;
      const success = await repository.rate(userId, currentCreation.id, rating, description);
      if (success) {
        setHasRated(true);
        alert.show(
          AlertType.SUCCESS,
          AlertMode.TOAST,
          t("result.rateSuccessTitle"),
          t("result.rateSuccessMessage"),
        );
      }
      setShowRatingPicker(false);
    },
    [currentCreation, userId, repository, alert, t, setHasRated, setShowRatingPicker],
  );

  return {
    handleGenerationComplete,
    handleGenerationError,
    handleDismissGenerating,
    handleBack,
    handleNextStep,
    handlePhotoContinue,
    handleSubmitRating,
  };
}

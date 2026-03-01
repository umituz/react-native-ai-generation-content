/**
 * Wizard Flow Handlers - Composition Hook
 * Combines generation, navigation, and rating handlers
 */

import { useCallback } from "react";
import { AlertType, AlertMode, useAlert } from "@umituz/react-native-design-system/molecules";
import type { UseWizardFlowHandlersProps } from "./wizard-flow-handlers.types";
import { useGenerationHandlers } from "./useGenerationHandlers";
import { useNavigationHandlers } from "./useNavigationHandlers";

export function useWizardFlowHandlers(props: UseWizardFlowHandlersProps) {
  const {
    currentStepIndex, flowSteps, customData, userId, currentCreation,
    repository, t, nextStep, previousStep, setCustomData,
    onGenerationStart, onBack,
  } = props;

  const alert = useAlert();

  const generation = useGenerationHandlers({
    skipResultStep: props.skipResultStep,
    t,
    nextStep,
    setResult: props.setResult,
    setCurrentCreation: props.setCurrentCreation,
    onGenerationComplete: props.onGenerationComplete,
    onGenerationError: props.onGenerationError,
    onBack,
  });

  const navigation = useNavigationHandlers({
    currentStepIndex,
    flowSteps,
    customData,
    nextStep,
    previousStep,
    setCustomData,
    onGenerationStart,
    handleGenerationError: generation.handleGenerationError,
    onBack,
  });

  const handleSubmitRating = useCallback(
    async (rating: number, description: string) => {
      if (!currentCreation?.id || !userId) return;
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[handleSubmitRating] Called", { creationId: currentCreation.id, rating });
      }
      const success = await repository.rate(userId, currentCreation.id, rating, description);
      if (success) {
        props.setHasRated(true);
        alert.show(AlertType.SUCCESS, AlertMode.TOAST, t("result.rateSuccessTitle"), t("result.rateSuccessMessage"));
      }
      props.setShowRatingPicker(false);
    },
    [currentCreation, userId, repository, alert, t, props.setHasRated, props.setShowRatingPicker],
  );

  return {
    handleGenerationComplete: generation.handleGenerationComplete,
    handleGenerationError: generation.handleGenerationError,
    handleDismissGenerating: generation.handleDismissGenerating,
    handleBack: navigation.handleBack,
    handleNextStep: navigation.handleNextStep,
    handlePhotoContinue: navigation.handlePhotoContinue,
    handleSubmitRating,
  };
}

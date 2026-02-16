import { useCallback } from "react";
import { AlertType, AlertMode, useAlert } from "@umituz/react-native-design-system";
import { StepType, type StepDefinition } from "../../../../../domain/entities/flow-config.types";
import type { UploadedImage } from "../../../../../presentation/hooks/generation/useAIGenerateState";
import type { Creation } from "../../../../creations/domain/entities/Creation";
import { isCreation } from "./typeGuards";
import { classifyError } from "../../../../../infrastructure/utils/error-classification";
import type { GenerationErrorInfo } from "../components/WizardFlow.types";

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
  readonly onGenerationStart?: (data: Record<string, unknown>, proceed: () => void, onError?: (error: string) => void) => void;
  readonly onGenerationComplete?: (result: unknown) => void;
  readonly onGenerationError?: (error: string, errorInfo?: GenerationErrorInfo) => void;
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
      setResult(result);
      setCurrentCreation(isCreation(result) ? result : null);
      onGenerationComplete?.(result);
      if (!skipResultStep) nextStep();
    },
    [setResult, setCurrentCreation, nextStep, onGenerationComplete, skipResultStep],
  );

  const handleGenerationError = useCallback(
    (errorMessage: string) => {
      const safeErrorMessage = errorMessage?.trim() || "error.generation.unknown";
      const displayMessage = safeErrorMessage.startsWith("error.") ? t(safeErrorMessage) : safeErrorMessage;

      // Classify error to determine refund eligibility
      const errorClassification = classifyError(errorMessage);
      const errorInfo: GenerationErrorInfo = {
        message: safeErrorMessage,
        shouldRefund: errorClassification.retryable ?? false,
        errorType: errorClassification.type,
      };

      alert.show(AlertType.ERROR, AlertMode.MODAL, t("common.error"), displayMessage);
      onGenerationError?.(safeErrorMessage, errorInfo);
      onBack?.();
    },
    [alert, t, onGenerationError, onBack],
  );

  const handleDismissGenerating = useCallback(() => {
    alert.show(AlertType.INFO, AlertMode.TOAST, t("generator.backgroundTitle"), t("generator.backgroundMessage"));
    onBack?.();
  }, [alert, t, onBack]);

  const handleBack = useCallback(() => {
    if (currentStepIndex === 0) onBack?.();
    else previousStep();
  }, [currentStepIndex, previousStep, onBack]);

  const handleNextStep = useCallback((additionalData?: Record<string, unknown>) => {
    const nextStepDef = flowSteps[currentStepIndex + 1];
    // Merge additionalData to avoid stale closure issue
    // When called from handlePhotoContinue, customData in closure may not include the just-set value
    // Guard: Only merge plain objects (ignore SyntheticEvents from onPress handlers)
    const isPlainObject = additionalData && typeof additionalData === "object" && !("nativeEvent" in additionalData) && !Array.isArray(additionalData);
    const mergedData = isPlainObject ? { ...customData, ...additionalData } : customData;
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[handleNextStep] Called", {
        currentStepIndex,
        nextStepType: nextStepDef?.type,
        nextStepId: nextStepDef?.id,
        totalSteps: flowSteps.length,
        hasOnGenerationStart: !!onGenerationStart,
        dataKeys: Object.keys(mergedData),
      });
    }
    if (nextStepDef?.type === StepType.GENERATING && onGenerationStart) {
      onGenerationStart(mergedData, nextStep, handleGenerationError);
      return;
    }
    nextStep();
  }, [currentStepIndex, flowSteps, customData, onGenerationStart, nextStep, handleGenerationError]);

  const handlePhotoContinue = useCallback(
    (stepId: string, image: UploadedImage) => {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[handlePhotoContinue] Called", { stepId, hasImage: !!image, currentStepIndex });
      }
      setCustomData(stepId, image);
      // Pass the just-set data to avoid stale closure issue
      handleNextStep({ [stepId]: image });
    },
    [setCustomData, handleNextStep, currentStepIndex],
  );

  const handleSubmitRating = useCallback(
    async (rating: number, description: string) => {
      if (!currentCreation?.id || !userId) return;
      const success = await repository.rate(userId, currentCreation.id, rating, description);
      if (success) {
        setHasRated(true);
        alert.show(AlertType.SUCCESS, AlertMode.TOAST, t("result.rateSuccessTitle"), t("result.rateSuccessMessage"));
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

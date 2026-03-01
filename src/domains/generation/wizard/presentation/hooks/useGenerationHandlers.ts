/**
 * Generation-specific handlers: complete, error, dismiss
 */

import { useCallback } from "react";
import { AlertType, AlertMode, useAlert } from "@umituz/react-native-design-system/molecules";
import type { Creation } from "../../../../creations/domain/entities/Creation";
import { isCreation } from "./typeGuards";
import { classifyError } from "../../../../../infrastructure/utils/error-classification";
import type { GenerationErrorInfo } from "../components/WizardFlow.types";

interface UseGenerationHandlersProps {
  readonly skipResultStep: boolean;
  readonly t: (key: string) => string;
  readonly nextStep: () => void;
  readonly setResult: (result: unknown) => void;
  readonly setCurrentCreation: (creation: Creation | null) => void;
  readonly onGenerationComplete?: (result: unknown) => void;
  readonly onGenerationError?: (error: string, errorInfo?: GenerationErrorInfo) => void;
  readonly onBack?: () => void;
}

export function useGenerationHandlers(props: UseGenerationHandlersProps) {
  const { skipResultStep, t, nextStep, setResult, setCurrentCreation, onGenerationComplete, onGenerationError, onBack } = props;

  const alert = useAlert();

  const handleGenerationComplete = useCallback(
    (result: unknown) => {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[handleGenerationComplete] Called", { isCreation: isCreation(result), skipResultStep });
      }
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
      const errorClassification = classifyError(errorMessage);
      const errorInfo: GenerationErrorInfo = {
        message: safeErrorMessage,
        shouldRefund: errorClassification.retryable ?? false,
        errorType: errorClassification.type,
      };

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[handleGenerationError] Called", { errorType: errorClassification.type, shouldRefund: errorInfo.shouldRefund });
      }

      alert.show(AlertType.ERROR, AlertMode.MODAL, t("common.error"), displayMessage);
      onGenerationError?.(safeErrorMessage, errorInfo);
      onBack?.();
    },
    [alert, t, onGenerationError, onBack],
  );

  const handleDismissGenerating = useCallback(() => {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[handleDismissGenerating] User dismissed generating screen");
    }
    alert.show(AlertType.INFO, AlertMode.TOAST, t("generator.backgroundTitle"), t("generator.backgroundMessage"));
    onBack?.();
  }, [alert, t, onBack]);

  return { handleGenerationComplete, handleGenerationError, handleDismissGenerating };
}

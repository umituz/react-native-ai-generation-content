/**
 * Navigation and step transition handlers
 */

import { useCallback, useRef } from "react";
import { StepType, type StepDefinition } from "../../../../../domain/entities/flow-config.types";
import type { UploadedImage } from "../../../../../presentation/hooks/generation/useAIGenerateState";
import { GENERATION_DEBOUNCE_MS } from "../../infrastructure/strategies/wizard-strategy.constants";

interface UseNavigationHandlersProps {
  readonly currentStepIndex: number;
  readonly flowSteps: StepDefinition[];
  readonly customData: Record<string, unknown>;
  readonly nextStep: () => void;
  readonly previousStep: () => void;
  readonly setCustomData: (stepId: string, data: unknown) => void;
  readonly onGenerationStart?: (data: Record<string, unknown>, proceed: () => void, onError?: (error: string) => void) => void;
  readonly handleGenerationError: (error: string) => void;
  readonly onBack?: () => void;
}

function isPlainObjectData(data: unknown): data is Record<string, unknown> {
  return !!data && typeof data === "object" && !("nativeEvent" in data) && !Array.isArray(data);
}

export function useNavigationHandlers(props: UseNavigationHandlersProps) {
  const {
    currentStepIndex, flowSteps, customData, nextStep, previousStep,
    setCustomData, onGenerationStart, handleGenerationError, onBack,
  } = props;

  const lastGenerationAttemptRef = useRef(0);

  const handleBack = useCallback(() => {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[handleBack] Called", { currentStepIndex, isFirstStep: currentStepIndex === 0 });
    }
    if (currentStepIndex === 0) onBack?.();
    else previousStep();
  }, [currentStepIndex, previousStep, onBack]);

  const handleNextStep = useCallback((additionalData?: Record<string, unknown>) => {
    const nextStepDef = flowSteps[currentStepIndex + 1];
    const mergedData = isPlainObjectData(additionalData) ? { ...customData, ...additionalData } : customData;

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
      const now = Date.now();
      if (now - lastGenerationAttemptRef.current < GENERATION_DEBOUNCE_MS) {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[handleNextStep] Debounced - too rapid");
        }
        return;
      }
      lastGenerationAttemptRef.current = now;
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[handleNextStep] Calling onGenerationStart");
      }
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
      handleNextStep({ [stepId]: image });
    },
    [setCustomData, handleNextStep, currentStepIndex],
  );

  return { handleBack, handleNextStep, handlePhotoContinue };
}

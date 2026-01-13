/**
 * AIGenerationWizard
 * Generic wizard component for all AI generation flows
 */

import React, { useMemo, useCallback, useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import type {
  AIGenerationWizardProps,
  WizardStepProps,
  WizardStep,
} from "../../domain/types";
import { createWizardStore, type WizardStoreType } from "../store/useWizardStore";

export const AIGenerationWizard: React.FC<AIGenerationWizardProps> = ({
  userId,
  isAuthenticated = false,
  hasCredits = true,
  config,
  callbacks,
  renderStep,
  children,
}) => {
  const { steps, initialStep = 0 } = config;
  const storeRef = useRef<WizardStoreType | null>(null);

  // Create store once
  if (!storeRef.current) {
    storeRef.current = createWizardStore({ totalSteps: steps.length });
  }

  const store = storeRef.current;
  const state = store();

  // Initialize to initialStep if provided
  useEffect(() => {
    if (initialStep > 0 && state.currentStepIndex === 0) {
      state.goToStep(initialStep);
    }
  }, [initialStep, state]);

  // Auth check before proceeding
  const handleAuthCheck = useCallback(
    (callback: () => void) => {
      if (!isAuthenticated && callbacks?.onAuthRequired) {
        callbacks.onAuthRequired(callback);
        return false;
      }
      return true;
    },
    [isAuthenticated, callbacks],
  );

  // Credit check before generation
  const handleCreditCheck = useCallback(() => {
    if (!hasCredits && callbacks?.onCreditsExhausted) {
      callbacks.onCreditsExhausted();
      return false;
    }
    return true;
  }, [hasCredits, callbacks]);

  // Step navigation handlers
  const handleNext = useCallback(() => {
    const canProceed = handleAuthCheck(() => {
      state.nextStep();
    });
    if (canProceed) {
      state.nextStep();
      callbacks?.onStepChange?.(
        state.currentStepIndex + 1,
        steps[state.currentStepIndex + 1]?.id ?? "",
      );
    }
  }, [handleAuthCheck, state, callbacks, steps]);

  const handleBack = useCallback(() => {
    state.prevStep();
    callbacks?.onStepChange?.(
      state.currentStepIndex - 1,
      steps[state.currentStepIndex - 1]?.id ?? "",
    );
  }, [state, callbacks, steps]);

  const handleComplete = useCallback(() => {
    if (!handleCreditCheck()) {
      return;
    }

    state.setProcessing(true);
    callbacks?.onGenerationStart?.();
  }, [handleCreditCheck, state, callbacks]);

  // Build step props
  const stepProps: WizardStepProps = useMemo(
    () => ({
      onNext: handleNext,
      onBack: handleBack,
      onComplete: handleComplete,
      isProcessing: state.isProcessing,
      progress: state.progress,
      error: state.error,
    }),
    [handleNext, handleBack, handleComplete, state.isProcessing, state.progress, state.error],
  );

  // Current step
  const currentStep = steps[state.currentStepIndex];

  // Render current step
  const renderCurrentStep = useCallback(() => {
    if (!currentStep) return null;

    if (renderStep) {
      return renderStep(currentStep, stepProps);
    }

    const StepComponent = currentStep.component;
    return <StepComponent {...stepProps} />;
  }, [currentStep, stepProps, renderStep]);

  return (
    <View style={styles.container}>
      {renderCurrentStep()}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AIGenerationWizard;

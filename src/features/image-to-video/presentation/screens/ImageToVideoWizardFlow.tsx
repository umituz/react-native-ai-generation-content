/**
 * ImageToVideoWizardFlow
 * Step-based wizard flow for image-to-video generation
 */

import React, { useMemo, useCallback, useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { useAppDesignTokens } from "@umituz/react-native-design-system";
import { GenericWizardFlow } from "../../../../domains/generation/wizard/presentation/components";
import { IMAGE_TO_VIDEO_WIZARD_CONFIG } from "../../../../domains/generation/wizard/configs";
import type { WizardScenarioData } from "../../../../domains/generation/wizard/presentation/hooks/useWizardGeneration";
import type { BaseWizardFlowProps } from "../../../../domains/generation/wizard/presentation/components/WizardFlow.types";
import type { AlertMessages } from "../../../../presentation/hooks/generation/types";

const AutoSkipPreview: React.FC<{ onContinue: () => void }> = ({ onContinue }) => {
  const hasContinued = useRef(false);
  useEffect(() => {
    if (!hasContinued.current) {
      hasContinued.current = true;
      onContinue();
    }
  }, [onContinue]);
  return null;
};

export type ImageToVideoWizardFlowProps = BaseWizardFlowProps;

export const ImageToVideoWizardFlow: React.FC<ImageToVideoWizardFlowProps> = (props) => {
  const {
    model,
    userId,
    isAuthenticated,
    hasPremium,
    creditBalance,
    isCreditsLoaded,
    creditCost,
    onShowAuthModal,
    onShowPaywall,
    onGenerationComplete,
    onGenerationError,
    onBack,
    t,
    alertMessages,
  } = props;

  const tokens = useAppDesignTokens();

  const scenario: WizardScenarioData = useMemo(
    () => ({
      id: "image-to-video",
      outputType: "video",
      inputType: "single",
      model,
      title: t("image2video.title"),
    }),
    [model, t],
  );

  const defaultAlerts = useMemo<AlertMessages>(
    () => ({
      networkError: t("common.errors.network"),
      policyViolation: t("common.errors.policy"),
      saveFailed: t("common.errors.saveFailed"),
      creditFailed: t("common.errors.creditFailed"),
      unknown: t("common.errors.unknown"),
    }),
    [t],
  );

  const handleGenerationStart = useCallback(
    (_data: Record<string, unknown>, proceed: () => void) => {
      if (!isAuthenticated) { onShowAuthModal(proceed); return; }
      if (!hasPremium && isCreditsLoaded && creditBalance < creditCost) { onShowPaywall(); return; }
      proceed();
    },
    [isAuthenticated, hasPremium, creditBalance, creditCost, isCreditsLoaded, onShowAuthModal, onShowPaywall],
  );

  const handleGenerationComplete = useCallback(() => {
    onGenerationComplete?.();
    onBack();
  }, [onGenerationComplete, onBack]);

  return (
    <View style={[styles.container, { backgroundColor: tokens.colors.backgroundPrimary }]}>
      <GenericWizardFlow
        featureConfig={IMAGE_TO_VIDEO_WIZARD_CONFIG}
        scenario={scenario}
        userId={userId}
        alertMessages={alertMessages ?? defaultAlerts}
        creditCost={creditCost}
        skipResultStep={true}
        onGenerationStart={handleGenerationStart}
        onGenerationComplete={handleGenerationComplete}
        onGenerationError={onGenerationError}
        onCreditsExhausted={onShowPaywall}
        onBack={onBack}
        onTryAgain={onBack}
        t={t}
        renderPreview={(onContinue) => <AutoSkipPreview onContinue={onContinue} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

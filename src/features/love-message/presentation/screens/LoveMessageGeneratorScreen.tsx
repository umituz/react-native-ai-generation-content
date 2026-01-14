/**
 * Love Message Generator Screen
 * Multi-step wizard flow
 */

import { FC, useMemo, useCallback } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicButton,
  useAppNavigation,
  useAppRoute,
  AlertService,
  useAppDesignTokens,
  useSafeAreaInsets,
} from "@umituz/react-native-design-system";

import { useLocalization } from "@umituz/react-native-localization";
import { ProgressDots } from "../components/ProgressDots";
import { MessageResult } from "../components/MessageResult";
import { GeneratorHeader } from "../components/GeneratorHeader";
import { StepPartner } from "../components/StepPartner";
import { StepVibe } from "../components/StepVibe";
import { StepDetails } from "../components/StepDetails";
import { MessageType } from "../../domain/types";
import { useLoveMessageGenerator, GeneratorStep } from "../hooks/useLoveMessageGenerator";

type RouteParams = { initialType?: MessageType };

export const LoveMessageGeneratorScreen: FC = () => {
  const tokens = useAppDesignTokens();
  const { bottom } = useSafeAreaInsets();
  const { t } = useLocalization();
  const navigation = useAppNavigation();
  const route = useAppRoute<{ params: RouteParams }, "params">();

  const initialType = route.params?.initialType;

  const handleSuccess = useCallback(() => {
    AlertService.createSuccessAlert(
      t("loveMessage.generator.successTitle"),
      t("loveMessage.generator.successMessage")
    );
  }, [t]);

  const handleError = useCallback(() => {
    AlertService.createErrorAlert(
      t("loveMessage.generator.errorTitle"),
      t("loveMessage.generator.errorMessage")
    );
  }, [t]);

  const gen = useLoveMessageGenerator({
    onBack: () => navigation.goBack(),
    initialType,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const handleNavigateToProfile = () => navigation.navigate("PartnerProfile");

  const stepTitle = useMemo(() => {
    switch (gen.currentStep) {
      case GeneratorStep.PARTNER:
        return t("loveMessage.generator.stepPartner");
      case GeneratorStep.VIBE:
        return t("loveMessage.generator.stepVibe");
      case GeneratorStep.DETAILS:
        return t("loveMessage.generator.stepDetails");
      case GeneratorStep.RESULT:
        return t("loveMessage.generator.stepResult");
      default:
        return "";
    }
  }, [gen.currentStep, t]);

  return (
    <View style={[styles.container, { backgroundColor: tokens.colors.backgroundPrimary }]}>
      <GeneratorHeader
        currentStep={gen.currentStep}
        partnerName={gen.partnerName}
        onBack={gen.handleBack}
        onNext={gen.handleNext}
        onGenerate={gen.handleGenerate}
        isGenerating={gen.isGenerating}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottom + 120 }}
      >
        <View style={styles.heroSection}>
          <ProgressDots currentStep={gen.currentStep} totalSteps={4} />
          <AtomicText type="headlineLarge" color="textPrimary" style={styles.heroTitle}>
            {stepTitle}
          </AtomicText>
        </View>

        <View style={styles.formContent}>
          {gen.currentStep === GeneratorStep.PARTNER && (
            <View>
              <StepPartner
                partnerName={gen.partnerName}
                setPartnerName={gen.setPartnerName}
                useProfile={gen.useProfile}
                setUseProfile={gen.setUseProfile}
                hasProfile={gen.hasProfile}
                onEditProfile={handleNavigateToProfile}
              />
            </View>
          )}

          {gen.currentStep === GeneratorStep.VIBE && (
            <View>
              <StepVibe
                selectedType={gen.selectedType}
                setSelectedType={gen.setSelectedType}
                selectedTone={gen.selectedTone}
                setSelectedTone={gen.setSelectedTone}
              />
            </View>
          )}

          {gen.currentStep === GeneratorStep.DETAILS && (
            <View>
              <StepDetails details={gen.details} setDetails={gen.setDetails} />
            </View>
          )}

          {gen.currentStep === GeneratorStep.RESULT && (
            <MessageResult message={gen.generatedMessage} />
          )}
        </View>
      </ScrollView>

      {gen.currentStep === GeneratorStep.RESULT && (
        <View style={[styles.footer, { paddingBottom: bottom + 24 }]}>
          <AtomicButton
            title={t("loveMessage.generator.startOver")}
            onPress={gen.startOver}
            variant="outline"
            fullWidth
            style={styles.actionBtn}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  heroSection: { paddingVertical: 32, alignItems: "center" },
  heroTitle: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  formContent: { paddingHorizontal: 20 },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
  },
  actionBtn: { height: 60, borderRadius: 30 },
});

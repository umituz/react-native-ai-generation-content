/**
 * Love Message Generator Screen
 * Optimized multi-step wizard flow
 */

import { FC, useMemo } from "react";
import { View, ScrollView, StyleSheet, Animated } from "react-native";
import {
  AtomicText,
  AtomicButton,
  useAppDesignTokens,
  useSafeAreaInsets,
} from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";
import { useNavigation } from "@react-navigation/native";
import { ProgressDots } from "../components/ProgressDots";
import { MessageResult } from "../components/MessageResult";
import { GeneratorHeader } from "../components/GeneratorHeader";
import { StepPartner } from "../components/StepPartner";
import { StepVibe } from "../components/StepVibe";
import { StepDetails } from "../components/StepDetails";
import { useLoveMessageGenerator, GeneratorStep } from "../hooks/useLoveMessageGenerator";

interface LoveMessageGeneratorScreenProps {
  onBack: () => void;
  onNavigateToProfile: () => void;
  initialType?: MessageType;
}

export const LoveMessageGeneratorScreen: FC<LoveMessageGeneratorScreenProps> = ({
  onBack,
  onNavigateToProfile,
  initialType,
}) => {
  const tokens = useAppDesignTokens();
  const { bottom } = useSafeAreaInsets();
  const { t } = useLocalization();
  const gen = useLoveMessageGenerator({ onBack, initialType });

  const stepTitle = useMemo(() => {
    switch (gen.currentStep) {
      case GeneratorStep.PARTNER: return t("loveMessage.generator.stepPartner");
      case GeneratorStep.VIBE: return t("loveMessage.generator.stepVibe");
      case GeneratorStep.DETAILS: return t("loveMessage.generator.stepDetails");
      case GeneratorStep.RESULT: return t("loveMessage.generator.stepResult");
      default: return "";
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

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: bottom + 120 }}>
        <View style={styles.heroSection}>
          <ProgressDots currentStep={gen.currentStep} totalSteps={4} />
          <AtomicText type="headlineLarge" color="textPrimary" style={styles.heroTitle}>
            {stepTitle}
          </AtomicText>
        </View>

        <View style={styles.formContent}>
          {gen.currentStep === GeneratorStep.PARTNER && (
            <Animated.View>
              <StepPartner 
                partnerName={gen.partnerName}
                setPartnerName={gen.setPartnerName}
                useProfile={gen.useProfile}
                setUseProfile={gen.setUseProfile}
                hasProfile={gen.hasProfile}
                onEditProfile={onNavigateToProfile}
              />
            </Animated.View>
          )}

          {gen.currentStep === GeneratorStep.VIBE && (
            <Animated.View>
              <StepVibe 
                selectedType={gen.selectedType}
                setSelectedType={gen.setSelectedType}
                selectedTone={gen.selectedTone}
                setSelectedTone={gen.setSelectedTone}
              />
            </Animated.View>
          )}

          {gen.currentStep === GeneratorStep.DETAILS && (
            <Animated.View>
              <StepDetails details={gen.details} setDetails={gen.setDetails} />
            </Animated.View>
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
  heroSection: { paddingVertical: 32, alignItems: 'center' },
  heroTitle: { fontWeight: 'bold', textAlign: 'center', marginBottom: 8, paddingHorizontal: 20 },
  formContent: { paddingHorizontal: 20 },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 24, backgroundColor: 'transparent' },
  actionBtn: { height: 60, borderRadius: 30 },
});

/**
 * Generator Header Component
 */

import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useSafeAreaInsets,
} from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";

interface GeneratorHeaderProps {
  currentStep: number;
  partnerName: string;
  onBack: () => void;
  onNext: () => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const GeneratorHeader: React.FC<GeneratorHeaderProps> = ({
  currentStep,
  partnerName,
  onBack,
  onNext,
  onGenerate,
  isGenerating,
}) => {
  const { top } = useSafeAreaInsets();
  const { t } = useLocalization();

  const isResultStep = currentStep === 3;
  const isDetailsStep = currentStep === 2;
  const isPartnerStep = currentStep === 0;

  return (
    <View style={[styles.header, { paddingTop: top + 10 }]}>
      <Pressable onPress={onBack} style={styles.backBtn}>
        <AtomicIcon name="arrow-back" color="textPrimary" size="sm" />
      </Pressable>
      
      <AtomicText type="labelLarge" color="textPrimary" style={styles.headerTitle}>
        AI Generator
      </AtomicText>

      {!isResultStep ? (
        <Pressable 
          onPress={isDetailsStep ? onGenerate : onNext}
          disabled={(isPartnerStep && !partnerName.trim()) || isGenerating}
          style={styles.headerActionBtn}
        >
          <AtomicText 
            type="labelMedium" 
            color={(isPartnerStep && !partnerName.trim()) ? "textTertiary" : "primary"}
            style={{ fontWeight: 'bold' }}
          >
            {isDetailsStep ? t("loveMessage.generate") : t("common.continue") || "Continue"}
          </AtomicText>
        </Pressable>
      ) : (
        <View style={{ width: 44 }} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  backBtn: {
    padding: 10,
  },
  headerTitle: {
    fontWeight: "800",
  },
  headerActionBtn: {
    padding: 10,
    minWidth: 44,
    alignItems: 'flex-end',
  },
});

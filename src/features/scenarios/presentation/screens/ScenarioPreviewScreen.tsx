/**
 * ScenarioPreviewScreen
 * Config-driven scenario preview screen
 */

import React, { useMemo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
  ScreenLayout,
  type DesignTokens,
  HeroSection,
  AtomicIcon,
  NavigationHeader,
} from "@umituz/react-native-design-system";
import type { ScenarioData } from "../../domain/types";

export interface ScenarioPreviewTranslations {
  readonly continueButton: string;
  readonly whatToExpect: string;
}

export interface ScenarioPreviewScreenProps {
  readonly scenario: ScenarioData;
  readonly translations: ScenarioPreviewTranslations;
  readonly onBack: () => void;
  readonly onContinue: () => void;
  readonly t: (key: string) => string;
}

export const ScenarioPreviewScreen: React.FC<ScenarioPreviewScreenProps> = ({
  scenario,
  translations,
  onBack,
  onContinue,
  t,
}) => {
  const tokens = useAppDesignTokens();
  const styles = useMemo(() => createStyles(tokens), [tokens]);

  return (
    <View style={{ flex: 1, backgroundColor: tokens.colors.backgroundPrimary }}>
      <NavigationHeader
        title=""
        onBackPress={onBack}
        rightElement={
          <TouchableOpacity
            onPress={onContinue}
            activeOpacity={0.7}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: tokens.colors.primary,
              paddingHorizontal: tokens.spacing.md,
              paddingVertical: tokens.spacing.xs,
              borderRadius: tokens.borders.radius.full,
            }}
          >
            <AtomicText
              type="bodyMedium"
              style={{
                fontWeight: "800",
                color: tokens.colors.onPrimary,
                marginRight: 4,
              }}
            >
              {translations.continueButton}
            </AtomicText>
            <AtomicIcon name="arrow-forward" size="sm" color="onPrimary" />
          </TouchableOpacity>
        }
      />
      <ScreenLayout
        scrollable={true}
        edges={["left", "right"]}
        hideScrollIndicator={true}
        contentContainerStyle={styles.scrollContent}
      >
        <HeroSection
          icon={scenario.icon}
          imageUrl={scenario.previewImageUrl ?? scenario.imageUrl}
        />

        <View style={styles.contentSection}>
          <AtomicText style={styles.scenarioTitle}>
            {t(`scenario.${scenario.id}.title`)}
          </AtomicText>

          <AtomicText style={styles.scenarioDescription}>
            {t(`scenario.${scenario.id}.description`)}
          </AtomicText>

          <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <AtomicIcon name="information-circle" size="sm" color="primary" />
              <AtomicText style={styles.infoTitle}>
                {translations.whatToExpect}
              </AtomicText>
            </View>
            <AtomicText style={styles.infoDescription}>
              {t(`scenario.${scenario.id}.details`)}
            </AtomicText>
          </View>
        </View>
      </ScreenLayout>
    </View>
  );
};

const createStyles = (tokens: DesignTokens) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: tokens.colors.backgroundPrimary,
    },
    scrollContent: {
      paddingBottom: 120,
    },
    contentSection: {
      paddingHorizontal: tokens.spacing.lg,
      marginTop: -40,
    },
    scenarioTitle: {
      ...tokens.typography.headingLarge,
      color: tokens.colors.textPrimary,
      fontWeight: "900",
      marginBottom: 12,
      textAlign: "left",
    },
    scenarioDescription: {
      ...tokens.typography.bodyLarge,
      color: tokens.colors.textSecondary,
      lineHeight: 28,
      marginBottom: 24,
      opacity: 0.9,
      textAlign: "left",
    },
    infoCard: {
      backgroundColor: tokens.colors.surface,
      borderRadius: tokens.borders.radius.lg,
      padding: tokens.spacing.lg,
      borderWidth: 1,
      borderColor: tokens.colors.outlineVariant,
    },
    infoHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: tokens.spacing.sm,
      gap: tokens.spacing.xs,
    },
    infoTitle: {
      ...tokens.typography.labelLarge,
      color: tokens.colors.textPrimary,
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    infoDescription: {
      ...tokens.typography.bodyMedium,
      color: tokens.colors.textSecondary,
      lineHeight: 22,
    },
  });

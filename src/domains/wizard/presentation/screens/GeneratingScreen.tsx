/**
 * Generic Generating Screen
 * Shows progress while AI generates content
 * Used by ALL features - NO feature-specific code!
 */

import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useAppDesignTokens, AtomicText } from "@umituz/react-native-design-system";

export interface GeneratingScreenProps {
  readonly progress: number;
  readonly scenario?: {
    readonly id: string;
    readonly title?: string;
  };
  readonly t: (key: string) => string;
  readonly onCancel?: () => void;
}

export const GeneratingScreen: React.FC<GeneratingScreenProps> = ({
  progress,
  scenario,
  t,
  onCancel,
}) => {
  const tokens = useAppDesignTokens();

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[GeneratingScreen] Rendering", {
      progress,
      scenarioId: scenario?.id,
    });
  }

  return (
    <View style={[styles.container, { backgroundColor: tokens.colors.backgroundPrimary }]}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color={tokens.colors.primary} />

        <AtomicText type="heading2" style={styles.title}>
          {t("generator.title")}
        </AtomicText>

        <AtomicText type="body" style={[styles.message, { color: tokens.colors.textSecondary }]}>
          {t("generator.waitMessage")}
        </AtomicText>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { backgroundColor: tokens.colors.surfaceVariant }]}>
            <View
              style={[
                styles.progressFill,
                {
                  backgroundColor: tokens.colors.primary,
                  width: `${Math.min(100, Math.max(0, progress))}%`,
                },
              ]}
            />
          </View>
          <AtomicText type="caption" style={[styles.progressText, { color: tokens.colors.textSecondary }]}>
            {Math.round(progress)}%
          </AtomicText>
        </View>

        {/* Scenario Info */}
        {scenario && (
          <AtomicText type="caption" style={[styles.hint, { color: tokens.colors.textSecondary }]}>
            {scenario.title || scenario.id}
          </AtomicText>
        )}

        {/* Hint */}
        <AtomicText type="caption" style={[styles.hint, { color: tokens.colors.textSecondary }]}>
          {t("generator.hint")}
        </AtomicText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "80%",
    maxWidth: 400,
    alignItems: "center",
    gap: 16,
  },
  title: {
    textAlign: "center",
    marginTop: 24,
  },
  message: {
    textAlign: "center",
  },
  progressContainer: {
    width: "100%",
    marginTop: 24,
    gap: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    textAlign: "center",
  },
  hint: {
    textAlign: "center",
    marginTop: 8,
  },
});

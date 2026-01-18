/**
 * Generic Generating Screen
 * Shows progress while AI generates content
 * Uses scenario-specific messages with fallback to generic messages
 */

import React, { useMemo } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useAppDesignTokens, AtomicText } from "@umituz/react-native-design-system";

export interface GeneratingScreenProps {
  readonly progress: number;
  readonly scenario?: {
    readonly id: string;
    readonly title?: string;
    readonly category?: string;
    readonly generatingMessages?: {
      readonly title?: string;
      readonly waitMessage?: string;
      readonly hint?: string;
    };
  };
  readonly t: (key: string) => string;
  readonly onCancel?: () => void;
}

export const GeneratingScreen: React.FC<GeneratingScreenProps> = ({
  progress,
  scenario,
  t,
  onCancel: _onCancel,
}) => {
  const tokens = useAppDesignTokens();

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[GeneratingScreen] Rendering", {
      progress,
      scenarioId: scenario?.id,
    });
  }

  const messages = useMemo(() => {
    const custom = scenario?.generatingMessages;
    return {
      title: custom?.title || t("generator.title"),
      waitMessage: custom?.waitMessage || t("generator.waitMessage"),
      hint: custom?.hint || t("generator.hint"),
    };
  }, [scenario, t]);

  return (
    <View style={[styles.container, { backgroundColor: tokens.colors.backgroundPrimary }]}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color={tokens.colors.primary} />

        <AtomicText type="headlineMedium" style={styles.title}>
          {messages.title}
        </AtomicText>

        <AtomicText type="bodyMedium" style={[styles.message, { color: tokens.colors.textSecondary }]}>
          {messages.waitMessage}
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
          <AtomicText type="bodySmall" style={[styles.progressText, { color: tokens.colors.textSecondary }]}>
            {Math.round(progress)}%
          </AtomicText>
        </View>

        {/* Scenario Info */}
        {scenario && (
          <AtomicText type="bodySmall" style={[styles.hint, { color: tokens.colors.textSecondary }]}>
            {scenario.title || scenario.id}
          </AtomicText>
        )}

        {/* Hint */}
        <AtomicText type="bodySmall" style={[styles.hint, { color: tokens.colors.textSecondary }]}>
          {messages.hint}
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

/**
 * Generic Generating Screen
 * Shows indeterminate progress while AI generates content
 * Uses status messages instead of fake percentages (UX best practice)
 * Supports background generation - user can dismiss and generation continues
 */

import React, { useMemo } from "react";
import { View, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { useAppDesignTokens, AtomicText, ScreenLayout } from "@umituz/react-native-design-system";
import { useGenerationPhase } from "../hooks/useGenerationPhase";
import { IndeterminateProgressBar } from "../components/IndeterminateProgressBar";

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
      readonly backgroundHint?: string;
    };
  };
  readonly t: (key: string) => string;
  readonly onDismiss?: () => void;
}

export const GeneratingScreen: React.FC<GeneratingScreenProps> = ({
  progress: _progress,
  scenario,
  t,
  onDismiss,
}) => {
  const tokens = useAppDesignTokens();
  const phase = useGenerationPhase();

  const messages = useMemo(() => {
    const custom = scenario?.generatingMessages;
    return {
      title: custom?.title || t("generator.title"),
      waitMessage: custom?.waitMessage || t("generator.waitMessage"),
      hint: custom?.hint || t("generator.hint"),
      backgroundHint: custom?.backgroundHint || t("generator.backgroundHint"),
    };
  }, [scenario, t]);

  const statusMessage = useMemo(() => {
    switch (phase) {
      case "queued":
        return t("generator.status.queued") || "Waiting in queue...";
      case "processing":
        return t("generator.status.processing") || "Generating your content...";
      case "finalizing":
        return t("generator.status.finalizing") || "Almost done...";
      default:
        return messages.waitMessage;
    }
  }, [phase, t, messages.waitMessage]);

  return (
    <ScreenLayout backgroundColor={tokens.colors.backgroundPrimary}>
      <View style={styles.container}>
        <View style={styles.content}>
          <ActivityIndicator size="large" color={tokens.colors.primary} />

          <AtomicText type="headlineMedium" style={styles.title}>
            {messages.title}
          </AtomicText>

          <AtomicText type="bodyMedium" style={[styles.message, { color: tokens.colors.textSecondary }]}>
            {statusMessage}
          </AtomicText>

          <View style={styles.progressContainer}>
            <IndeterminateProgressBar
              backgroundColor={tokens.colors.surfaceVariant}
              fillColor={tokens.colors.primary}
            />
          </View>

          {scenario && (
            <AtomicText type="bodySmall" style={[styles.hint, { color: tokens.colors.textSecondary }]}>
              {scenario.title || scenario.id}
            </AtomicText>
          )}

          <AtomicText type="bodySmall" style={[styles.hint, { color: tokens.colors.textSecondary }]}>
            {messages.hint}
          </AtomicText>

          {onDismiss && (
            <TouchableOpacity
              style={[styles.backgroundHintButton, { borderColor: tokens.colors.primary }]}
              onPress={onDismiss}
            >
              <AtomicText type="bodyLarge" style={[styles.backgroundHint, { color: tokens.colors.primary }]}>
                {messages.backgroundHint}
              </AtomicText>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScreenLayout>
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
  },
  hint: {
    textAlign: "center",
    marginTop: 8,
  },
  backgroundHintButton: {
    marginTop: 32,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderRadius: 12,
  },
  backgroundHint: {
    textAlign: "center",
    fontWeight: "700",
  },
});

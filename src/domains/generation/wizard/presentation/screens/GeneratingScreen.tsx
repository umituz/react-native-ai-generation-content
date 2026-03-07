/**
 * Generic Generating Screen
 * Shows indeterminate progress while AI generates content
 * Uses status messages instead of fake percentages (UX best practice)
 * Supports background generation - user can dismiss and generation continues
 */

import React, { useMemo, useRef, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Animated } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system/atoms";
import { ScreenLayout } from "@umituz/react-native-design-system/layouts";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { useGenerationPhase } from "../hooks/useGenerationPhase";
import { IndeterminateProgressBar } from "../components/IndeterminateProgressBar";

interface GeneratingScreenProps {
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

const PHASES = [
  { id: "queued", index: 0 },
  { id: "processing", index: 1 },
  { id: "finalizing", index: 2 },
] as const;

const PHASE_LABELS = {
  queued: "Analyzing",
  processing: "Creating",
  finalizing: "Refining",
} as const;

export const GeneratingScreen: React.FC<GeneratingScreenProps> = ({
  progress: _progress,
  scenario,
  t,
  onDismiss,
}) => {
  const tokens = useAppDesignTokens();
  const phase = useGenerationPhase();
  const pulseAnim = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 0.6, duration: 900, useNativeDriver: true }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [pulseAnim]);

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
        return t("generator.status.queued") || "Analyzing your photos...";
      case "processing":
        return t("generator.status.processing") || "Creating your scene...";
      case "finalizing":
        return t("generator.status.finalizing") || "Adding finishing touches...";
      default:
        return messages.waitMessage;
    }
  }, [phase, t, messages.waitMessage]);

  const activePhaseIndex = PHASES.find((p) => p.id === phase)?.index ?? 0;

  return (
    <ScreenLayout backgroundColor={tokens.colors.backgroundPrimary}>
      <View style={styles.container}>
        <View style={styles.content}>
          {/* Pulsing spinner */}
          <Animated.View style={[styles.spinnerContainer, { opacity: pulseAnim, backgroundColor: tokens.colors.primary + "15" }]}>
            <ActivityIndicator size="large" color={tokens.colors.primary} />
          </Animated.View>

          <AtomicText type="headlineMedium" style={styles.title}>
            {messages.title}
          </AtomicText>

          {/* Phase step bubbles */}
          <View style={styles.stepsRow}>
            {PHASES.map((p, idx) => {
              const isActive = idx === activePhaseIndex;
              const isDone = idx < activePhaseIndex;
              return (
                <React.Fragment key={p.id}>
                  <View style={styles.stepItem}>
                    <View
                      style={[
                        styles.stepBubble,
                        {
                          backgroundColor: isDone || isActive
                            ? tokens.colors.primary
                            : tokens.colors.surfaceVariant,
                          borderColor: isActive ? tokens.colors.primary : "transparent",
                        },
                      ]}
                    >
                      <AtomicText
                        style={[
                          styles.stepNumber,
                          { color: isDone || isActive ? "#FFFFFF" : tokens.colors.textSecondary },
                        ]}
                      >
                        {isDone ? "✓" : String(idx + 1)}
                      </AtomicText>
                    </View>
                    <AtomicText
                      style={[
                        styles.stepLabel,
                        {
                          color: isActive ? tokens.colors.primary : tokens.colors.textSecondary,
                          fontWeight: isActive ? "700" : "400",
                        },
                      ]}
                    >
                      {PHASE_LABELS[p.id]}
                    </AtomicText>
                  </View>
                  {idx < PHASES.length - 1 && (
                    <View
                      style={[
                        styles.stepConnector,
                        { backgroundColor: idx < activePhaseIndex ? tokens.colors.primary : tokens.colors.surfaceVariant },
                      ]}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </View>

          <AtomicText type="bodyMedium" style={[styles.message, { color: tokens.colors.textSecondary }]}>
            {statusMessage}
          </AtomicText>

          <View style={styles.progressContainer}>
            <IndeterminateProgressBar
              backgroundColor={tokens.colors.surfaceVariant}
              fillColor={tokens.colors.primary}
            />
          </View>

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
    width: "85%",
    maxWidth: 400,
    alignItems: "center",
    gap: 16,
  },
  spinnerContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    textAlign: "center",
  },
  stepsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  stepItem: {
    alignItems: "center",
    gap: 6,
  },
  stepBubble: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: "700",
  },
  stepLabel: {
    fontSize: 11,
  },
  stepConnector: {
    width: 40,
    height: 2,
    borderRadius: 1,
    marginBottom: 18,
    marginHorizontal: 4,
  },
  message: {
    textAlign: "center",
  },
  progressContainer: {
    width: "100%",
    marginTop: 8,
  },
  hint: {
    textAlign: "center",
    marginTop: 4,
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

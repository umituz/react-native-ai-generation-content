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
  readonly renderMascot?: () => React.ReactNode;
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
  renderMascot,
}) => {
  const tokens = useAppDesignTokens();
  const phase = useGenerationPhase();
  const pulseAnim = useRef(new Animated.Value(0.6)).current;

  const scanAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnim, { toValue: 1, duration: 2500, useNativeDriver: true }),
        Animated.timing(scanAnim, { toValue: 0, duration: 2500, useNativeDriver: true }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [scanAnim]);

  const scanTranslateY = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 100],
  });

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
          {/* Scanning Animation Container */}
          <View style={[styles.scanFrame, { borderColor: tokens.colors.primary + "20" }]}>
            <View style={[styles.scanOverlay, { backgroundColor: tokens.colors.primary + "05" }]}>
              <Animated.View 
                style={[
                  styles.scanLine, 
                  { 
                    backgroundColor: tokens.colors.primary,
                    transform: [{ translateY: scanTranslateY }],
                    shadowColor: tokens.colors.primary,
                    shadowOpacity: 0.6,
                    shadowRadius: 10,
                  }
                ]} 
              />
            </View>
            <View style={styles.mascotContainer}>
              {renderMascot ? (
                renderMascot()
              ) : (
                <Animated.View style={[styles.spinnerOverlay, { opacity: pulseAnim }]}>
                  <ActivityIndicator size="large" color={tokens.colors.primary} />
                </Animated.View>
              )}
            </View>
          </View>

          <AtomicText type="headlineSmall" style={[styles.title, { color: tokens.colors.textPrimary }]}>
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

          {/* Combined Progress section */}
          <View style={styles.progressSection}>
            <View style={styles.progressWrapper}>
              <IndeterminateProgressBar
                backgroundColor={tokens.colors.surfaceVariant}
                fillColor={tokens.colors.primary}
                height={4}
              />
            </View>
            <AtomicText type="bodySmall" style={[styles.hint, { color: tokens.colors.textSecondary, opacity: 0.7 }]}>
              {messages.hint}
            </AtomicText>
          </View>

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
  },
  scanFrame: {
    width: 160,
    height: 160,
    borderRadius: 80, // Circular for better look
    borderWidth: 1,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  scanOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  scanLine: {
    width: "140%",
    height: 2,
    position: "absolute",
    left: "-20%",
  },
  mascotContainer: {
    zIndex: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  spinnerOverlay: {
    zIndex: 10,
  },
  title: {
    textAlign: "center",
    fontWeight: "900",
    letterSpacing: -0.5,
    marginBottom: 20,
  },
  stepsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
    width: "100%",
  },
  stepItem: {
    alignItems: "center",
    width: 70,
  },
  stepBubble: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginBottom: 8,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: "800",
  },
  stepLabel: {
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  stepConnector: {
    flex: 1,
    height: 1,
    maxWidth: 30,
    borderRadius: 1,
    marginTop: -18, // Align with bubble center
    marginHorizontal: 4,
  },
  message: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "600",
  },
  progressSection: {
    width: "100%",
    alignItems: "center",
    marginTop: 24,
    gap: 12,
  },
  progressWrapper: {
    width: "100%",
    height: 4, // Slimmer progress bar
  },
  hint: {
    textAlign: "center",
  },
  backgroundHintButton: {
    marginTop: 40,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderWidth: 1,
    borderRadius: 30, // Pill shaped
    backgroundColor: "rgba(255,255,255,0.03)",
  },
  backgroundHint: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: -0.2,
  },
});

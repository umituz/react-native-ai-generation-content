/**
 * AIGenerationProgressInline Component
 * Generic inline generation progress display
 * Props-driven for 100+ apps compatibility
 */

import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
  AtomicProgress,
} from "@umituz/react-native-design-system";

export interface AIGenerationProgressInlineProps {
  readonly progress: number;
  readonly title?: string;
  readonly message?: string;
  readonly hint?: string;
  readonly backgroundColor?: string;
  readonly accentColor?: string;
}

export const AIGenerationProgressInline: React.FC<
  AIGenerationProgressInlineProps
> = ({
  progress,
  title,
  message,
  hint,
  backgroundColor,
  accentColor,
}) => {
  const tokens = useAppDesignTokens();
  const primaryColor = accentColor || tokens.colors.primary;
  const bgColor = backgroundColor || tokens.colors.surface;

  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <ActivityIndicator size="large" color={primaryColor} />
      
      {title && (
        <AtomicText
          type="bodyMedium"
          style={[styles.title, { color: tokens.colors.textPrimary }]}
        >
          {title}
        </AtomicText>
      )}
      
      {message && (
        <AtomicText
          type="bodySmall"
          style={[styles.message, { color: tokens.colors.textSecondary }]}
        >
          {message}
        </AtomicText>
      )}
      
      <View style={styles.progressBarWrapper}>
        <AtomicProgress
          value={clampedProgress}
          height={8}
          color={primaryColor}
          backgroundColor={tokens.colors.surfaceVariant}
          shape="rounded"
          showPercentage={false}
        />
      </View>
      
      <AtomicText
        type="labelSmall"
        style={[styles.progressLabel, { color: tokens.colors.textSecondary }]}
      >
        {clampedProgress}%{hint ? ` • ${hint}` : ""}
      </AtomicText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
  },
  title: {
    marginTop: 16,
    fontWeight: "600",
  },
  message: {
    marginTop: 8,
    textAlign: "center",
  },
  progressBarWrapper: {
    width: "100%",
    marginTop: 16,
  },
  progressLabel: {
    marginTop: 8,
  },
});

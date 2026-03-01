/**
 * Unified ProgressBar Component
 * Flexible progress bar with optional percentage display
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { clampProgress, roundProgress } from "../../../infrastructure/utils/progress.utils";

export interface ProgressBarProps {
  /** Progress value (0-100) */
  progress: number;
  /** Show percentage text below bar */
  showPercentage?: boolean;
  /** Custom text color */
  textColor?: string;
  /** Custom progress fill color */
  progressColor?: string;
  /** Custom background color */
  backgroundColor?: string;
  /** Bar height (default: 8 for standard, 4 for compact) */
  height?: number;
  /** Spacing below bar (default: 16 with percentage, 0 without) */
  marginBottom?: number;
  /** Border radius (default: height / 2) */
  borderRadius?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  showPercentage = false,
  textColor,
  progressColor,
  backgroundColor,
  height = 8,
  marginBottom,
  borderRadius,
}) => {
  const tokens = useAppDesignTokens();
  const clampedProgress = clampProgress(progress);
  const actualBorderRadius = borderRadius ?? height / 2;
  const actualMarginBottom = marginBottom ?? (showPercentage ? 16 : 0);

  return (
    <View style={[styles.container, { marginBottom: actualMarginBottom }]}>
      <View
        style={[
          styles.background,
          {
            backgroundColor: backgroundColor || tokens.colors.borderLight,
            height,
            borderRadius: actualBorderRadius,
          },
        ]}
      >
        <View
          style={[
            styles.fill,
            {
              backgroundColor: progressColor || tokens.colors.primary,
              width: `${clampedProgress}%`,
              borderRadius: actualBorderRadius,
            },
          ]}
        />
      </View>
      {showPercentage && (
        <AtomicText
          style={[
            styles.text,
            { color: textColor || tokens.colors.textPrimary },
          ]}
        >
          {roundProgress(clampedProgress)}%
        </AtomicText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  background: {
    width: "100%",
    overflow: "hidden",
  },
  fill: {
    height: "100%",
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
  },
});

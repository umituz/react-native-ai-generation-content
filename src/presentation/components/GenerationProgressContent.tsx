/**
 * GenerationProgressContent
 * Content for the AI generation progress modal
 * Props-driven for 100+ apps compatibility
 */

import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { GenerationProgressBar } from "./GenerationProgressBar";

export interface GenerationProgressContentProps {
  readonly progress: number;
  readonly icon?: string;
  readonly title?: string;
  readonly message?: string;
  readonly hint?: string;
  readonly dismissLabel?: string;
  readonly onDismiss?: () => void;
  readonly backgroundColor?: string;
  readonly textColor?: string;
  readonly hintColor?: string;
  readonly progressColor?: string;
  readonly progressBackgroundColor?: string;
  readonly dismissButtonColor?: string;
}

export const GenerationProgressContent: React.FC<
  GenerationProgressContentProps
> = ({
  progress,
  icon,
  title,
  message,
  hint,
  dismissLabel,
  onDismiss,
  backgroundColor,
  textColor,
  hintColor,
  progressColor,
  progressBackgroundColor,
  dismissButtonColor,
}) => {
  const tokens = useAppDesignTokens();

  const activeTextColor = textColor || tokens.colors.textPrimary;
  const activeBgColor = backgroundColor || tokens.colors.surface;
  const activeHintColor = hintColor || tokens.colors.textTertiary;

  return (
    <View
      style={[
        styles.modal,
        {
          backgroundColor: activeBgColor,
          borderColor: tokens.colors.borderLight,
        },
      ]}
    >
      {icon && (
        <View style={styles.iconContainer}>
          <AtomicIcon name={icon} size="xl" color="primary" />
        </View>
      )}

      {title && (
        <AtomicText
          type="headlineSmall"
          style={[styles.title, { color: activeTextColor }]}
        >
          {title}
        </AtomicText>
      )}

      {message && (
        <AtomicText
          type="bodyMedium"
          style={[styles.message, { color: tokens.colors.textSecondary }]}
        >
          {message}
        </AtomicText>
      )}

      <GenerationProgressBar
        progress={progress}
        textColor={tokens.colors.primary}
        progressColor={progressColor}
        backgroundColor={progressBackgroundColor}
      />

      {hint && (
        <AtomicText
          type="bodySmall"
          style={[styles.hint, { color: activeHintColor }]}
        >
          {hint}
        </AtomicText>
      )}

      {onDismiss && (
        <TouchableOpacity
          style={[
            styles.dismissButton,
            { backgroundColor: dismissButtonColor || tokens.colors.primary },
          ]}
          onPress={onDismiss}
        >
          <AtomicText type="bodyMedium" style={styles.dismissText}>
            {dismissLabel || "OK"}
          </AtomicText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    width: "100%",
    maxWidth: 380,
    borderRadius: 24,
    padding: 32,
    borderWidth: 1,
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  message: {
    marginBottom: 28,
    textAlign: "center",
    lineHeight: 20,
  },
  hint: {
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 8,
  },
  dismissButton: {
    marginTop: 16,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    minWidth: 140,
    alignItems: "center",
  },
  dismissText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});

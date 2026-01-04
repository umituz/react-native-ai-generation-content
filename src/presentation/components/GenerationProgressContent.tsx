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
  /** Close button in top-right corner for background generation */
  readonly onClose?: () => void;
  /** Hint text shown near close button (e.g., "Continue in background") */
  readonly backgroundHint?: string;
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
  onClose,
  backgroundHint,
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
      {/* Close button in top-right corner */}
      {onClose && (
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <AtomicIcon name="close" size="md" color="secondary" />
        </TouchableOpacity>
      )}

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

      {/* Background hint - clickable to close and continue in background */}
      {onClose && backgroundHint && (
        <TouchableOpacity
          style={styles.backgroundHintButton}
          onPress={onClose}
        >
          <AtomicText
            type="bodySmall"
            style={[styles.backgroundHintText, { color: tokens.colors.primary }]}
          >
            {backgroundHint}
          </AtomicText>
        </TouchableOpacity>
      )}

      {onDismiss && (
        <TouchableOpacity
          style={[
            styles.dismissButton,
            { backgroundColor: dismissButtonColor || tokens.colors.primary },
          ]}
          onPress={onDismiss}
        >
          <AtomicText
            type="bodyMedium"
            style={[styles.dismissText, { color: tokens.colors.textInverse }]}
          >
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
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
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
  backgroundHintButton: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  backgroundHintText: {
    textAlign: "center",
    textDecorationLine: "underline",
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
    fontWeight: "600",
  },
});

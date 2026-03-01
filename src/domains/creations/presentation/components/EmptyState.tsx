/**
 * EmptyState Component
 * Displays when no creations exist
 */

import React, { useMemo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";

interface EmptyStateProps {
  readonly title: string;
  readonly description: string;
  readonly iconName?: string;
  readonly actionLabel?: string;
  readonly onAction?: () => void;
}

export function EmptyState({
  title,
  description,
  iconName = "image",
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const tokens = useAppDesignTokens();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: tokens.spacing.xl,
        },
        iconContainer: {
          marginBottom: tokens.spacing.lg,
        },
        title: {
          ...tokens.typography.headlineSmall,
          color: tokens.colors.textPrimary,
          textAlign: "center",
          marginBottom: tokens.spacing.sm,
        },
        description: {
          ...tokens.typography.bodyMedium,
          color: tokens.colors.textSecondary,
          textAlign: "center",
          marginBottom: onAction ? tokens.spacing.xl : 0,
        },
        button: {
          minWidth: 160,
          backgroundColor: tokens.colors.primary,
          paddingVertical: tokens.spacing.md,
          paddingHorizontal: tokens.spacing.lg,
          borderRadius: tokens.borders.radius.md,
          alignItems: "center",
        },
        buttonText: {
          ...tokens.typography.labelMedium,
          color: tokens.colors.textInverse,
          fontWeight: "600",
        },
      }),
    [tokens, onAction],
  );

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <AtomicIcon name={iconName} size="xl" color="secondary" />
      </View>
      <AtomicText style={styles.title}>{title}</AtomicText>
      <AtomicText style={styles.description}>{description}</AtomicText>
      {onAction && actionLabel && (
        <TouchableOpacity onPress={onAction} style={styles.button}>
          <AtomicText style={styles.buttonText}>{actionLabel}</AtomicText>
        </TouchableOpacity>
      )}
    </View>
  );
}

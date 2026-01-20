/**
 * Scenario Continue Button Component
 * Reusable continue button for scenario selection screens
 */

import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";

export interface ScenarioContinueButtonProps {
  readonly canContinue: boolean;
  readonly onPress: () => void;
  readonly label: string;
}

export function ScenarioContinueButton({
  canContinue,
  onPress,
  label,
}: ScenarioContinueButtonProps) {
  const tokens = useAppDesignTokens();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!canContinue}
      activeOpacity={0.7}
      style={[
        styles.button,
        {
          backgroundColor: canContinue
            ? tokens.colors.primary
            : tokens.colors.surfaceVariant,
          opacity: canContinue ? 1 : 0.5,
          paddingHorizontal: tokens.spacing.md,
          paddingVertical: tokens.spacing.xs,
          borderRadius: tokens.borders.radius.full,
        },
      ]}
    >
      <AtomicText
        type="bodyMedium"
        style={[
          styles.text,
          {
            color: canContinue
              ? tokens.colors.onPrimary
              : tokens.colors.textSecondary,
          },
        ]}
      >
        {label}
      </AtomicText>
      <AtomicIcon
        name="arrow-forward"
        size="sm"
        color={canContinue ? "onPrimary" : "textSecondary"}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontWeight: "800",
    marginRight: 4,
  },
});

/**
 * Wizard Continue Button Component
 * Reusable continue button for wizard screens
 */

import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
  type IconName,
} from "@umituz/react-native-design-system";

export interface WizardContinueButtonProps {
  readonly canContinue: boolean;
  readonly onPress: () => void;
  readonly label: string;
  readonly icon?: IconName;
}

export function WizardContinueButton({
  canContinue,
  onPress,
  label,
  icon = "chevron-forward-outline",
}: WizardContinueButtonProps) {
  const tokens = useAppDesignTokens();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!canContinue}
      activeOpacity={0.7}
      hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
      style={[
        styles.button,
        {
          backgroundColor: canContinue ? tokens.colors.primary : tokens.colors.surfaceVariant,
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
          { color: canContinue ? tokens.colors.onPrimary : tokens.colors.textSecondary },
        ]}
      >
        {label}
      </AtomicText>
      <AtomicIcon
        name={icon}
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

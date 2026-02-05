/**
 * Scenario Continue Button Component
 * Reusable continue button for scenario selection screens
 * Uses design system responsive utilities for proper touch targets on all devices
 */

import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
  useResponsive,
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
  const { isTabletDevice, minTouchTarget } = useResponsive();

  const hitSlopValue = isTabletDevice ? 24 : 20;
  const buttonMinHeight = Math.max(minTouchTarget, 44);
  const buttonMinWidth = isTabletDevice ? 120 : 100;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!canContinue}
      activeOpacity={0.7}
      hitSlop={{ top: hitSlopValue, bottom: hitSlopValue, left: hitSlopValue, right: hitSlopValue }}
      style={[
        styles.button,
        {
          backgroundColor: canContinue
            ? tokens.colors.primary
            : tokens.colors.surfaceVariant,
          opacity: canContinue ? 1 : 0.5,
          paddingHorizontal: isTabletDevice ? tokens.spacing.xl : tokens.spacing.lg,
          paddingVertical: isTabletDevice ? tokens.spacing.md : tokens.spacing.sm,
          borderRadius: tokens.borders.radius.full,
          minHeight: buttonMinHeight,
          minWidth: buttonMinWidth,
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
        size={isTabletDevice ? "md" : "sm"}
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

/**
 * ContinueButton Component
 * Reusable continue button for wizard flows and forms
 */

import React, { useMemo } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useAppDesignTokens, AtomicText, AtomicIcon } from "@umituz/react-native-design-system";

export interface ContinueButtonProps {
  readonly label: string;
  readonly canContinue: boolean;
  readonly onPress: () => void;
  readonly iconName?: string;
  readonly disabled?: boolean;
}

export const ContinueButton: React.FC<ContinueButtonProps> = ({
  label,
  canContinue,
  onPress,
  iconName = "arrow-forward",
  disabled = false,
}) => {
  const tokens = useAppDesignTokens();
  const isEnabled = canContinue && !disabled;

  const buttonStyle = useMemo(() => [
    styles.button,
    {
      backgroundColor: isEnabled ? tokens.colors.primary : tokens.colors.surfaceVariant,
      opacity: isEnabled ? 1 : 0.5,
    },
  ], [isEnabled, tokens.colors.primary, tokens.colors.surfaceVariant]);

  const textStyle = useMemo(() => [
    styles.text,
    { color: isEnabled ? tokens.colors.onPrimary : tokens.colors.textSecondary },
  ], [isEnabled, tokens.colors.onPrimary, tokens.colors.textSecondary]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!isEnabled}
      style={buttonStyle}
    >
      <AtomicText type="bodyMedium" style={textStyle}>
        {label}
      </AtomicText>
      <AtomicIcon
        name={iconName}
        size="sm"
        color={isEnabled ? "onPrimary" : "textSecondary"}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },
  text: {
    fontWeight: "800",
    marginRight: 4,
  },
});
